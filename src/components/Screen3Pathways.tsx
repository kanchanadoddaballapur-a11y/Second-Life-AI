import React, { useState } from 'react';
import { 
  Wrench, 
  RotateCw, 
  Sparkles, 
  DollarSign, 
  HeartHandshake, 
  Cpu, 
  Recycle, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { AnalysisResult, PathwayEvaluation, PathwayId } from '../types';

interface Screen3PathwaysProps {
  analysis: AnalysisResult;
  onProceed: () => void;
  onBack: () => void;
  onSelectPathway?: (id: PathwayId) => void;
}

export const Screen3Pathways: React.FC<Screen3PathwaysProps> = ({
  analysis,
  onProceed,
  onBack
}) => {
  const { pathways } = analysis;
  const [activePathwayId, setActivePathwayId] = useState<PathwayId>(analysis.recommendedPathway);

  const activePathway = pathways.find(p => p.id === activePathwayId) || pathways[0];

  const getPathwayIcon = (id: PathwayId) => {
    switch (id) {
      case 'repair': return Wrench;
      case 'reuse': return RotateCw;
      case 'refurbish': return Sparkles;
      case 'resell': return DollarSign;
      case 'donate': return HeartHandshake;
      case 'component_recovery': return Cpu;
      case 'recycling': return Recycle;
    }
  };

  const renderFeasibilityBadge = (feasibility: PathwayEvaluation['feasibility']) => {
    switch (feasibility) {
      case 'High':
        return <span className="text-emerald-400 font-semibold">High Feasibility</span>;
      case 'Medium':
        return <span className="text-amber-400 font-semibold">Moderate</span>;
      case 'Low':
        return <span className="text-rose-400 font-semibold">Low Feasibility</span>;
      default:
        return <span className="text-slate-400 font-semibold">Infeasible</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
            Stage 3 of 6 · Multi-Pathway Comparative Matrix
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Second-Life Pathway Evaluation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Every device is evaluated across 7 distinct circular pathways based on component health, market economics, and carbon savings.
          </p>
        </div>
        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
        >
          <span>View Primary Recommendation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Transparent Framework Comparison Table */}
      <div className="bg-[#0e1620] border border-slate-800 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Full Comparative Decision Matrix</h3>
          </div>
          <span className="text-[11px] text-slate-400">Click any row to inspect deep engineering breakdown</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-4">Pathway</th>
                <th className="py-3 px-4">Estimated Cost</th>
                <th className="py-3 px-4">Potential Value</th>
                <th className="py-3 px-4">Feasibility</th>
                <th className="py-3 px-4">Second-Life Outlook</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {pathways.map((p) => {
                const Icon = getPathwayIcon(p.id);
                const isSelected = activePathwayId === p.id;
                return (
                  <tr
                    key={p.id}
                    onClick={() => setActivePathwayId(p.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-950/30 ring-1 ring-emerald-500/40'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4 font-sans">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          p.isRecommended ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-semibold text-white block">{p.name}</span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">{p.tagline}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-200">
                      {p.estimatedCost.min === 0 && p.estimatedCost.max === 0 
                        ? '₹0 (Free)'
                        : `${p.estimatedCost.currency} ${p.estimatedCost.min.toLocaleString()}–${p.estimatedCost.max.toLocaleString()}`}
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">
                      {p.potentialRecoveredValue.currency} {p.potentialRecoveredValue.min.toLocaleString()}–{p.potentialRecoveredValue.max.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {renderFeasibilityBadge(p.feasibility)}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      {p.secondLifePotential === 'High' && <span className="text-emerald-400">High (+2.5 to 3 yrs)</span>}
                      {p.secondLifePotential === 'Medium' && <span className="text-amber-400">Medium (+1 to 2 yrs)</span>}
                      {p.secondLifePotential === 'Low' && <span className="text-slate-400">Low (End of life)</span>}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-300">
                      {p.confidence}
                    </td>
                    <td className="py-3 px-4 font-sans text-right">
                      {p.isRecommended && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          Recommended
                        </span>
                      )}
                      {p.isAlternative && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                          Alternative
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Drill-Down Card for Active Pathway */}
      <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            {React.createElement(getPathwayIcon(activePathway.id), {
              className: 'w-6 h-6 text-emerald-400'
            })}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-white">
                  Pathway Deep Dive: {activePathway.name}
                </h3>
                {activePathway.isRecommended && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Engine Pick
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{activePathway.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Net Benefit</span>
              <span className="text-emerald-400 font-bold text-sm">
                +{activePathway.potentialRecoveredValue.currency} {activePathway.netEconomicBenefit.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">CO2e Saved</span>
              <span className="text-teal-400 font-bold text-sm">
                {activePathway.environmentalImpact.embodiedCo2eSavedKg} kg
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          {activePathway.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supporting Evidence */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Supporting Hardware Evidence
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activePathway.supportingEvidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">·</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Uncertainties & Destination */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Key Risks & Engineering Uncertainties
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activePathway.keyRisksOrUncertainties.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">·</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400">
              <span className="text-slate-300 font-semibold block mb-1">Target Destination Category:</span>
              <span className="text-emerald-400">{activePathway.destination.category}</span>
              <p className="text-[11px] text-slate-500 mt-1">{activePathway.destination.recommendedPartnerType}</p>
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
          <span>Back to Assessment</span>
        </button>
        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
        >
          <span>Examine Primary Recommendation & Trade-Offs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
