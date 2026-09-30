import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCw, 
  Wrench, 
  ShieldCheck, 
  Cpu, 
  Leaf, 
  CheckCircle2, 
  Layers, 
  MapPin, 
  BookOpen,
  Recycle
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenDossier: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onOpenDossier
}) => {
  return (
    <div className="min-h-screen bg-[#080d11] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#080d11]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <RotateCw className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">SecondLife AI</span>
              <span className="text-[10px] text-emerald-400 font-mono block -mt-0.5">Circular Electronics Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDossier}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors hidden sm:flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Architecture Dossier</span>
            </button>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Before you recycle, discover what's next</span>
          </div>

          {/* Center Brand Logo & Title */}
          <div className="space-y-3">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 flex items-center justify-center shadow-2xl shadow-emerald-500/30 p-4 border border-emerald-300/40">
              <RotateCw className="w-12 h-12 text-slate-950 animate-[spin_20s_linear_infinite]" />
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              SecondLife AI
            </h1>

            <p className="text-xl sm:text-2xl text-emerald-300 font-display font-medium">
              «Give your electronics another life.»
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            AI-powered second-life decisions for laptops, phones, and enterprise IT. Don't assume old means trash. 
            Evaluate repairability, refurbishment, resale, component recovery, and certified recycling with transparent Indian Rupee (₹) economics.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-base transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDossier}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Learn More & View Dossier</span>
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 text-left font-mono max-w-3xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">E-Waste Diverted</span>
              <strong className="text-white text-lg font-bold">2.2 kg</strong>
              <span className="text-slate-500 text-[11px] block mt-0.5">Per laptop restored</span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Embodied Carbon</span>
              <strong className="text-emerald-400 text-lg font-bold">~210 kg CO2e</strong>
              <span className="text-slate-500 text-[11px] block mt-0.5">Manufacturing avoided</span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Circular Recovery</span>
              <strong className="text-teal-400 text-lg font-bold">35x Value</strong>
              <span className="text-slate-500 text-[11px] block mt-0.5">Over scrap shredding</span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Local Verified Hubs</span>
              <strong className="text-sky-400 text-lg font-bold">25+ Facilities</strong>
              <span className="text-slate-500 text-[11px] block mt-0.5">Indian metro hubs</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Pillar Features */}
      <section className="border-t border-slate-800/80 bg-[#060a0e] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-mono text-emerald-400 font-semibold tracking-wider">
              How SecondLife AI Works
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              AI recommends and explains. The user decides.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">1. Multimodal AI Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audits 9 subassemblies (battery, logic board, display, storage). Explicitly distinguishes user assertions, visual cues, and diagnostic logs.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">2. 7-Pathway Evaluation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transparently calculates costs and potential recovered values in Indian Rupees (₹) across Repair, Refurbish, Reuse, Resell, Donate, and Recycling.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">3. Local Verified Match</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discovers 5+ real local facilities within your chosen budget and travel radius. Multi-select comparison with direct phone and directions links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 SecondLife AI · Circular Electronics & Local Provider Discovery Engine</p>
      </footer>
    </div>
  );
};
