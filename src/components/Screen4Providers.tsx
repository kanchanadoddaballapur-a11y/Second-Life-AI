import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Globe, 
  ExternalLink, 
  Star, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Info,
  Layers,
  Heart,
  CheckSquare,
  Square,
  ShieldCheck,
  ChevronDown,
  X,
  Sparkles
} from 'lucide-react';
import { AnalysisResult, NearbyProvider, SortOption, UserPreferences } from '../types';
import { filterNearbyProviders, VERIFIED_PROVIDERS } from '../data/providers';

interface Screen4ProvidersProps {
  analysis: AnalysisResult;
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  selectedProvider: NearbyProvider | null;
  setSelectedProvider: (provider: NearbyProvider) => void;
  savedProviderIds: string[];
  onToggleSaveProvider: (id: string) => void;
  onProceed: () => void;
  onBack: () => void;
  onGoToCompare: () => void;
}

export const Screen4Providers: React.FC<Screen4ProvidersProps> = ({
  analysis,
  preferences,
  setPreferences,
  selectedProvider,
  setSelectedProvider,
  savedProviderIds = [],
  onToggleSaveProvider = () => {},
  onProceed,
  onBack,
  onGoToCompare
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('nearest');
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [detailModalProvider, setDetailModalProvider] = useState<NearbyProvider | null>(null);

  // Filter and sort providers
  const { matchingProviders, relaxationSuggestions, unmatchedReason, totalBeforeDistanceLimit } = filterNearbyProviders(
    VERIFIED_PROVIDERS,
    preferences,
    sortBy
  );

  const displayedProviders = matchingProviders.slice(0, visibleCount);

  const userSelectedPathwaysLabel = preferences.selectedPathways.includes('ai_suggest')
    ? 'AI-Assisted Suggestion'
    : preferences.selectedPathways.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace('_', ' ')).join(', ');

  const handleSelectAndProceed = (provider: NearbyProvider) => {
    setSelectedProvider(provider);
    onProceed();
  };

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 providers simultaneously.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const handleExpandDistance = (dist: 5 | 10 | 25 | 'city') => {
    setPreferences(p => ({ ...p, distanceLimit: dist }));
  };

  const handleRemoveBudgetFilter = () => {
    setPreferences(p => ({ ...p, isCustomBudget: false, budgetPreset: 'none' }));
  };

  const handleResetToAllProviders = () => {
    setPreferences(p => ({
      ...p,
      budgetPreset: 'none',
      isCustomBudget: false,
      distanceLimit: 'city',
      providerTypes: []
    }));
  };

  const comparisonProviders = VERIFIED_PROVIDERS.filter(p => selectedForCompare.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Top Banner: Stage 4 Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span 
            className="text-xs font-mono uppercase text-emerald-400 tracking-wider"
            style={{ backgroundColor: '#f7f7f7' }}
          >
            Nearby options · Multiple verified facilities
          </span>
          <h2 
            className="font-display font-bold text-white mt-1"
            style={{ color: '#110e0e', fontSize: '38px' }}
          >
            Showing {matchingProviders.length}+ Providers Matching Your Preferences
          </h2>
          <p 
            className="text-xs text-slate-400 mt-1"
            style={{ color: '#070a12', fontSize: '14px' }}
          >
            Local workshops, certified refurbishers, donation hubs, and CPCB recyclers in Indian Rupees (₹).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedForCompare.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-200 text-xs font-bold transition-all animate-pulse"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Compare Selected ({selectedForCompare.length})</span>
            </button>
          )}

          {selectedProvider && (
            <button
              onClick={onProceed}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
              style={{ backgroundColor: '#bf8fff' }}
            >
              <span>View Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Two-Stage Separation Card (User Selected vs AI Analysis vs Alternatives) */}
      <div 
        className="border border-slate-800 rounded-2xl p-5 mb-6"
        style={{ backgroundColor: '#eaddfe' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div 
            className="border border-slate-800 rounded-xl p-3.5"
            style={{ backgroundColor: '#080b18' }}
          >
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold block mb-1">
              Your Selected Pathway
            </span>
            <strong className="text-white text-sm block mb-1">
              {userSelectedPathwaysLabel}
            </strong>
            <p className="text-slate-400 leading-snug">
              Filtering local facilities matching your chosen route in {preferences.location.city}.
            </p>
          </div>

          <div 
            className="border border-slate-800 rounded-xl p-3.5"
            style={{ backgroundColor: '#060b18' }}
          >
            <span className="text-[10px] uppercase font-mono text-sky-400 font-semibold block mb-1">
              AI Technical Audit
            </span>
            <strong className="text-slate-200 text-sm block mb-1">
              Motherboard Functional · Battery Degraded
            </strong>
            <p className="text-slate-400 leading-snug">
              Passes boot & POST test. Modular battery fix is verified technically feasible.
            </p>
          </div>

          <div 
            className="border border-slate-800 rounded-xl p-3.5"
            style={{ backgroundColor: '#01010e' }}
          >
            <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold block mb-1">
              Alternative Viable Options
            </span>
            <strong className="text-slate-200 text-sm block mb-1">
              Refurbish · Stationary Reuse · Donation
            </strong>
            <p className="text-slate-400 leading-snug">
              Ready for immediate comparison if repair quotes exceed your budget.
            </p>
          </div>

        </div>
      </div>

      {/* Filter Bar with Visible "Sort by" Dropdown */}
      <div 
        className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
        style={{ backgroundColor: '#0c0811' }}
      >
        
        {/* Active Criteria Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-mono text-[11px] uppercase font-semibold">Active Filter:</span>
          
          <span className="bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg">
            City: <strong className="text-white">{preferences.location.city}</strong>
          </span>

          <span className="bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg">
            Distance: <strong className="text-white">≤ {preferences.distanceLimit === 'city' ? 'Citywide' : `${preferences.distanceLimit} km`}</strong>
          </span>

          <span className="bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg">
            Budget: <strong className="text-white font-mono">
              {preferences.isCustomBudget
                ? `₹${preferences.customBudgetMin ?? 0}–₹${preferences.customBudgetMax ?? '∞'}`
                : preferences.budgetPreset === 'none'
                ? 'No fixed limit'
                : `₹${preferences.budgetPreset}`}
            </strong>
          </span>

          <button
            onClick={onBack}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium underline ml-1"
          >
            Edit Filters
          </button>
        </div>

        {/* Visible "Sort by" dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-400 font-mono text-[11px] uppercase font-semibold">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 pr-8 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
            >
              <option value="nearest">Nearest (Distance)</option>
              <option value="lowest_cost">Lowest Estimated Cost</option>
              <option value="highest_rating">Highest Rating</option>
              <option value="most_relevant">Most Relevant Service</option>
              <option value="best_budget">Best Match to Budget</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Partial / Fewer than 5 providers found within radius notice (Requirement 6) */}
      {matchingProviders.length > 0 && matchingProviders.length < 5 && preferences.distanceLimit !== 'city' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              Only <strong>{matchingProviders.length} providers</strong> were found within {preferences.distanceLimit} km.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {preferences.distanceLimit < 5 && (
              <button
                onClick={() => handleExpandDistance(5)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium"
              >
                Expand search to 5 km
              </button>
            )}
            {preferences.distanceLimit < 10 && (
              <button
                onClick={() => handleExpandDistance(10)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium"
              >
                Expand search to 10 km
              </button>
            )}
            <button
              onClick={() => handleExpandDistance('city')}
              className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold"
            >
              Search citywide
            </button>
          </div>
        </div>
      )}

      {/* Empty State / No Provider Found (Requirement 7) */}
      {matchingProviders.length === 0 && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-8 mb-8 text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="font-display font-bold text-lg text-white">
            No matching providers found
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            {unmatchedReason || 'No registered facilities satisfied your active combined filters. We never fabricate fictitious shops to fill results.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <button
              onClick={() => handleExpandDistance(10)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-semibold"
            >
              Expand distance to 10 km
            </button>
            <button
              onClick={() => setPreferences(p => ({ ...p, isCustomBudget: false, budgetPreset: '2500-5000' }))}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold"
            >
              Increase budget to ₹2,500–₹5,000
            </button>
            <button
              onClick={handleRemoveBudgetFilter}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold"
            >
              Remove budget filter
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold"
            >
              Try another pathway
            </button>
            <button
              onClick={handleResetToAllProviders}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold"
            >
              View all nearby providers
            </button>
          </div>
        </div>
      )}

      {/* Provider Cards List */}
      <div 
        className="space-y-5 mb-8"
        style={{ backgroundColor: '#0c0d15' }}
      >
        {displayedProviders.map((provider, index) => {
          const isSelected = selectedProvider?.id === provider.id;
          const isSaved = savedProviderIds.includes(provider.id);
          const isComparing = selectedForCompare.includes(provider.id);

          const cardBgStyle = index === 0
            ? { backgroundColor: '#020103' }
            : index === 1
            ? { backgroundColor: '#02080d' }
            : undefined;

          return (
            <div
              key={provider.id}
              style={cardBgStyle}
              className={`border rounded-2xl p-5 sm:p-6 transition-all ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-950/20 shadow-xl'
                  : 'border-slate-800 hover:border-slate-700 bg-[#0e1620]'
              }`}
            >
              {/* Header: Name, Verified Badge, Save button, Checkbox for comparison */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-start gap-3">
                  {/* Multi-compare checkbox */}
                  <button
                    type="button"
                    onClick={() => handleToggleCompare(provider.id)}
                    className="mt-1 text-slate-400 hover:text-white"
                    title={isComparing ? 'Remove from comparison' : 'Select to compare'}
                  >
                    {isComparing ? (
                      <CheckSquare className="w-5 h-5 text-sky-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {provider.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {provider.providerTypeLabel}
                      </span>
                      {provider.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3" /> Verified Channel
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{provider.address}</span>
                    </p>
                  </div>
                </div>

                {/* Right badges & Save button */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Distance</span>
                    <strong className="text-white text-xs font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded inline-block">
                      {provider.distanceKm} km
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleSaveProvider(provider.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isSaved
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={isSaved ? 'Saved to bookmarks' : 'Save provider'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Standardized Core Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-xs">
                
                {/* 💰 Estimated Cost (Strictly INR ₹) */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                    💰 Estimated Cost
                  </span>
                  <div className="text-base font-bold font-mono text-emerald-400">
                    {provider.estimatedCost.min === 0 && provider.estimatedCost.max === 0
                      ? '₹0 (Free / Donation)'
                      : `₹${provider.estimatedCost.min.toLocaleString('en-IN')} – ₹${provider.estimatedCost.max.toLocaleString('en-IN')}`}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {provider.estimatedCost.notes}
                  </p>
                </div>

                {/* 🕒 Opening Hours */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" /> 🕒 Hours
                  </span>
                  <div className="text-xs text-slate-200 mt-1">
                    {provider.openingHours || <span className="text-slate-500 italic">Information unavailable — call ahead</span>}
                  </div>
                </div>

                {/* 📞 Contact & 🌐 Website */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                    📞 Contact & 🌐 Website
                  </span>
                  <div className="space-y-1 mt-1 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Phone className="w-3 h-3 text-slate-500" />
                      {provider.phone ? (
                        <a href={`tel:${provider.phone}`} className="hover:text-emerald-400 underline font-mono">
                          {provider.phone}
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">Information unavailable</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Globe className="w-3 h-3 text-slate-500" />
                      {provider.website ? (
                        <a 
                          href={provider.website} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="hover:text-emerald-400 underline truncate max-w-[170px] inline-block font-mono"
                        >
                          Official Website
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">Website unavailable</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* 🔧 Services & ⭐ Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1 font-semibold">
                    🔧 Services:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {provider.services.map((svc, i) => (
                      <span 
                        key={i} 
                        className="text-[11px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        ✓ {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {provider.rating && (
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shrink-0 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <strong className="text-amber-300 font-bold">{provider.rating}</strong>
                    <span className="text-slate-500 text-[10px]">({provider.reviewCount} verified ratings)</span>
                  </div>
                )}
              </div>

              {/* Why It Matches Explanation */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 mb-4 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Why it matches: </strong>
                  {provider.whyItMatches}
                </div>
              </div>

              {/* Standardized Buttons: View Details, Visit Website, Call, Get Directions, plus Select */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center gap-2">
                  {/* View Details */}
                  <button
                    type="button"
                    onClick={() => setDetailModalProvider(provider)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Details</span>
                  </button>

                  {/* Visit Website */}
                  {provider.website ? (
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>Visit Website</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 text-[11px] text-slate-500 cursor-not-allowed">
                      Website unavailable
                    </span>
                  )}

                  {/* Call */}
                  {provider.phone ? (
                    <a
                      href={`tel:${provider.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 text-[11px] text-slate-500 cursor-not-allowed">
                      Phone unlisted
                    </span>
                  )}

                  {/* Get Directions */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(provider.name + ' ' + provider.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Get Directions</span>
                  </a>

                  {/* Checkbox compare indicator */}
                  <button
                    type="button"
                    onClick={() => handleToggleCompare(provider.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1"
                  >
                    {isComparing ? '✓ Selected to compare' : 'Select to compare'}
                  </button>
                </div>

                {/* Primary Select Provider Button */}
                <button
                  type="button"
                  onClick={() => handleSelectAndProceed(provider)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                      : 'bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700'
                  }`}
                >
                  <span>{isSelected ? 'Confirmed Provider · Continue' : 'Select This Provider'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* "Load More Providers" / Pagination (Requirement 4) */}
      {matchingProviders.length > visibleCount && (
        <div className="text-center py-4 border-t border-slate-800 mb-8 space-y-2">
          <p className="text-xs text-slate-400 font-mono">
            Showing {displayedProviders.length} of {matchingProviders.length} nearby providers
          </p>
          <button
            type="button"
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Load More Providers
          </button>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span style={{ color: '#111113', fontSize: '15px' }}>Adjust Preferences & Budget</span>
        </button>
        <button
          onClick={onGoToCompare}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs"
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Compare All Pathways</span>
        </button>
      </div>

      {/* Comparison Modal Table (Requirement 5) */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0b1117] border border-slate-800 rounded-3xl w-full max-w-4xl p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold">Side-by-Side Facility Evaluation</span>
                <h3 className="font-display font-bold text-lg text-white">Compare Selected Providers</h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="py-3 px-3">Provider</th>
                    <th className="py-3 px-3">Distance</th>
                    <th className="py-3 px-3">Estimated Cost</th>
                    <th className="py-3 px-3">Rating</th>
                    <th className="py-3 px-3">Website</th>
                    <th className="py-3 px-3">Primary Services</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-sans">
                  {comparisonProviders.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-white">
                        {p.name}
                        <span className="block text-[10px] text-slate-400 font-normal">{p.providerTypeLabel}</span>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {p.distanceKm} km
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                        {p.estimatedCost.min === 0 ? '₹0' : `₹${p.estimatedCost.min.toLocaleString('en-IN')} – ₹${p.estimatedCost.max.toLocaleString('en-IN')}`}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {p.rating ? (
                          <span className="text-amber-400">★ {p.rating}</span>
                        ) : (
                          <span className="text-slate-500">Unrated</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        {p.website ? (
                          <a href={p.website} target="_blank" rel="noreferrer" className="text-emerald-400 underline">
                            View
                          </a>
                        ) : (
                          <span className="text-slate-500">Unavailable</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-[11px] max-w-xs truncate text-slate-300">
                        {p.services.slice(0, 2).join(', ')}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCompareModalOpen(false);
                            handleSelectAndProceed(p);
                          }}
                          className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span>All figures are indicative estimates derived from verified service benchmarks.</span>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Popover Modal */}
      {detailModalProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1117] border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold">Provider Dossier</span>
                <h3 className="font-display font-bold text-lg text-white">{detailModalProvider.name}</h3>
              </div>
              <button
                onClick={() => setDetailModalProvider(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Physical Facility Location</span>
                <p className="text-white flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{detailModalProvider.address} ({detailModalProvider.distanceKm} km from chosen center)</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Facility Type</span>
                  <span className="text-emerald-400 font-semibold">{detailModalProvider.providerTypeLabel}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Estimated Expenditure</span>
                  <span className="text-white font-mono font-bold">
                    {detailModalProvider.estimatedCost.min === 0
                      ? '₹0 (Free / Donation)'
                      : `₹${detailModalProvider.estimatedCost.min.toLocaleString('en-IN')} – ₹${detailModalProvider.estimatedCost.max.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Standard Operating Services</span>
                <ul className="space-y-1 text-slate-300">
                  {detailModalProvider.services.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Data & Verification Integrity</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {detailModalProvider.dataIntegrityNotes || 'Address and service profile verified through regional circular electronics registry. Quotes are subject to physical hardware inspection.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDetailModalProvider(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const p = detailModalProvider;
                  setDetailModalProvider(null);
                  handleSelectAndProceed(p);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
              >
                Select & Proceed to Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
