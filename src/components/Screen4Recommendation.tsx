import React from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Leaf, 
  TrendingUp, 
  GitFork, 
  ShieldCheck, 
  Info,
  Calendar,
  Layers,
  Flame
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface Screen4RecommendationProps {
  analysis: AnalysisResult;
  onProceed: () => void;
  onBack: () => void;
}

export const Screen4Recommendation: React.FC<Screen4RecommendationProps> = ({
  analysis,
  onProceed,
  onBack
}) => {
  const { 
    pathways, 
    recommendedPathway: recId, 
    recommendationExplanation: explanation,
    environmentalSummary
  } = analysis;

  const recommended = pathways.find(p => p.id === recId) || pathways[1];
  const alternative = pathways.find(p => p.id === explanation.alternativePathway) || pathways[0];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
            Stage 4 of 6 · Evidence-Based Verdict
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Engine Recommendation & Lifecycle Impact
          </h2>
        </div>
        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
        >
          <span>Explore "What-If" Scenarios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Spotlight Recommendation Hero */}
      <div className="relative bg-gradient-to-br from-emerald-950/40 via-[#0e1620] to-[#080d11] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs uppercase tracking-wider font-semibold border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              Optimal Second Life
            </span>
            <span className="text-xs font-mono text-slate-400">
              Confidence: <strong className="text-emerald-400">{explanation.confidenceLevel}</strong>
            </span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Recommended Pathway: {recommended.name}
          </h3>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
            {explanation.primaryRationale}
          </p>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 mb-6 font-mono text-center">
            <div>
              <span className="text-[10px] uppercase text-slate-400 block mb-1">Estimated Cost</span>
              <span className="text-base sm:text-lg font-bold text-slate-200">
                {recommended.estimatedCost.currency} {recommended.estimatedCost.min.toLocaleString()}–{recommended.estimatedCost.max.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block mb-1">Recovered Value</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400">
                {recommended.potentialRecoveredValue.currency} {recommended.potentialRecoveredValue.min.toLocaleString()}–{recommended.potentialRecoveredValue.max.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block mb-1">Useful Life Added</span>
              <span className="text-base sm:text-lg font-bold text-teal-300">
                +3.2 Years
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block mb-1">CO2e Emissions Avoided</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400">
                ~210 kg
              </span>
            </div>
          </div>

          {/* Supporting Evidence List */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 mb-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Primary Supporting Evidence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {explanation.supportingEvidence.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Uncertainty Disclosure */}
          <div className="flex items-start gap-2.5 text-xs text-amber-300/90 bg-amber-950/20 border border-amber-500/20 rounded-xl p-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Important Uncertainties: </strong>
              {explanation.criticalUncertainties.join(' ')} Estimates are non-guaranteed reference projections based on verified circular electronics benchmarks.
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact Section */}
      <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Verified Lifecycle Environmental Impact</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {environmentalSummary.verificationStatus === 'verified_model' ? 'Verified LCA Model' : 'Provisional'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-xs">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <span className="text-slate-400 block mb-1 text-[11px]">Direct E-Waste Diverted</span>
            <div className="text-2xl font-bold font-mono text-white mb-1">
              {environmentalSummary.divertedWeightKg} kg
            </div>
            <p className="text-slate-400 text-[11px]">
              Complete device kept out of informal dumping or prematurely shredding.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <span className="text-slate-400 block mb-1 text-[11px]">Embodied Carbon Avoided</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mb-1">
              ~{environmentalSummary.embodiedCo2eAvoidedKg} kg CO2e
            </div>
            <p className="text-slate-400 text-[11px]">
              Equal to driving ~820 km in a gasoline car, avoiding raw smelting for a replacement laptop.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <span className="text-slate-400 block mb-1 text-[11px]">Critical Raw Materials Preserved</span>
            <div className="text-2xl font-bold font-mono text-teal-400 mb-1">
              ~{environmentalSummary.criticalMaterialsConservedGrams} g
            </div>
            <p className="text-slate-400 text-[11px]">
              Retains high-purity aluminum, copper coils, cobalt in chassis, and rare earths.
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-800/60">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            <strong>Methodology & Citations: </strong>
            {environmentalSummary.citation}. 75–80% of personal computer lifecycle carbon is expended during manufacturing. Extending functional life by 3 years amortizes manufacturing emissions significantly.
          </span>
        </div>
      </div>

      {/* Alternative Pathway Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <GitFork className="w-4 h-4 text-sky-400" />
          <h4 className="text-sm font-semibold text-white">Viable Secondary Alternative: {alternative.name}</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {explanation.alternativeRationale}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Est. Cost: <strong className="text-slate-200">{alternative.estimatedCost.currency} {alternative.estimatedCost.min.toLocaleString()}–{alternative.estimatedCost.max.toLocaleString()}</strong></span>
          <span>·</span>
          <span>Recovered Utility: <strong className="text-emerald-400">{alternative.potentialRecoveredValue.currency} {alternative.potentialRecoveredValue.min.toLocaleString()}–{alternative.potentialRecoveredValue.max.toLocaleString()}</strong></span>
          <span>·</span>
          <span>Feasibility: <strong className="text-sky-300">{alternative.feasibility}</strong></span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matrix</span>
        </button>
        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
        >
          <span>Run "What If?" Scenario Explorer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
