import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  Cpu,
  ChevronDown,
  ChevronUp,
  Wrench,
  DollarSign,
  Recycle,
  HeartHandshake,
  Sparkles,
  Home,
  MapPin,
  Laptop
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface Screen2AssessmentProps {
  analysis: AnalysisResult;
  onProceed: () => void;
  onBack: () => void;
  onSelectPathwayAndGo?: (pathway: string, serviceFormat?: 'home' | 'shop') => void;
}

export const Screen2Assessment: React.FC<Screen2AssessmentProps> = ({
  analysis,
  onProceed,
  onBack,
  onSelectPathwayAndGo
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>('fix');
  const [repairServicePreference, setRepairServicePreference] = useState<'home' | 'shop'>('home');

  const { deviceIdentity, conditionTable } = analysis;

  // Plain language translation of findings (Section 10)
  const getPlainLanguageFindings = () => {
    const findings: { icon: string; title: string; desc: string }[] = [];

    // Battery check
    const battery = conditionTable.find(c => c.category === 'Battery' || c.name.includes('Battery'));
    if (battery && (battery.status === 'poor' || battery.status === 'faulty')) {
      findings.push({
        icon: '🔋',
        title: 'Battery needs attention',
        desc: 'Your battery may not last very long or dies quickly without the charger.'
      });
    }

    // Display check
    const display = conditionTable.find(c => c.category === 'Display' || c.name.includes('Screen') || c.name.includes('Display'));
    if (display && (display.status === 'poor' || display.status === 'faulty')) {
      findings.push({
        icon: '🖥️',
        title: 'Screen needs attention',
        desc: 'Your screen may need to be replaced or checked for loose cables.'
      });
    }

    // Motherboard & processor
    const mb = conditionTable.find(c => c.category === 'Motherboard' || c.name.includes('Motherboard') || c.name.includes('SoC'));
    if (mb && mb.status === 'good') {
      findings.push({
        icon: '🧠',
        title: 'The core computer inside is healthy',
        desc: 'The main processor and logic board work fine. Fixing the battery gives it several more years.'
      });
    } else if (mb && (mb.status === 'poor' || mb.status === 'faulty')) {
      findings.push({
        icon: '⚡',
        title: 'Circuit board has an issue',
        desc: 'Your device may be turning off or slowing down because it gets too hot.'
      });
    }

    // Fallback if none flagged
    if (findings.length === 0) {
      findings.push({
        icon: '🔋',
        title: 'Battery may need attention',
        desc: 'Your battery may not last very long, but the rest of the laptop is in good condition.'
      });
    }

    return findings;
  };

  const plainFindings = getPlainLanguageFindings();

  const handleNext = () => {
    if (onSelectPathwayAndGo) {
      onSelectPathwayAndGo(selectedAction, selectedAction === 'fix' ? repairServicePreference : undefined);
    } else {
      onProceed();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
      
      {/* Friendly Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Back to Device</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500 uppercase">
          Step 2 of 4 · Your Results
        </span>
      </div>

      {/* Main Friendly Result Card (Section 9) */}
      <div className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Device Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-purple-100 dark:border-purple-900/50">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center text-3xl font-bold shadow-sm">
            💻
          </div>
          <div>
            <span className="text-xs font-mono uppercase font-bold text-purple-700 dark:text-purple-300 block">
              Your Device Check
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-purple-950 dark:text-white tracking-tight">
              {deviceIdentity.detectedBrand} {deviceIdentity.detectedModel}
            </h2>
            <p className="text-xs text-slate-500">
              Confidence: {deviceIdentity.identificationConfidence} · ₹ INR Standard
            </p>
          </div>
        </div>

        {/* What We Found (Section 9 & 10: Simple Everyday Words) */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-extrabold text-purple-950 dark:text-white flex items-center gap-2">
            <span>🔍</span>
            <span>What we found</span>
          </h3>

          <div className="space-y-2.5">
            {plainFindings.map((find, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-purple-50/70 dark:bg-[#0a0318] border border-purple-200 dark:border-purple-900/40 flex items-start gap-3.5"
              >
                <span className="text-2xl mt-0.5">{find.icon}</span>
                <div>
                  <strong className="block text-sm font-extrabold text-purple-950 dark:text-white">
                    {find.title}
                  </strong>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {find.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Would You Like to Do? (Section 11: Large Visual Choices) */}
        <div className="space-y-3 pt-2 border-t border-purple-100 dark:border-purple-900/50">
          <h3 className="text-base sm:text-lg font-extrabold text-purple-950 dark:text-white flex items-center gap-2">
            <span>🎯</span>
            <span>What would you like to do with your device?</span>
          </h3>
          <p className="text-xs text-slate-500">
            Tap the choice you want. We will help you take the next step.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'fix', label: '🔧 Fix My Device', desc: 'Repair the battery or fault so you can keep using it.', badge: 'Recommended' },
              { id: 'refurbish', label: '♻️ Improve / Refurbish', desc: 'Upgrade RAM/SSD or clean up for school/family use.' },
              { id: 'sell', label: '💰 Sell My Device', desc: 'Get instant cash or trade-in value in ₹ INR.' },
              { id: 'donate', label: '🎁 Donate My Device', desc: 'Give to an educational non-profit for free learning.' },
              { id: 'recycle', label: '♻️ Recycle My Device', desc: 'Responsibly recycle if it cannot be safely fixed.' }
            ].map((choice) => {
              const isSelected = selectedAction === choice.id;
              return (
                <div
                  key={choice.id}
                  onClick={() => setSelectedAction(choice.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-100 dark:bg-purple-950/80 border-purple-600 ring-2 ring-purple-600/30 shadow-md'
                      : 'bg-slate-50 dark:bg-[#0a0318] border-purple-100 dark:border-purple-900/40 hover:border-purple-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-sm font-extrabold text-purple-950 dark:text-white">
                        {choice.label}
                      </strong>
                      {choice.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          {choice.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {choice.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONNECT TO BOOKING (Section 12): If user chooses "Fix My Device" */}
        {selectedAction === 'fix' && (
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border-2 border-purple-200 dark:border-purple-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏠</span>
              <div>
                <strong className="text-sm font-extrabold text-purple-950 dark:text-white block">
                  Want help fixing it? Choose what works for you:
                </strong>
                <span className="text-xs text-slate-500">
                  Select your preferred way to get service in Bengaluru
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setRepairServicePreference('home')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                  repairServicePreference === 'home'
                    ? 'bg-white dark:bg-[#120727] border-purple-600 ring-2 ring-purple-600/20 shadow-md'
                    : 'bg-white/70 dark:bg-[#0a0318] border-purple-100 dark:border-purple-900/40'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
                  🏠
                </div>
                <div>
                  <strong className="text-xs font-extrabold text-purple-950 dark:text-white block">
                    Get Help at Home
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    A certified technician comes to your doorstep.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRepairServicePreference('shop')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                  repairServicePreference === 'shop'
                    ? 'bg-white dark:bg-[#120727] border-purple-600 ring-2 ring-purple-600/20 shadow-md'
                    : 'bg-white/70 dark:bg-[#0a0318] border-purple-100 dark:border-purple-900/40'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
                  📍
                </div>
                <div>
                  <strong className="text-xs font-extrabold text-purple-950 dark:text-white block">
                    Find a Nearby Shop
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    Visit verified repair labs near your location.
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Optional "More Details" Accordion (Section 9 & 10) */}
        <div className="pt-2 border-t border-purple-100 dark:border-purple-900/50">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-500 hover:text-purple-700 py-2"
          >
            <span>Optional: View Component Diagnostic Table (More Details)</span>
            {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTechnicalDetails && (
            <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#0a0318] border border-purple-100 dark:border-purple-900/40 space-y-2 text-xs">
              <span className="font-mono text-[11px] uppercase text-purple-700 font-bold block mb-1">
                Hardware Health Audit:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {conditionTable.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-[#110724] border border-slate-200 dark:border-purple-900/30 flex items-center justify-between">
                    <div>
                      <strong className="block text-purple-950 dark:text-white">{item.name}</strong>
                      <span className="text-[10px] text-slate-500">{item.notes || item.evidenceSource}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'good' ? 'bg-emerald-100 text-emerald-800' :
                      item.status === 'moderate' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-purple-100 dark:border-purple-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-purple-200 text-purple-900 text-xs font-bold hover:bg-purple-50"
          >
            ← Back to Device
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <span>
              {selectedAction === 'fix' 
                ? (repairServicePreference === 'home' ? '🏠 Continue to Home Service' : '📍 View Nearby Repair Shops')
                : 'Continue with Selected Option'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
