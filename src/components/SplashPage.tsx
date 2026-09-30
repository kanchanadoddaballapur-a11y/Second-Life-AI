import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SecondLifeLogo } from './SecondLifeLogo';

interface SplashPageProps {
  onGetStarted: () => void;
  onOpenDossier: () => void;
  onGoToLogin: () => void;
  currentTheme?: string;
  onSelectTheme?: (theme: string) => void;
}

export const SplashPage: React.FC<SplashPageProps> = ({
  onGetStarted,
  onGoToLogin,
}) => {
  const [showTouchPrompt, setShowTouchPrompt] = useState(false);

  const handleLogoTouch = () => {
    setShowTouchPrompt(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfaff] via-[#f7f2ff] to-[#ede3fd] text-slate-800 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-900 relative overflow-hidden">
      
      {/* Light UI Ambient Glows & Pastel Radial Highlights */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[750px] h-[600px] bg-gradient-to-br from-purple-300/30 via-emerald-200/25 to-pink-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-5%] w-[550px] h-[550px] bg-purple-200/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Light Flowing Ribbon Geometry */}
      <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100,180 C300,80 650,550 1400,220 C1800,40 2000,380 2200,280" fill="none" stroke="url(#lightRibbon1)" strokeWidth="2.5" />
        <path d="M-50,320 C400,200 750,700 1500,350 C1900,160 2100,550 2300,450" fill="none" stroke="url(#lightRibbon2)" strokeWidth="2" strokeDasharray="10 14" />
        <defs>
          <linearGradient id="lightRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="lightRibbon2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Bar: Clean Header with only brand & logo, buttons removed as requested */}
      <header className="relative z-30 px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            onClick={handleLogoTouch}
            className="w-11 h-11 rounded-2xl bg-white/90 border border-purple-200/80 p-1 flex items-center justify-center shadow-md shadow-purple-900/5 cursor-pointer hover:scale-105 transition-all overflow-hidden"
            title="Touch logo to Enter"
          >
            <SecondLifeLogo className="w-full h-full object-contain" withGlow />
          </div>
          <div>
            <span className="font-display font-extrabold text-xl tracking-tight text-purple-950 block">SECOND LIFE AI</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 font-semibold block -mt-0.5">Circular Electronics Engine ♻️</span>
          </div>
        </div>
      </header>

      {/* Main Hero: Centerpiece Logo and Tagline (Everything below tagline removed as requested) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto py-12 lg:py-20 my-auto">
        
        {/* Interactive Logo Touch Card (Centerpiece) */}
        <div className="relative mb-8">
          <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400/30 via-purple-300/40 to-teal-300/30 rounded-full blur-2xl opacity-80 animate-pulse pointer-events-none" />
          
          <div 
            onClick={handleLogoTouch}
            className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl bg-white/95 border-2 border-purple-200/90 backdrop-blur-2xl p-4 sm:p-5 flex flex-col items-center justify-center shadow-2xl shadow-purple-900/10 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden"
            title="Click or Touch logo to Enter"
          >
            <SecondLifeLogo className="w-full h-full object-contain drop-shadow-md" withGlow />
            
            {/* Interactive hint badge */}
            <div className="absolute -bottom-3 bg-gradient-to-r from-purple-700 to-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 group-hover:scale-105 transition-transform whitespace-nowrap cursor-pointer">
              <span>Touch logo to Enter ✨</span>
            </div>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-purple-200/90 text-purple-900 text-xs font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-POWERED E-WASTE SECOND-LIFE ENGINE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black text-purple-950 tracking-tight leading-[1.1]">
            SECOND LIFE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-purple-600">AI</span>
          </h1>

          <p className="font-display text-2xl sm:text-4xl text-purple-900 font-bold tracking-tight">
            "Give Your Electronics Another Life."
          </p>
        </div>

      </main>

      {/* TOUCH LOGO PROMPT MODAL: Allows user to navigate to sign up or login on touching logo */}
      {showTouchPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-purple-200 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-24 h-24 rounded-2xl bg-purple-50/80 border border-purple-200 p-2 mx-auto flex items-center justify-center shadow-md overflow-hidden">
              <SecondLifeLogo className="w-full h-full object-contain" withGlow />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-xl text-purple-950">
                SECOND LIFE AI ✨
              </h3>
              <p className="text-xs text-purple-900 font-semibold mt-1">
                "Give Your Electronics Another Life."
              </p>
              <p className="text-xs text-slate-500 mt-1.5">
                Where would you like to go?
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <button
                onClick={() => {
                  setShowTouchPrompt(false);
                  onGetStarted();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>✨ Create Account / Sign Up</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setShowTouchPrompt(false);
                  onGoToLogin();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>🚀 Log In to Existing Account</span>
              </button>
            </div>

            <button
              onClick={() => setShowTouchPrompt(false)}
              className="text-xs text-slate-400 hover:text-slate-700 underline pt-1 cursor-pointer block mx-auto"
            >
              Stay on Logo Page
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
