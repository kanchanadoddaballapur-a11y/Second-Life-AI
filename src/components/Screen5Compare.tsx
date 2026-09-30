import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Layers, 
  AlertCircle, 
  Sparkles,
  MapPin,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { 
  AnalysisResult, 
  DeviceInputData, 
  PathwayEvaluation, 
  PathwayId, 
  UserPreferences, 
  WhatIfScenarioModifiers 
} from '../types';
import { calculateCircularityTriage } from '../lib/decisionEngine';

interface Screen5CompareProps {
  initialAnalysis: AnalysisResult;
  formData: DeviceInputData;
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onProceed: () => void;
  onBack: () => void;
}

export const Screen5Compare: React.FC<Screen5CompareProps> = ({
  initialAnalysis,
  formData,
  preferences,
  setPreferences,
  onProceed,
  onBack
}) => {
  const [modifiers, setModifiers] = useState<WhatIfScenarioModifiers>({
    batteryReplacementCostFactor: 1.0,
    refurbishedMarketDemand: 'stable',
    diyRepairLabor: false,
    donationTaxIncentive: false,
    scrapMetalPriceChange: 0
  });

  const [simulatedAnalysis, setSimulatedAnalysis] = useState<AnalysisResult>(initialAnalysis);

  useEffect(() => {
    const updated = calculateCircularityTriage(formData, modifiers);
    setSimulatedAnalysis(updated);
  }, [modifiers, formData]);

  const handleSelectPathway = (id: PathwayId) => {
    setPreferences(prev => ({
      ...prev,
      selectedPathways: [id]
    }));
  };

  // Determine budget limits
  let maxBudget = 5000;
  if (preferences.isCustomBudget && preferences.customBudgetMax) {
    maxBudget = preferences.customBudgetMax;
  } else {
    switch (preferences.budgetPreset) {
      case '0-500': maxBudget = 500; break;
      case '500-1000': maxBudget = 1000; break;
      case '1000-2500': maxBudget = 2500; break;
      case '2500-5000': maxBudget = 5000; break;
      case '5000-10000': maxBudget = 10000; break;
      case '10000+': maxBudget = 999999; break;
      case 'none': maxBudget = 999999; break;
    }
  }

  const getFitDescription = (p: PathwayEvaluation) => {
    const costMin = p.estimatedCost.min;
    if (costMin === 0) return 'Free / Maximum savings';
    if (costMin <= maxBudget) return 'Matches your budget';
    return `Exceeds budget (₹${costMin - maxBudget} gap)`;
  };

  const getRepresentativeDistance = (id: PathwayId) => {
    switch (id) {
      case 'repair': return '2.1 km (Local shop)';
      case 'refurbish': return '3.8 km (Refurb hub)';
      case 'reuse': return '0.0 km (At home)';
      case 'donate': return '6.4 km (NGO center)';
      case 'resell': return '3.8 km (Mall kiosk)';
      case 'component_recovery': return '4.9 km (Parts depot)';
      case 'recycling': return '4.1 km (CPCB center)';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
            Stage 5 of 6 · User-Controlled Pathway Comparison & Sandbox
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Comparative Pathway Trade-Offs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            CircuLife AI does not impose one choice as universally "best." Evaluate your selected pathway alongside alternative practical routes.
          </p>
        </div>

        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
        >
          <span>Choose Provider & Finalize Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Balanced Principle Banner */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-6 text-xs text-slate-300 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Neutral Comparative Philosophy: </strong>
          Based on your selected preferences, these are the options that match your requirements. You can switch your preferred path at any time by clicking any option below.
        </div>
      </div>

      {/* Standardized Comparison Table */}
      <div className="bg-[#0e1620] border border-slate-800 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Comparative Pathway Ledger</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Active Budget Limit: ₹{maxBudget >= 999999 ? 'No limit' : maxBudget.toLocaleString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-4">Pathway Option</th>
                <th className="py-3 px-4">Estimated Cost</th>
                <th className="py-3 px-4">Potential Value</th>
                <th className="py-3 px-4">Typical Distance</th>
                <th className="py-3 px-4">Budget & Criteria Fit</th>
                <th className="py-3 px-4 text-right">Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {simulatedAnalysis.pathways.map((p) => {
                const isUserChoice = preferences.selectedPathways.includes(p.id);
                const fitDesc = getFitDescription(p);
                const isFit = p.estimatedCost.min <= maxBudget;

                return (
                  <tr
                    key={p.id}
                    onClick={() => handleSelectPathway(p.id)}
                    className={`cursor-pointer transition-colors ${
                      isUserChoice
                        ? 'bg-emerald-950/40 ring-1 ring-emerald-500/50'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="py-3 px-4 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{p.name}</span>
                        {isUserChoice && (
                          <span className="text-[10px] font-mono uppercase bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded font-bold">
                            Your Pick
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans block mt-0.5">
                        {p.tagline}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-200">
                      {p.estimatedCost.min === 0 && p.estimatedCost.max === 0
                        ? '₹0 (Free)'
                        : `₹${p.estimatedCost.min.toLocaleString()} – ₹${p.estimatedCost.max.toLocaleString()}`}
                    </td>

                    <td className="py-3 px-4 text-emerald-400 font-bold">
                      {p.potentialRecoveredValue.min === 0
                        ? 'Social / Clean scrap'
                        : `₹${p.potentialRecoveredValue.min.toLocaleString()} – ₹${p.potentialRecoveredValue.max.toLocaleString()}`}
                    </td>

                    <td className="py-3 px-4 text-slate-300 font-sans">
                      {getRepresentativeDistance(p.id)}
                    </td>

                    <td className="py-3 px-4 font-sans">
                      <span className={`inline-flex items-center gap-1 ${isFit ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {isFit ? '✓ ' : '⚠️ '}{fitDesc}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-sans">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPathway(p.id);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          isUserChoice
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isUserChoice ? 'Selected' : 'Choose Path'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time What-If Variable Sliders */}
      <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Interactive "What-If" Sensitivity Simulator
            </h3>
          </div>
          <button
            onClick={() => setModifiers({
              batteryReplacementCostFactor: 1.0,
              refurbishedMarketDemand: 'stable',
              diyRepairLabor: false,
              donationTaxIncentive: false,
              scrapMetalPriceChange: 0
            })}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Battery cost factor */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-200">Battery Part Pricing</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {modifiers.batteryReplacementCostFactor}x ({modifiers.batteryReplacementCostFactor <= 0.8 ? 'Aftermarket' : modifiers.batteryReplacementCostFactor >= 1.4 ? 'OEM Genuine' : 'Standard'})
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.8"
              step="0.1"
              value={modifiers.batteryReplacementCostFactor}
              onChange={(e) => setModifiers(p => ({ ...p, batteryReplacementCostFactor: parseFloat(e.target.value) }))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹1,800 Compatible</span>
              <span>₹4,500 OEM</span>
            </div>
          </div>

          {/* DIY Labor toggle */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 block mb-0.5">Labor Strategy</span>
              <p className="text-[11px] text-slate-400">Save bench service charge via iFixit guide</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setModifiers(p => ({ ...p, diyRepairLabor: false }))}
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  !modifiers.diyRepairLabor ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Pro Repair Shop
              </button>
              <button
                type="button"
                onClick={() => setModifiers(p => ({ ...p, diyRepairLabor: true }))}
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  modifiers.diyRepairLabor ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                DIY Self-Install
              </button>
            </div>
          </div>

          {/* Market demand */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 block mb-0.5">Secondary Resale Market</span>
              <p className="text-[11px] text-slate-400">Willingness to pay for Grade-B 5-yr laptops</p>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {(['depressed', 'stable', 'high'] as const).map((dm) => (
                <button
                  key={dm}
                  type="button"
                  onClick={() => setModifiers(p => ({ ...p, refurbishedMarketDemand: dm }))}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium capitalize transition-colors ${
                    modifiers.refurbishedMarketDemand === dm
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {dm}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Local Providers</span>
        </button>
        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
        >
          <span>Finalize Action Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
