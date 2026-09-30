import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { calculateCircularityTriage } from './src/lib/decisionEngine.ts';
import { DeviceInputData, WhatIfScenarioModifiers } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Shared Gemini client initialization
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Device analysis API
app.post('/api/analyze-device', async (req, res) => {
  const input: DeviceInputData = req.body;

  try {
    // If Gemini client is available, leverage multimodal Gemini 3.8 Flash for intelligent identification & nuance
    if (ai) {
      try {
        const parts: any[] = [];

        // If user uploaded an image
        if (input.imageBase64 && input.imageBase64.includes('base64,')) {
          const [prefix, base64Data] = input.imageBase64.split('base64,');
          const mimeMatch = prefix.match(/:(.*?);/);
          const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
          parts.push({
            inlineData: {
              mimeType,
              data: base64Data,
            },
          });
        }

        const promptText = `
You are the CircuLife AI E-Waste Second-Life Engine, an expert sustainability architect, circularity engineer, and hardware diagnostic specialist.

Analyze this electronic device input to determine its optimal second-life pathway before premature recycling.
Evaluated pathways: 1. Repair, 2. Reuse, 3. Refurbish, 4. Resell, 5. Donate, 6. Component recovery, 7. Recycling.

Device Specifications & Condition provided:
- Type: ${input.deviceType}
- Brand: ${input.brand}
- Model: ${input.model}
- Age: ${input.ageYears} years
- Boots normally: ${input.bootsNormally ? 'YES' : 'NO'}
- Battery condition: ${input.batteryStatus}
- Display condition: ${input.displayStatus}
- Keyboard condition: ${input.keyboardStatus}
- Storage condition: ${input.storageStatus}
- Motherboard condition: ${input.motherboardStatus}
- Performance condition: ${input.performanceStatus}
- Physical body: ${input.physicalBodyStatus}
- Ports: ${input.portsStatus}
- Operating system: ${input.osStatus}
- Reported faults: ${input.userReportedFaults || 'None stated'}
- Diagnostic log: ${input.diagnosticResults || 'None'}
- Target Currency: ${input.currency || 'INR'}

CRITICAL GUIDELINES:
1. Do not recommend recycling merely because the device is old if the core electronics (motherboard, display) are functional.
2. For an old laptop with a dead battery and minor body damage where logic board and screen work, prioritize Refurbish, Repair, or Reuse over premature material destruction.
3. Clearly separate facts from visual inferences and estimates.
4. If image is provided, note any visible chassis wear or ports without claiming the internal silicon is proven functional solely by a photo.
5. Provide realistic economic numbers in ${input.currency || 'INR'}.

Respond strictly with valid JSON conforming to this structure:
{
  "detectedModel": "identified or inferred model",
  "identificationConfidence": "High" | "Medium" | "Low",
  "identificationNotes": "short explanation of visual/metadata clues and uncertainties",
  "recommendedPathway": "repair" | "reuse" | "refurbish" | "resell" | "donate" | "component_recovery" | "recycling",
  "alternativePathway": "repair" | "reuse" | "refurbish" | "resell" | "donate" | "component_recovery" | "recycling",
  "rationale": "Clear evidence-based reason for this recommendation",
  "secondLifeOutlook": "e.g. 2-3 years for schooling or office",
  "criticalUncertainties": ["list of items needing physical verification"],
  "missingInformation": ["list of missing specifications"]
}
`;

        parts.push({ text: promptText });

        const geminiRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: { parts },
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textOutput = geminiRes.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          // Combine Gemini intelligence with our verified reference circularity baseline
          const baseline = calculateCircularityTriage(input);
          if (parsed.detectedModel) {
            baseline.deviceIdentity.detectedModel = parsed.detectedModel;
          }
          if (parsed.identificationConfidence) {
            baseline.deviceIdentity.identificationConfidence = parsed.identificationConfidence;
          }
          if (parsed.identificationNotes) {
            baseline.deviceIdentity.identificationNotes = parsed.identificationNotes;
          }
          if (parsed.rationale) {
            baseline.recommendationExplanation.primaryRationale = parsed.rationale;
          }
          if (parsed.secondLifeOutlook) {
            baseline.recommendationExplanation.secondLifeOutlook = parsed.secondLifeOutlook;
          }
          if (Array.isArray(parsed.criticalUncertainties) && parsed.criticalUncertainties.length > 0) {
            baseline.recommendationExplanation.criticalUncertainties = parsed.criticalUncertainties;
          }
          if (Array.isArray(parsed.missingInformation) && parsed.missingInformation.length > 0) {
            baseline.missingInformation = parsed.missingInformation;
          }

          // If Gemini recommended a different pathway, update the ranks
          if (parsed.recommendedPathway && baseline.pathways.some(p => p.id === parsed.recommendedPathway)) {
            baseline.recommendedPathway = parsed.recommendedPathway;
            baseline.pathways.forEach(p => {
              p.isRecommended = p.id === parsed.recommendedPathway;
              p.isAlternative = p.id === (parsed.alternativePathway || 'repair');
            });
          }

          return res.json(baseline);
        }
      } catch (geminiError) {
        console.warn('Gemini API call encountered an issue, falling back to verified deterministic engine:', geminiError);
      }
    }

    // High-fidelity fallback / baseline evaluation
    const result = calculateCircularityTriage(input);
    return res.json(result);
  } catch (error) {
    console.error('Analysis failed:', error);
    res.status(500).json({ error: 'Failed to analyze device condition' });
  }
});

