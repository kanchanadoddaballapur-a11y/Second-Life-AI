import React, { useState } from 'react';
import { SecondLifeLogo } from './SecondLifeLogo';
import { 
  Laptop, 
  MapPin, 
  RotateCw, 
  Check, 
  Menu, 
  X,
  Search,
  Calendar,
  Heart,
  Clock,
  User,
  Home,
  LogOut
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView?: string;
  onNavigate: (view: 'dashboard' | 'analyze' | 'my_devices' | 'bookings' | 'providers' | 'saved_providers' | 'history' | 'profile') => void;
  currentStep?: number;
  setCurrentStep?: (step: number) => void;
  hasAnalyzed?: boolean;
  user: UserProfile | null;
  savedProviderCount?: number;
  currentTheme?: string;
  onSelectTheme?: (theme: string) => void;
  onGoToDashboard: () => void;
  onGoToBookings?: () => void;
  onGoToHistory?: () => void;
  onOpenDossier?: () => void;
  onOpenAdvisor?: () => void;
  onReset?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'dashboard',
  onNavigate,
  currentStep = 1,
  setCurrentStep,
  hasAnalyzed = false,
  user,
  savedProviderCount = 0,
  currentTheme = 'moderate_lavender',
  onSelectTheme,
  onGoToDashboard,
  onGoToBookings,
  onGoToHistory,
  onOpenDossier,
  onOpenAdvisor,
  onReset,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = currentTheme === 'dark_purple';

  // Section 1: Simplified Main Navigation Items (Dashboard is Analyze Device)
  const navItems: { id: 'dashboard' | 'my_devices' | 'bookings' | 'providers' | 'saved_providers' | 'history' | 'profile'; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🔍' },
    { id: 'my_devices', label: 'My Devices', icon: '💻' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'providers', label: 'Nearby Providers', icon: '📍' },
    { id: 'saved_providers', label: 'Saved Providers', icon: '❤️' },
    { id: 'history', label: 'History', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b px-4 lg:px-8 py-3 font-sans transition-colors ${
      isDark 
        ? 'bg-[#0e0520]/95 border-purple-500/25 text-white' 
        : 'bg-white/90 border-purple-200/90 text-purple-950 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Header (No plant emoji) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-2.5 text-left group"
          >
            <div className={`w-8 h-8 rounded-xl p-0.5 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 overflow-hidden ${
              isDark 
                ? 'bg-purple-950/80 border border-purple-500/40' 
                : 'bg-white border border-purple-200'
            }`}>
              <SecondLifeLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className={`font-display font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-purple-950'}`}
                  style={{ fontSize: '20px' }}
                >
                  SECOND LIFE AI
                </span>
              </div>
              <p 
                className={`${isDark ? 'text-purple-300/80' : 'text-purple-800/80'}`}
                style={{ fontSize: '14px' }}
              >
                "Give Your Electronics Another Life." ✨
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Main Navigation Bar (Section 1) */}
        <nav className={`hidden xl:flex items-center gap-1 p-1 rounded-2xl border text-xs ${
          isDark ? 'bg-[#080214]/60 border-purple-500/20' : 'bg-purple-100/60 border-purple-200'
        }`}>
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? (isDark ? 'bg-purple-900/60 text-white border border-purple-400 shadow-md' : 'bg-white text-purple-950 border border-purple-200 shadow-sm')
                    : (isDark ? 'text-purple-200 hover:text-white hover:bg-purple-950/40' : 'text-purple-900 hover:bg-white/60')
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.id === 'saved_providers' && savedProviderCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-mono">
                    {savedProviderCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-2">
          {onLogout && (
            <button
              onClick={onLogout}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                isDark 
                  ? 'border-purple-500/30 bg-purple-950/60 text-purple-200 hover:bg-purple-900' 
                  : 'border-purple-200 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-950'
              }`}
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span>Log Out</span>
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-purple-200 bg-white text-purple-950"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-purple-200 grid grid-cols-2 gap-2 text-xs font-bold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                currentView === item.id ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-950'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl text-left flex items-center gap-2 bg-rose-50 text-rose-900 col-span-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      )}

    </header>
  );
};
