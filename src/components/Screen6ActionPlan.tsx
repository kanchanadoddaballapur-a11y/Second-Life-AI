import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Globe, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  Download, 
  RotateCcw, 
  ArrowLeft, 
  ShieldAlert, 
  FileText, 
  HardDrive, 
  AlertTriangle,
  Award,
  Calendar,
  Heart,
  Sparkles,
  Leaf
} from 'lucide-react';
import { AnalysisResult, DeviceInputData, NearbyProvider, UserPreferences } from '../types';

interface Screen6ActionPlanProps {
  analysis: AnalysisResult;
  formData: DeviceInputData;
  preferences: UserPreferences;
  selectedProvider: NearbyProvider;
  isSaved?: boolean;
  onToggleSaveProvider?: () => void;
  onGoToBookings?: () => void;
  onBack: () => void;
  onReset: () => void;
  onOpenDossier: () => void;
}

export const Screen6ActionPlan: React.FC<Screen6ActionPlanProps> = ({
  analysis,
  formData,
  preferences,
  selectedProvider,
  isSaved = false,
  onToggleSaveProvider,
  onGoToBookings,
  onBack,
  onReset,
  onOpenDossier
}) => {
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCompletedChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const chosenPathwayName = preferences.selectedPathways.includes('ai_suggest')
    ? selectedProvider.pathwayAffinity[0].toUpperCase()
    : preferences.selectedPathways[0].toUpperCase();

  const budgetLabel = preferences.isCustomBudget
    ? `₹${preferences.customBudgetMin ?? 0} – ₹${preferences.customBudgetMax ?? '∞'}`
    : preferences.budgetPreset === 'none'
    ? 'No fixed limit'
    : `₹${preferences.budgetPreset}`;

  const preHandoverTasks = [
    {
      id: 'task-data-wipe',
      title: 'NIST SP 800-88 Media Sanitization',
      desc: 'Backup personal documents to cloud/external drive, then perform full cryptographic erase or factory reset.'
    },
    {
      id: 'task-accounts',
      title: 'Sign Out Cloud Accounts & BitLocker Keys',
      desc: 'Deactivate Microsoft/Apple accounts and clear TPM/firmware boot passwords so technicians can test.'
    },
    {
      id: 'task-charger',
      title: 'Pack Original Power Adapter',
      desc: 'Handing over the original OEM charger avoids accessory penalties and allows immediate bench testing.'
    },
    {
      id: 'task-battery-safety',
      title: 'Inspect Battery Physical Pillowing',
      desc: 'Verify battery casing is flat and not swollen. Discharge below 30% state-of-charge for safe transit.'
    }
  ];

  const handleExportPlan = () => {
    const text = `
SECOND LIFE AI — FINAL DEVICE ACTION PLAN
======================================================
Generated: ${new Date().toLocaleString()}
Device: ${formData.brand} ${formData.model} (${formData.ageYears} Years Old)
======================================================
YOUR SELECTED OPTION:
- Chosen Pathway: ${chosenPathwayName}
- Your Budget: ${budgetLabel}
- Selected Provider: ${selectedProvider.name}
- Category: ${selectedProvider.providerTypeLabel}
- Location: ${selectedProvider.address}
- Contact Phone: ${selectedProvider.phone || 'Unavailable'}
- Website: ${selectedProvider.website || 'Unavailable'}
- Estimated Expenditure: ₹${selectedProvider.estimatedCost.min} – ₹${selectedProvider.estimatedCost.max}
- Distance: ${selectedProvider.distanceKm} km

NEXT ACTIONABLE STEP:
Contact ${selectedProvider.name} and request a physical bench inspection
and final formal quotation before authorizing repairs or asset handover.

ENVIRONMENTAL IMPACT:
- Usable Life Extended: ~${analysis.environmentalSummary.usableLifeExtendedYears} Years
- Embodied CO2e Avoided: ~${analysis.environmentalSummary.embodiedCo2eAvoidedKg} kg CO2e
- Diverted E-Waste: ~${analysis.environmentalSummary.divertedWeightKg} kg
======================================================
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SecondLife-Plan-${formData.brand}-${formData.model}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 border-b border-purple-500/20 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
            Stage 6 · Final Roadmap & Handover
          </span>
          <h1 
            className="font-display text-2xl sm:text-3xl font-extrabold mt-1"
            style={{ color: '#000000' }}
          >
            Your Selected Option ✨
          </h1>
          <p 
            className="text-xs mt-1 font-semibold"
            style={{ color: '#4a0e78' }}
          >
            Review your chosen pathway, verified provider details, and actionable next steps.
          </p>
        </div>

        <button
          onClick={handleExportPlan}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-200 text-xs font-semibold shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Plan (.txt)</span>
        </button>
      </div>

      {/* Primary Selected Option Summary Card (Section 25) */}
      <div className="bg-[#100722]/90 border border-purple-500/35 rounded-3xl p-6 sm:p-7 shadow-2xl mb-8 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
              Device: {formData.brand} {formData.model}
            </span>
            <span className="text-[10px] font-mono bg-purple-950/80 text-purple-200 px-2 py-0.5 rounded border border-purple-500/30">
              {formData.ageYears} Years Old
            </span>
          </div>

          {selectedProvider.isVerified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Award className="w-3.5 h-3.5" />
              Verified Facility
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-xs">
          
          <div className="bg-[#090317] border border-purple-500/20 rounded-2xl p-3.5">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Chosen Pathway</span>
            <strong className="text-emerald-400 text-base font-bold block">
              {chosenPathwayName}
            </strong>
            <span className="text-slate-400 text-[11px]">User-selected second-life path</span>
          </div>

          {preferences.selectedPathways.includes('donate') ? (
            <>
              <div className="bg-[#090317] border border-emerald-500/30 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">Estimated Cost</span>
                <strong className="text-emerald-400 text-base font-mono font-bold block">
                  ₹0 (Free Donation)
                </strong>
                <span className="text-slate-400 text-[11px]">Zero charges / No fees</span>
              </div>

              <div className="bg-[#090317] border border-emerald-500/30 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">Budget Required</span>
                <strong className="text-white text-base font-bold block">
                  None (Free Contribution)
                </strong>
                <span className="text-slate-400 text-[11px]">Verified educational programs</span>
              </div>
            </>
          ) : preferences.selectedPathways.includes('resell') || preferences.selectedPathways.includes('recycling') ? (
            <>
              <div className="bg-[#090317] border border-purple-500/30 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-mono text-purple-300 block mb-1">Market Demand</span>
                <strong className="text-white text-base font-bold uppercase block">
                  {preferences.marketDemand ? `${preferences.marketDemand} Demand` : 'High Demand'}
                </strong>
                <span className="text-slate-400 text-[11px]">Active buyer interest</span>
              </div>

              <div className="bg-[#090317] border border-purple-500/30 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-mono text-purple-300 block mb-1">Expected Payout to You</span>
                <strong className="text-emerald-400 text-base font-mono font-bold block">
                  ₹{(preferences.expectedSalePrice || (preferences.selectedPathways.includes('recycling') ? 350 : 5500)).toLocaleString('en-IN')}
                </strong>
                <span className="text-slate-400 text-[11px]">Direct cash / buyback value</span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#090317] border border-purple-500/20 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Your Budget Ceiling</span>
                <strong className="text-purple-200 text-base font-mono font-bold block">
                  {budgetLabel}
                </strong>
                <span className="text-slate-400 text-[11px]">Calibrated strictly in ₹ INR</span>
              </div>

              <div className="bg-[#090317] border border-purple-500/20 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Estimated Expenditure</span>
                <strong className="text-emerald-400 text-base font-mono font-bold block">
                  {selectedProvider.estimatedCost.min === 0 && selectedProvider.estimatedCost.max === 0
                    ? '₹0 (Free / Donation)'
                    : `₹${selectedProvider.estimatedCost.min.toLocaleString('en-IN')} – ₹${selectedProvider.estimatedCost.max.toLocaleString('en-IN')}`}
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  {selectedProvider.estimatedCost.notes}
                </span>
              </div>
            </>
          )}

          <div className="bg-[#090317] border border-purple-500/20 rounded-2xl p-3.5 sm:col-span-2 lg:col-span-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Selected Provider</span>
            <strong className="text-white text-base block mb-1">
              {selectedProvider.name}
            </strong>
            <p className="text-slate-300 text-xs flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span>{selectedProvider.address}</span>
            </p>
          </div>

          <div className="bg-[#090317] border border-purple-500/20 rounded-2xl p-3.5">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Distance</span>
            <strong className="text-white text-base font-mono block">
              {selectedProvider.distanceKm} km
            </strong>
            <span className="text-slate-400 text-[11px]">From your selected area</span>
          </div>

        </div>

        {/* ======================================================== */}
        {/* Next Step 🚀 Section as specified in Section 25          */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-purple-950/60 via-[#14062a] to-emerald-950/40 border border-purple-500/35 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-1.5">
              <span>Next Step 🚀</span>
            </h3>
          </div>
          
          <p className="text-purple-200 text-sm font-semibold mb-4 leading-relaxed">
            "Contact the provider for inspection and a final quotation before proceeding."
          </p>

          {/* Action Buttons: Contact, Website, Directions, Save, Book Home Service */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            
            {/* 📞 Contact Provider */}
            {selectedProvider.phone ? (
              <a
                href={`tel:${selectedProvider.phone}`}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>📞 CONTACT PROVIDER ({selectedProvider.phone})</span>
              </a>
            ) : (
              <span className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs">
                Phone unlisted
              </span>
            )}

            {/* 🌐 Visit Website */}
            {selectedProvider.website && (
              <a
                href={selectedProvider.website}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-purple-300" />
                <span>🌐 VISIT WEBSITE</span>
              </a>
            )}

            {/* 🧭 Get Directions */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedProvider.name + ' ' + selectedProvider.address)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>🧭 GET DIRECTIONS</span>
            </a>

            {/* ❤️ Save for Later */}
            {onToggleSaveProvider && (
              <button
                type="button"
                onClick={onToggleSaveProvider}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSaved
                    ? 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                    : 'bg-purple-950/70 hover:bg-purple-900 border-purple-500/40 text-purple-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isSaved ? '❤️ SAVED TO BOOKMARKS' : '❤️ SAVE FOR LATER'}</span>
              </button>
            )}

            {/* 🏠 Book Home Service Shortcut */}
            {onGoToBookings && (
              <button
                type="button"
                onClick={onGoToBookings}
                className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>🏠 BOOK A HOME SERVICE</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* 26. AI Technical Explanation Section (Section 26) */}
      <div className="bg-[#100722]/80 border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-xl mb-8 space-y-3">
        <div className="flex items-center gap-2 text-white font-display font-bold text-base">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>🤖 AI Technical Explanation</span>
        </div>
        
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          {analysis.recommendationExplanation.headline}: {analysis.recommendationExplanation.primaryRationale}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="bg-[#090317] border border-purple-500/20 rounded-xl p-3">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Supporting Evidence</span>
            <ul className="space-y-1 text-slate-300">
              {analysis.recommendationExplanation.supportingEvidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#090317] border border-purple-500/20 rounded-xl p-3">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Uncertainties & Confidence</span>
            <div className="text-purple-300 font-medium mb-1">
              AI Confidence: <strong className="text-emerald-400">{analysis.recommendationExplanation.confidenceLevel}</strong>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Estimates are derived from prevailing Indian hardware replacement rates in Bengaluru. Always request physical bench validation before final sign-off.
            </p>
          </div>
        </div>
      </div>

      {/* 27. Environmental Impact Section (Section 27) */}
      <div className="bg-[#100722]/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-xl mb-8 space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2 text-white font-display font-bold text-base">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>✨ Potential Second-Life Impact</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            {analysis.environmentalSummary.verificationStatus === 'verified_model' ? 'Verified Impact Model' : 'Estimated Data'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-[#090317] border border-emerald-500/20 rounded-xl p-3 text-center">
            <span className="text-xl mb-1 block">♻️</span>
            <div className="font-display font-bold text-base text-emerald-300">
              ~{analysis.environmentalSummary.divertedWeightKg} kg
            </div>
            <span className="text-slate-400 text-[11px]">Diverted from premature disposal</span>
          </div>

          <div className="bg-[#090317] border border-emerald-500/20 rounded-xl p-3 text-center">
            <span className="text-xl mb-1 block">🔧</span>
            <div className="font-display font-bold text-base text-white">
              +{analysis.environmentalSummary.usableLifeExtendedYears} Years
            </div>
            <span className="text-slate-400 text-[11px]">Potential additional useful life</span>
          </div>

          <div className="bg-[#090317] border border-emerald-500/20 rounded-xl p-3 text-center">
            <span className="text-xl mb-1 block">🌍</span>
            <div className="font-display font-bold text-base text-teal-300">
              ~{analysis.environmentalSummary.embodiedCo2eAvoidedKg} kg CO2e
            </div>
            <span className="text-slate-400 text-[11px]">Avoided manufacturing carbon</span>
          </div>
        </div>
      </div>

      {/* Pre-Handover Checklist */}
      <div className="bg-[#100722]/80 border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/20 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Pre-Handover Checklist & NIST Media Sanitization</span>
          </h3>
          <span className="text-[11px] text-purple-300 font-mono">
            {Object.values(completedChecklist).filter(Boolean).length} of {preHandoverTasks.length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {preHandoverTasks.map((task) => {
            const isDone = Boolean(completedChecklist[task.id]);
            return (
              <div
                key={task.id}
                onClick={() => toggleCheck(task.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isDone 
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-slate-200' 
                    : 'bg-[#090317] border-purple-500/20 text-slate-400 hover:border-purple-400/40'
                }`}
              >
                <button type="button" className="mt-0.5 text-emerald-400">
                  {isDone ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-600" />}
                </button>
                <div className="flex-1">
                  <div className={`text-xs font-semibold ${isDone ? 'text-white line-through opacity-80' : 'text-white'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {task.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-500/20 text-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Provider Selection</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-white font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Evaluate Another Device</span>
          </button>
        </div>
      </div>

    </div>
  );
};