// What-If scenario simulation
app.post('/api/what-if-simulate', (req, res) => {
  const { input, modifiers }: { input: DeviceInputData; modifiers: Partial<WhatIfScenarioModifiers> } = req.body;
  try {
    const result = calculateCircularityTriage(input, modifiers);
    res.json(result);
  } catch (error) {
    console.error('What-if calculation failed:', error);
    res.status(500).json({ error: 'Failed to simulate scenario' });
  }
});

// AI Advisor for circularity Q&A
app.post('/api/ask-advisor', async (req, res) => {
  const { question, context }: { question: string; context: any } = req.body;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `
You are the CircuLife AI Senior Circularity Advisor.
User question: "${question}"
Device Context: ${JSON.stringify(context || {})}

Provide a concise, practical, highly accurate response (2-3 short paragraphs max).
Cover technical feasibility, data privacy (e.g. NIST 800-88, DBAN, BitLocker removal), safety (e.g. Li-ion battery care), and sustainability trade-offs. Avoid generic platitudes.
`,
      });
      return res.json({ answer: response.text });
    } catch (e) {
      console.warn('AI Advisor call failed, using rule-based answer:', e);
    }
  }

  // Fallback domain guidance
  let fallbackAnswer = 'For electronics life extension: ensure your personal data is sanitized using NIST SP 800-88 guidelines (or a secure factory reset). If replacing the battery, always choose cells with verified UL 1642 / CE safety certifications. To reuse stationary laptops without battery replacement, configure BIOS AC power bypass to safely run connected to wall power.';
  if (question.toLowerCase().includes('wipe') || question.toLowerCase().includes('data')) {
    fallbackAnswer = 'Data Sanitization Protocol: Before resale, donation, or recycling, perform a cryptographic wipe or ATA Secure Erase. For Windows, use "Reset this PC > Clean the drive fully" with BitLocker encryption enabled beforehand. For Linux, use `shred -v -n 3` or `blkdiscard`. Never rely on simple file deletion.';
  } else if (question.toLowerCase().includes('battery')) {
    fallbackAnswer = 'Battery Safety & Replacement: Inspect the pack for physical swelling ("pillowing"). If swollen, do not charge and recycle immediately at a hazardous battery drop-off. If simply depleted, OEM or certified Tier-1 replacement packs restore complete mobile functionality.';
  }

  res.json({ answer: fallbackAnswer });
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CircuLife AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
