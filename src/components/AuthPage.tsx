import React, { useState } from 'react';
import { SecondLifeLogo } from './SecondLifeLogo';
import { 
  Lock, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthPageProps {
  initialMode?: 'signup' | 'login';
  onAuthSuccess: (user: UserProfile) => void;
  onBackToSplash: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'signup',
  onAuthSuccess,
  onBackToSplash
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(initialMode === 'login');
  const [fullName, setFullName] = useState<string>('Priya Sharma');
  const [email, setEmail] = useState<string>('priya.sharma@example.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [confirmPassword, setConfirmPassword] = useState<string>('••••••••');
  const [phoneNumber, setPhoneNumber] = useState<string>('+91 98450 12345');
  const [city, setCity] = useState<string>('Bengaluru');
  const [error, setError] = useState<string | null>(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const profile: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: isLogin ? (fullName || 'Priya Sharma') : fullName || 'Second Life Member',
      email: email || 'user@secondlife.ai',
      phone: phoneNumber,
      city: city || 'Bengaluru',
      savedProviderIds: ['prov-lapzone-repair-2', 'prov-saahas-recycler']
    };

    onAuthSuccess(profile);
  };

  const handleDemoLogin = () => {
    const demoProfile: UserProfile = {
      id: 'demo-user-1',
      fullName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98450 12345',
      city: 'Bengaluru',
      savedProviderIds: ['prov-lapzone-repair-2', 'prov-saahas-recycler']
    };
    onAuthSuccess(demoProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e031e] via-[#06010d] to-[#020005] text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 relative overflow-hidden font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Dark Purple Mixed Black Glows & 3D Silky Curves (Reference Image 1) */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Abstract Curved Futuristic Silky Ribbon Backdrop */}
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100,280 C300,80 650,680 1450,320 C1850,120 2050,480 2250,380" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="8 12" />
        <path d="M-50,420 C420,320 820,820 1520,480" fill="none" stroke="#10b981" strokeWidth="1.5" />
      </svg>

      {/* Top back navigation */}
      <div className="max-w-md w-full mx-auto mb-4 relative z-20">
        <button
          onClick={onBackToSplash}
          className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 backdrop-blur-md shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>← Back to Logo Page</span>
        </button>
      </div>

      {/* Dark Purple Mixed Black Dark Glassmorphism Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0f0422]/85 backdrop-blur-2xl border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/90 relative">
          
          {/* Luminous Neon Rim Highlight */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-purple-400/40 via-transparent to-emerald-400/30 pointer-events-none -z-10" />

          {/* Top Branding with Logo */}
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 p-2 mb-3 shadow-lg flex items-center justify-center">
              <SecondLifeLogo className="w-full h-full object-contain" withGlow />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-bold mb-2 shadow-inner">
              <span>SECOND LIFE AI ♻️</span>
            </div>

            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white">
              {isLogin ? '👋 WELCOME BACK' : '✨ CREATE YOUR ACCOUNT'}
            </h2>

            <p className="mt-1 text-xs text-purple-200/80 max-w-xs">
              {isLogin
                ? 'Continue your journey toward smarter e-waste decisions.'
                : 'Start giving your electronics a second life.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {forgotPasswordNotice && (
            <div className="mb-4 p-3 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs flex items-center justify-between">
              <span>Password reset link sent to your email!</span>
              <button onClick={() => setForgotPasswordNotice(false)} className="text-emerald-400 font-bold ml-2">Dismiss</button>
            </div>
          )}

          {/* Form with attractive emojis */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Sign Up Specific Fields */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  👤 Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Priya Sharma"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#070112]/90 border border-purple-500/35 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                📧 Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya.sharma@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#070112]/90 border border-purple-500/35 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-purple-200">
                  🔐 Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setForgotPasswordNotice(true)}
                    className="text-[11px] text-purple-300 hover:text-emerald-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#070112]/90 border border-purple-500/35 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all"
                />
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  🔐 Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#070112]/90 border border-purple-500/35 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Optional Phone & City for Sign Up */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                    📱 Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98450 12345"
                    className="w-full px-3 py-2 bg-[#070112]/90 border border-purple-500/35 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                    📍 City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bengaluru"
                    className="w-full px-3 py-2 bg-[#070112]/90 border border-purple-500/35 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>{isLogin ? '🚀 LOG IN' : '✨ CREATE ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="mt-4 pt-4 border-t border-purple-500/20 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>⚡ Quick 1-Click Demo Login (Priya Sharma · Bengaluru)</span>
            </button>
          </div>

          {/* Toggle between Sign Up and Login */}
          <div className="mt-5 text-center text-xs text-purple-200/80">
            {isLogin ? (
              <p>
                New to Second Life AI?{' '}
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setError(null); }}
                  className="font-bold text-emerald-400 hover:text-emerald-300 underline ml-1"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); setError(null); }}
                  className="font-bold text-emerald-400 hover:text-emerald-300 underline ml-1"
                >
                  Log In
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
