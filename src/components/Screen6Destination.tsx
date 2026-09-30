import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  ArrowLeft, 
  RotateCcw, 
  Download, 
  Share2, 
  FileText, 
  AlertTriangle,
  Award,
  Truck,
  HardDrive
} from 'lucide-react';
import { AnalysisResult, PathwayId } from '../types';

interface Screen6DestinationProps {
  analysis: AnalysisResult;
  onBack: () => void;
  onReset: () => void;
  onOpenDossier: () => void;
}

export const Screen6Destination: React.FC<Screen6DestinationProps> = ({
  analysis,
  onBack,
  onReset,
  onOpenDossier
}) => {
  const { recommendedPathway: recId, pathways, deviceIdentity } = analysis;
  const recommended = pathways.find(p => p.id === recId) || pathways[1];

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (key: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const checklistItems = [
    {
      id: 'step-data-wipe',
      title: 'NIST SP 800-88 Secure Data Sanitization',
      desc: 'Backup personal files, then run full drive encryption wipe or factory reset to protect privacy before handing over the device.'
    },
    {
      id: 'step-accounts',
      title: 'Sign Out Accounts & Deactivate BitLocker / Find My',
      desc: 'Remove Microsoft/Google/Apple accounts and firmware passwords so the secondary refurbisher or recipient can boot cleanly.'
    },
    {
      id: 'step-charger',
      title: 'Gather Original Power Adapter & Accessories',
      desc: 'Including the OEM Dell power brick increases the device resale or refurbishment yield by ₹800–₹1,200.'
    },
    {
      id: 'step-battery-safety',
      title: 'Inspect Battery Physical Integrity',
      desc: 'Confirm the battery does not exhibit physical swelling ("pillowing"). Discharge to under 30% before transit per UN 3481 safety guidelines.'
    },
    {
      id: 'step-handover',
      title: 'Transfer to Vetted Destination',
      desc: `Deliver to ${recommended.destination.category} (${recommended.destination.recommendedPartnerType}).`
    }
  ];

  const handleExportSummary = () => {
    const reportText = `
CIRCULIFE AI — E-WASTE SECOND-LIFE ENGINE REPORT
===================================================
Device: ${deviceIdentity.detectedModel}
Report ID: ${analysis.deviceId}
Timestamp: ${analysis.timestamp}
===================================================
RECOMMENDED PATHWAY: ${recommended.name.toUpperCase()}
Cost Estimate: ${recommended.estimatedCost.currency} ${recommended.estimatedCost.min} - ${recommended.estimatedCost.max}
Potential Value: ${recommended.potentialRecoveredValue.currency} ${recommended.potentialRecoveredValue.min} - ${recommended.potentialRecoveredValue.max}
Estimated Added Life: ${recommended.environmentalImpact.addedUsefulLifeYears} Years
Embodied CO2e Avoided: ${recommended.environmentalImpact.embodiedCo2eSavedKg} kg

DESTINATION CATEGORY:
${recommended.destination.category}
Recommended Partner: ${recommended.destination.recommendedPartnerType}

DATA SECURITY REQUIREMENTS:
${recommended.destination.dataSecurityRequirements.join('\n')}

HANDOVER ACTION STEPS:
${recommended.destination.actionSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

CircuLife AI MVP — Making old electronics a resource, not premature waste.
`;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CircuLife-Report-${deviceIdentity.detectedBrand}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
            Stage 6 of 6 · Actionable Execution
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Destination & Preparation Roadmap
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Your concrete next steps: secure data sanitization, certified destination channels, and asset handover.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSummary}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Report</span>
          </button>
          <button
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-xs font-medium text-emerald-300"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Architecture Dossier</span>
          </button>
        </div>
      </div>

      {/* Target Destination Profile Card */}
      <div className="bg-[#0e1620] border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-7 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block font-semibold">
                Recommended Destination Category
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                {recommended.destination.category}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-300">
              Turnaround: <strong className="text-emerald-400">~{recommended.destination.estimatedTurnaroundDays} Days</strong>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <span className="text-xs uppercase font-mono text-slate-400 block mb-2 font-semibold">
              Partner Channel & Accreditation
            </span>
            <p className="text-xs text-slate-300 bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 leading-relaxed">
              {recommended.destination.recommendedPartnerType}
            </p>
          </div>

          <div>
            <span className="text-xs uppercase font-mono text-slate-400 block mb-2 font-semibold flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              Data Security & Privacy Protocol
            </span>
            <div className="text-xs text-slate-300 bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              {recommended.destination.dataSecurityRequirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Preparation Checklist */}
      <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-6 sm:p-7 mb-8">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            Owner Preparation Checklist (NIST 800-88 & Safe Handover)
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {Object.values(completedSteps).filter(Boolean).length} of {checklistItems.length} completed
          </span>
        </div>

        <div className="space-y-3">
          {checklistItems.map((item) => {
            const isDone = !!completedSteps[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleStep(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-emerald-400 shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <div className="flex-1 text-xs">
                  <div className={`font-semibold mb-0.5 ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                    {item.title}
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recognized E-Waste & Circular Standards Directory */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 mb-8">
        <h4 className="text-xs uppercase font-mono text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-400" />
          Recommended Circular & Environmental Certifications
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <strong className="text-white block mb-0.5">R2v3 Standard</strong>
            <span className="text-[11px] text-slate-400">Responsible Recycling certified facilities for data destruction & reuse.</span>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <strong className="text-white block mb-0.5">e-Stewards</strong>
            <span className="text-[11px] text-slate-400">Highest global anti-export and toxic landfill prevention standard.</span>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <strong className="text-white block mb-0.5">CPCB Authorized</strong>
            <span className="text-[11px] text-slate-400">Central Pollution Control Board statutory e-waste compliance.</span>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <strong className="text-white block mb-0.5">ISO 14001:2015</strong>
            <span className="text-[11px] text-slate-400">Audited environmental management systems & traceability.</span>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors w-full sm:w-auto justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to What-If Explorer</span>
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-all w-full sm:w-auto justify-center"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>Start New Device Triage</span>
        </button>
      </div>

    </div>
  );
};
