import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Flame, 
  ShieldCheck, 
  Sparkles,
  Recycle,
  Wrench,
  HeartHandshake,
  DollarSign
} from 'lucide-react';
import { AnalysisResult, DeviceInputData, WhatIfScenarioModifiers } from '../types';
import { calculateCircularityTriage } from '../lib/decisionEngine';

interface Screen5WhatIfProps {
  initialAnalysis: AnalysisResult;
  formData: DeviceInputData;
  onProceed: () => void;
  onBack: () => void;
}

export const Screen5WhatIf: React.FC<Screen5WhatIfProps> = ({
  initialAnalysis,
  formData,
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

  // Recalculate on modifier change
  useEffect(() => {
    const updated = calculateCircularityTriage(formData, modifiers);
    setSimulatedAnalysis(updated);
  }, [modifiers, formData]);

  const handleReset = () => {
    setModifiers({
      batteryReplacementCostFactor: 1.0,
      refurbishedMarketDemand: 'stable',
      diyRepairLabor: false,
      donationTaxIncentive: false,
      scrapMetalPriceChange: 0
    });
  };

  const getSimPathway = (id: string) => {
    return simulatedAnalysis.pathways.find(p => p.id === id);
  };

  const refurb = getSimPathway('refurbish')!;
  const repair = getSimPathway('repair')!;
  const recycle = getSimPathway('recycling')!;
  const reuse = getSimPathway('reuse')!;
  const donate = getSimPathway('donate')!;

  const currency = formData.currency || 'INR';

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
            Stage 5 of 6 · Interactive Scenario Sandbox
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            "What If?" Sensitivity & Trade-Off Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tweak real-world market variables (part pricing, DIY labor, scrap commodity swings) to see how economic and circular feasibility adapt.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
          <button
            onClick={onProceed}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md"
          >
            <span>Proceed to Next Steps</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator Control Center */}
      <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
        <h3 className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-4 flex items-center gap-1.5">
          <Sliders className="w-4 h-4" />
          Market & Operational Variables
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider: Battery Cost */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-200">
                Battery Replacement Cost
              </label>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {modifiers.batteryReplacementCostFactor}x ({modifiers.batteryReplacementCostFactor <= 0.8 ? 'Third-Party' : modifiers.batteryReplacementCostFactor >= 1.4 ? 'OEM Auth' : 'Standard'})
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
              <span>Third-party compatible</span>
              <span>OEM Genuine</span>
            </div>
          </div>

          {/* Toggle: DIY Labor vs Pro Shop */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 block mb-1">
                Labor Strategy
              </span>
              <p className="text-[11px] text-slate-400">
                Save professional shop fees by utilizing iFixit self-repair guide
              </p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => setModifiers(p => ({ ...p, diyRepairLabor: false }))}
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  !modifiers.diyRepairLabor
                    ? 'bg-slate-700 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                Pro Repair Shop
              </button>
              <button
                type="button"
                onClick={() => setModifiers(p => ({ ...p, diyRepairLabor: true }))}
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  modifiers.diyRepairLabor
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                DIY Self-Install
              </button>
            </div>
          </div>

          {/* Selector: Secondary Market Demand */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 block mb-1">
                Secondary Laptop Market Demand
              </span>
              <p className="text-[11px] text-slate-400">
                Current buyer willingness to pay for Grade-B refurbished 5-yr laptops
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              {(['depressed', 'stable', 'high'] as const).map((dm) => (
                <button
                  key={dm}
                  type="button"
                  onClick={() => setModifiers(p => ({ ...p, refurbishedMarketDemand: dm }))}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium capitalize transition-colors ${
                    modifiers.refurbishedMarketDemand === dm
                      ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {dm}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Scenario 1: Recycle Now */}
        <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                <Recycle className="w-4 h-4 text-slate-400" />
                Scenario A: Recycle Now
              </span>
              <span className="text-[10px] text-rose-400 font-mono">Premature Shredding</span>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Device Life Status:</span>
                <strong className="text-rose-400 text-sm">Ends Immediately (0 Added Life)</strong>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Recovered Scrap Metal Value:</span>
                <strong className="text-white text-sm font-mono">
                  {currency} {recycle.potentialRecoveredValue.min}–{recycle.potentialRecoveredValue.max}
                </strong>
                <p className="text-[10px] text-slate-500 mt-1">Crushed for raw aluminum, copper & trace gold.</p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Embodied Carbon Avoided:</span>
                <strong className="text-slate-300 text-sm font-mono">~42 kg CO2e</strong>
                <p className="text-[10px] text-rose-400/80 mt-1">⚠️ Leaves 80% of functional silicon utility unrecovered.</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
            Best when: Motherboard is fried or chassis is crushed beyond economical repair.
          </div>
        </div>

        {/* Scenario 2: Repair (Targeted Fix) */}
        <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-sky-400 font-semibold flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-sky-400" />
                Scenario B: Repair Only
              </span>
              <span className="text-[10px] text-sky-300 font-mono">Personal Utility</span>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Est. Repair Cost:</span>
                <strong className="text-white text-sm font-mono">
                  {currency} {repair.estimatedCost.min}–{repair.estimatedCost.max}
                </strong>
                <p className="text-[10px] text-slate-500 mt-1">
                  {modifiers.diyRepairLabor ? 'DIY: No technician labor charged' : 'Includes professional shop bench labor'}
                </p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Additional Useful Life:</span>
                <strong className="text-teal-300 text-sm font-mono">+2.5 Years</strong>
                <p className="text-[10px] text-slate-500 mt-1">Fully untethered mobile operation restored.</p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Embodied Carbon Avoided:</span>
                <strong className="text-emerald-400 text-sm font-mono">~185 kg CO2e</strong>
                <p className="text-[10px] text-emerald-400/90 mt-1">High circular return for individual owner.</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
            Best when: You want to keep using the laptop yourself for school or remote work.
          </div>
        </div>

        {/* Scenario 3: Refurbish (Recommended) */}
        <div className="bg-gradient-to-b from-emerald-950/40 to-[#0e1620] border-2 border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Scenario C: Full Refurbish
              </span>
              <span className="text-[10px] text-emerald-300 font-mono font-bold">Highest Circular ROI</span>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Est. Refurbishment Cost:</span>
                <strong className="text-white text-sm font-mono">
                  {currency} {refurb.estimatedCost.min}–{refurb.estimatedCost.max}
                </strong>
                <p className="text-[10px] text-slate-500 mt-1">New battery + thermal repaste + clean OS QA.</p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Potential Resale/Market Value:</span>
                <strong className="text-emerald-400 text-sm font-mono font-bold">
                  {currency} {refurb.potentialRecoveredValue.min}–{refurb.potentialRecoveredValue.max}
                </strong>
                <p className="text-[10px] text-emerald-300 mt-1">
                  Net economic gain: ~{currency} {refurb.netEconomicBenefit.toLocaleString()}
                </p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">Additional Useful Life & Carbon:</span>
                <strong className="text-teal-300 text-sm font-mono">+3.2 Years · ~210 kg CO2e</strong>
                <p className="text-[10px] text-slate-400 mt-1">Empowers secondary user with certified device.</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-emerald-400/90 border-t border-slate-800 pt-3 font-medium">
            Winner: Produces 35x more economic value than immediate metal scrap shredding.
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
          <span>Back to Recommendation</span>
        </button>
        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
        >
          <span>View Actionable Next Steps & Vetted Destinations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
