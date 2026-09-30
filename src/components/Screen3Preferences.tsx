import React from 'react';
import { 
  Wrench, 
  RotateCw, 
  Sparkles, 
  DollarSign, 
  HeartHandshake, 
  Cpu, 
  Recycle, 
  Bot, 
  MapPin, 
  Sliders, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  Compass,
  Zap,
  Leaf
} from 'lucide-react';
import { 
  AnalysisResult, 
  BudgetPreset, 
  DistanceLimitOption, 
  PathwayId, 
  ProviderType, 
  UserPreferences, 
  UserPriority, 
  UserSelectedPathwayChoice 
} from '../types';

interface Screen3PreferencesProps {
  analysis: AnalysisResult;
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onProceed: () => void;
  onBack: () => void;
}

export const Screen3Preferences: React.FC<Screen3PreferencesProps> = ({
  analysis,
  preferences,
  setPreferences,
  onProceed,
  onBack
}) => {
  const [questionStep, setQuestionStep] = React.useState<number>(1);
  const [isStepByStep, setIsStepByStep] = React.useState<boolean>(true);
  const currencySymbol = preferences.location.city ? '₹' : '₹';

  const pathwayOptions: { id: UserSelectedPathwayChoice; label: string; icon: any; desc: string; aiRecommended?: boolean }[] = [
    {
      id: 'repair',
      label: '🔧 Repair',
      icon: Wrench,
      desc: 'Replace battery/isolated fault for personal ongoing use'
    },
    {
      id: 'refurbish',
      label: '♻️ Refurbish',
      icon: Sparkles,
      desc: 'Restore to Grade-B standard for secondary resale/handover',
      aiRecommended: analysis.recommendedPathway === 'refurbish'
    },
    {
      id: 'reuse',
      label: '🔄 Reuse',
      icon: RotateCw,
      desc: 'Zero-cost stationary use on AC power (home server / media terminal)'
    },
    {
      id: 'donate',
      label: '🎁 Donate',
      icon: HeartHandshake,
      desc: 'Gift to educational non-profit after verified data sanitization'
    },
    {
      id: 'resell',
      label: '💰 Resell',
      icon: DollarSign,
      desc: 'Trade-in or liquid direct to buyer with disclosed battery flaw'
    },
    {
      id: 'component_recovery',
      label: '🧩 Recover components',
      icon: Cpu,
      desc: 'Harvest working LCD panel, RAM, SSD, and power brick'
    },
    {
      id: 'recycling',
      label: '♻️ Recycle',
      icon: Recycle,
      desc: 'Authorized hydrometallurgical smelting (material recovery)'
    },
    {
      id: 'ai_suggest',
      label: '🤖 Let AI suggest the most suitable options',
      icon: Bot,
      desc: 'Automatically evaluate pathways against detected condition'
    }
  ];

  const budgetPresets: { id: BudgetPreset; label: string }[] = [
    { id: '0-500', label: '₹0 – ₹500' },
    { id: '500-1000', label: '₹500 – ₹1,000' },
    { id: '1000-2500', label: '₹1,000 – ₹2,500' },
    { id: '2500-5000', label: '₹2,500 – ₹5,000' },
    { id: '5000-10000', label: '₹5,000 – ₹10,000' },
    { id: '10000+', label: '₹10,000+' },
    { id: 'none', label: "I don't have a fixed budget" },
  ];

  const distanceOptions: { id: DistanceLimitOption; label: string }[] = [
    { id: 1, label: 'Within 1 km' },
    { id: 3, label: 'Within 3 km' },
    { id: 5, label: 'Within 5 km' },
    { id: 10, label: 'Within 10 km' },
    { id: 25, label: 'Within 25 km' },
    { id: 'city', label: 'Anywhere in the city' },
  ];

  const priorities: { id: UserPriority; label: string; icon: any }[] = [
    { id: 'lowest_cost', label: 'Lowest Cost', icon: DollarSign },
    { id: 'highest_value', label: 'Highest Value Recovered', icon: Sparkles },
    { id: 'fastest', label: 'Fastest Solution', icon: Zap },
    { id: 'max_life', label: 'Maximum Remaining Life', icon: CheckCircle2 },
    { id: 'environmental', label: 'Environmental Impact', icon: Leaf },
    { id: 'convenience', label: 'Convenience', icon: Compass },
    { id: 'nearby', label: 'Nearby Provider', icon: MapPin },
  ];

  const providerTypeOptions: { id: ProviderType; label: string }[] = [
    { id: 'repair_shop', label: 'Repair Shop' },
    { id: 'refurbisher', label: 'Refurbisher' },
    { id: 'reseller', label: 'Reseller / Buyback' },
    { id: 'donation_org', label: 'Donation Organization' },
    { id: 'component_recovery', label: 'Component Recovery' },
    { id: 'ewaste_recycler', label: 'Authorized Recycler' },
    { id: 'authorized_service_center', label: 'Brand Service Center' },
  ];

  const handleTogglePathway = (choice: UserSelectedPathwayChoice) => {
    setPreferences(prev => {
      if (choice === 'ai_suggest') {
        return {
          ...prev,
          selectedPathways: ['ai_suggest']
        };
      }

      // If ai_suggest was selected, clear it
      const current = prev.selectedPathways.filter(p => p !== 'ai_suggest');
      const exists = current.includes(choice);
      let updated: UserSelectedPathwayChoice[];

      if (exists) {
        updated = current.filter(p => p !== choice);
        if (updated.length === 0) updated = ['ai_suggest'];
      } else {
        updated = [...current, choice];
      }

      return {
        ...prev,
        selectedPathways: updated
      };
    });
  };

  const handleToggleProviderType = (type: ProviderType) => {
    setPreferences(prev => {
      const exists = prev.providerTypes.includes(type);
      const updated = exists 
        ? prev.providerTypes.filter(t => t !== type)
        : [...prev.providerTypes, type];
      return {
        ...prev,
        providerTypes: updated
      };
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
            Stage 3 of 6 · User Preferences & Budget Filter
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            What would you like to do with your device?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            AI recommends and explains, but you hold complete control. Choose your intent, spending boundaries, and location radius.
          </p>
        </div>
        <button
          onClick={onProceed}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
        >
          <span>Find Matched Local Providers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Question Stepper Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { num: 1, label: '1. Pathways' },
            { num: 2, label: '2. Budget' },
            { num: 3, label: '3. Location' },
            { num: 4, label: '4. Priorities & Filters' }
          ].map((q) => (
            <button
              key={q.num}
              type="button"
              onClick={() => {
                setQuestionStep(q.num);
                setIsStepByStep(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isStepByStep && questionStep === q.num
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsStepByStep(!isStepByStep)}
          className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300 hover:text-white self-start sm:self-auto shrink-0"
        >
          {isStepByStep ? 'Show All Questions' : 'One Question Mode'}
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Step 1: Pathway Choice */}
        {(!isStepByStep || questionStep === 1) && (
        <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                Question 1 of 4
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-white mt-0.5">
                Select Preferred Pathway(s)
              </h3>
              <p className="text-xs text-slate-400">
                Pick one, multiple for comparison, or let the AI guide you based on battery & logic board condition.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              {preferences.selectedPathways.includes('ai_suggest')
                ? 'AI-Assisted'
                : `${preferences.selectedPathways.length} selected`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pathwayOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = preferences.selectedPathways.includes(opt.id);

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleTogglePathway(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/70 ring-1 ring-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  {opt.aiRecommended && (
                    <span className="absolute -top-2 right-3 text-[9px] font-mono uppercase bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-bold shadow-sm">
                      AI Top Pick
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {opt.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                      {isSelected ? '✓ Selected' : 'Click to select'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {isStepByStep && (
            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setQuestionStep(2)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
              >
                <span>Next: Budget Filter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        )}

        {/* Step 2: Budget / Expenditure Filter */}
        {(!isStepByStep || questionStep === 2) && (
        <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                Question 2 of 4
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-white mt-0.5">
                User Budget / Expenditure Filter
              </h3>
              <p className="text-xs text-slate-400">
                Specify what you are willing to spend. Options falling within this boundary are prioritized.
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Estimated battery fix: ₹2,500–₹3,500
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
            {budgetPresets.map((b) => {
              const isSelected = !preferences.isCustomBudget && preferences.budgetPreset === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, isCustomBudget: false, budgetPreset: b.id }))}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          {/* Custom Budget Toggle & Inputs */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.isCustomBudget}
                  onChange={(e) => setPreferences(p => ({ ...p, isCustomBudget: e.target.checked }))}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Set Custom Budget Range</span>
              </label>
              {preferences.isCustomBudget && (
                <span className="text-[10px] font-mono text-emerald-400 uppercase">Custom active</span>
              )}
            </div>

            {preferences.isCustomBudget && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Minimum Budget (₹)</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 1000"
                    value={preferences.customBudgetMin ?? ''}
                    onChange={(e) => setPreferences(p => ({ ...p, customBudgetMin: e.target.value ? Number(e.target.value) : null }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Maximum Budget (₹)</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 4500"
                    value={preferences.customBudgetMax ?? ''}
                    onChange={(e) => setPreferences(p => ({ ...p, customBudgetMax: e.target.value ? Number(e.target.value) : null }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            )}

            {/* Clear Disclosure Notice */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Transparent Pricing Distinction: </strong>
                Estimated costs are predictive benchmarks. They do not constitute a guaranteed final service quote until physical bench diagnosis by the chosen provider.
              </span>
            </div>
          </div>

          {isStepByStep && (
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setQuestionStep(1)}
                className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setQuestionStep(3)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
              >
                <span>Next: Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        )}

        {/* Step 3: Location & Distance Limit */}
        {(!isStepByStep || questionStep === 3) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          
          {/* Location Center */}
          <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
              Question 3 of 4
            </span>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Search Location
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Enter your city or area to find local physical drop-off and repair shops.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">City / Region</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={preferences.location.city}
                    onChange={(e) => setPreferences(p => ({ ...p, location: { ...p.location, city: e.target.value } }))}
                    placeholder="e.g. Bengaluru, Delhi, Mumbai"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setPreferences(p => ({ ...p, location: { city: 'Bengaluru', areaName: 'Koramangala' } }))}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
                  >
                    Demo Hub
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Area / Landmark (Optional)</label>
                <input
                  type="text"
                  value={preferences.location.areaName || ''}
                  onChange={(e) => setPreferences(p => ({ ...p, location: { ...p.location, areaName: e.target.value } }))}
                  placeholder="e.g. Koramangala / Indiranagar / Nehru Place"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Distance Limit */}
          <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                Radius Boundary
              </span>
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-400" />
                Maximum Distance
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                How far are you willing to travel or arrange courier dispatch?
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {distanceOptions.map((d) => {
                  const isSelected = preferences.distanceLimit === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setPreferences(p => ({ ...p, distanceLimit: d.id }))}
                      className={`py-2 px-2 rounded-lg border text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {isStepByStep && (
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setQuestionStep(2)}
                  className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionStep(4)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <span>Next: Priorities & Types</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
        )}

        {/* Step 4: User Priorities & Provider Type Filter */}
        {(!isStepByStep || questionStep === 4) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          
          {/* Priorities */}
          <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
              Question 4 of 4
            </span>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              What Matters Most? (Priority)
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Results sort to reflect your governing motivation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {priorities.map((pr) => {
                const Icon = pr.icon;
                const isSelected = preferences.priority === pr.id;
                return (
                  <button
                    key={pr.id}
                    type="button"
                    onClick={() => setPreferences(p => ({ ...p, priority: pr.id }))}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium flex items-center gap-2 transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{pr.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Provider Types */}
          <div className="bg-[#0e1620] border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                Facility Filter
              </span>
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" />
                Provider Type Filters
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Leave blank to view all, or restrict to specific facility types.
              </p>

              <div className="flex flex-wrap gap-2">
                {providerTypeOptions.map((pt) => {
                  const isSelected = preferences.providerTypes.includes(pt.id);
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => handleToggleProviderType(pt.id)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : ''}{pt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {isStepByStep && (
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setQuestionStep(3)}
                  className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={onProceed}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <span>Done: Find Providers ➔</span>
                </button>
              </div>
            )}
          </div>

        </div>
        )}

      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
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
          <span>Find Matching Local Options</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
