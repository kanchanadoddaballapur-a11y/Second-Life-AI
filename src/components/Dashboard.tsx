import React, { useState } from 'react';
import { SecondLifeLogo } from './SecondLifeLogo';
import { 
  Laptop, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Clock, 
  User, 
  Bookmark, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  Trash2,
  Calendar,
  Home as HomeIcon,
  Search,
  Bell,
  LogOut,
  Wrench,
  RotateCw,
  Cpu,
  Menu,
  Globe,
  Palette,
  Check,
  X,
  PlusCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { BookingItem, BookingNotification, NearbyProvider, UserProfile } from '../types';
import { VERIFIED_PROVIDERS } from '../data/providers';

interface DashboardProps {
  user: UserProfile;
  savedProviderIds: string[];
  bookings: BookingItem[];
  notifications: BookingNotification[];
  currentTheme?: string;
  onSelectTheme?: (theme: string) => void;
  onToggleSaveProvider: (id: string) => void;
  onStartDeviceIntake: (presetId?: string) => void;
  onGoToBookings: () => void;
  onGoToProviders: () => void;
  onGoToHistory: () => void;
  onOpenDossier: () => void;
  onLogout: () => void;
  initialTab?: 'overview' | 'my_devices' | 'saved_providers' | 'profile';
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  savedProviderIds,
  bookings,
  notifications,
  currentTheme = 'moderate_lavender',
  onSelectTheme,
  onToggleSaveProvider,
  onStartDeviceIntake,
  onGoToBookings,
  onGoToProviders,
  onGoToHistory,
  onOpenDossier,
  onLogout,
  initialTab = 'overview'
}) => {
  // Navigation tabs matching Section 1
  const [activeTab, setActiveTab] = useState<'overview' | 'my_devices' | 'saved_providers' | 'profile'>(initialTab);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const isDark = currentTheme === 'dark_purple';
  const savedProviders = VERIFIED_PROVIDERS.filter(p => savedProviderIds.includes(p.id));
  const upcomingBooking = bookings.find(b => b.status === 'scheduled' || b.status === 'in_progress');

  // Tracked Devices for "My Devices" section
  const [trackedDevices] = useState([
    {
      id: 'dev-1',
      name: 'Dell Inspiron 15 (5-Year Model)',
      type: '💻 Laptop',
      condition: '🔋 Battery Depleted · Functional Board',
      status: '🔧 Action Planned (Home Repair)',
      date: 'Today',
      presetId: 'dell-laptop-official'
    },
    {
      id: 'dev-2',
      name: 'MacBook Pro 13" (A1708)',
      type: '💻 Laptop',
      condition: '🖥️ Cracked Retina Display · Logic Board Active',
      status: '🔄 Secondary Monitor Reuse',
      date: '28 Sep 2026',
      presetId: 'macbook-display-damaged'
    },
    {
      id: 'dev-3',
      name: 'Lenovo Legion 5 Gaming',
      type: '🎮 Gaming Laptop',
      condition: '⚡ Liquid Damaged Motherboard · Good GPU & Storage',
      status: '🧩 Component Harvesting',
      date: '15 Sep 2026',
      presetId: 'gaming-laptop-fried-mb'
    }
  ]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-[#13072b] via-[#090317] to-[#04010a] text-slate-100 selection:bg-purple-500/25 selection:text-purple-200' 
        : 'bg-gradient-to-b from-[#f7f2fe] via-[#f1e8fb] to-[#e8ddf7] text-slate-800 selection:bg-purple-500/20 selection:text-purple-900'
    }`}>
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full flex-1 px-4 lg:px-8 py-8 space-y-8">

        {/* ======================================================== */}
        {/* OVERVIEW TAB: What do you want to do? (6 Large Actions)  */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <section className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-purple-950 dark:text-white tracking-tight">
                What do you want to do?
              </h3>
              <p className="text-xs text-slate-500">
                Select an action below to get started immediately:
              </p>
            </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Check My Device */}
                <div
                  onClick={() => onStartDeviceIntake()}
                  className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-600 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                      🔍
                    </div>
                    <h4 className="text-lg font-black text-purple-950 dark:text-white mb-1 flex items-center justify-between">
                      <span>Check My Device</span>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Find out if your phone, laptop, or electronic item can be fixed, upgraded, or sold.
                    </p>
                  </div>
                </div>

                {/* 2. Tell Us a Problem */}
                <div
                  onClick={() => onStartDeviceIntake()}
                  className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-600 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                      📝
                    </div>
                    <h4 className="text-lg font-black text-purple-950 dark:text-white mb-1 flex items-center justify-between">
                      <span>Tell Us a Problem</span>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Explain in your own words. We will figure out what is wrong and guide you.
                    </p>
                  </div>
                </div>

                {/* 3. Book a Service */}
                <div
                  onClick={onGoToBookings}
                  className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-600 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                      📅
                    </div>
                    <h4 className="text-lg font-black text-purple-950 dark:text-white mb-1 flex items-center justify-between">
                      <span>Book a Service</span>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Schedule a certified technician to visit your home or see active appointments.
                    </p>
                  </div>
                </div>

                {/* 4. Find a Nearby Shop */}
                <div
                  onClick={onGoToProviders}
                  className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-600 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                      📍
                    </div>
                    <h4 className="text-lg font-black text-purple-950 dark:text-white mb-1 flex items-center justify-between">
                      <span>Find a Nearby Shop</span>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Browse 5+ verified local repair centers, recyclers, and refurbishers near you in Bengaluru.
                    </p>
                  </div>
                </div>

                {/* 5. My Devices */}
                <div
                  onClick={() => setActiveTab('my_devices')}
                  className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-600 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                      💻
                    </div>
                    <h4 className="text-lg font-black text-purple-950 dark:text-white mb-1 flex items-center justify-between">
                      <span>My Devices</span>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      See your registered laptops and gadgets, plus get help for any device anytime.
                    </p>
                  </div>
                </div>

                {/* 6. My History */}
                <div
                  onClick={onGoToHistory}
                  className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-600 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-800 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                      📊
                    </div>
                    <h4 className="text-lg font-black text-purple-950 dark:text-white mb-1 flex items-center justify-between">
                      <span>My History</span>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      View past device analyses, completed bookings, and cancelled records in one place.
                    </p>
                  </div>
                </div>

              </div>
            </section>
        )}

        {/* ======================================================== */}
        {/* MY DEVICES TAB: Section 7                                */}
        {/* ======================================================== */}
        {activeTab === 'my_devices' && (
          <section className="space-y-6">
            
            {/* SECTION 7: PROMINENT "TELL US YOUR PROBLEM" CARD */}
            <div className="bg-purple-100 dark:bg-purple-950/70 border-2 border-purple-300 dark:border-purple-600 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-purple-800 uppercase block">
                  Quick Support
                </span>
                <h3 className="text-xl font-black text-purple-950 dark:text-white mt-0.5">
                  📝 Tell Us Your Problem
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  Is one of your devices acting up? You don't need to know the technical terms. Just tell us what happened and we will help you fix or sell it.
                </p>
              </div>

              <button
                onClick={() => onStartDeviceIntake()}
                className="px-6 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-md shrink-0 flex items-center gap-2"
              >
                <span>Describe Device Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-purple-950 dark:text-white">
                  💻 Tracked Devices ({trackedDevices.length})
                </h3>
                <p className="text-xs text-slate-500">Your registered electronics and current next steps.</p>
              </div>

              <button
                onClick={() => onStartDeviceIntake()}
                className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs"
              >
                + Add Device
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trackedDevices.map((d) => (
                <div
                  key={d.id}
                  className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 rounded-3xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{d.type.includes('Laptop') ? '💻' : '📱'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold">
                      {d.date}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-base text-purple-950 dark:text-white">
                      {d.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {d.condition}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border text-xs font-semibold text-purple-900 dark:text-purple-300">
                    Status: {d.status}
                  </div>

                  <button
                    onClick={() => onStartDeviceIntake(d.presetId)}
                    className="w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-950 font-bold text-xs border border-purple-200"
                  >
                    📝 Get Help for this Device
                  </button>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ======================================================== */}
        {/* SAVED PROVIDERS TAB                                      */}
        {/* ======================================================== */}
        {activeTab === 'saved_providers' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-purple-950 dark:text-white">
                  ❤️ Saved Providers ({savedProviders.length})
                </h3>
                <p className="text-xs text-slate-500">Verified repair labs and recyclers you bookmarked.</p>
              </div>

              <button
                onClick={onGoToProviders}
                className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs"
              >
                Browse All Nearby Shops
              </button>
            </div>

            {savedProviders.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-[#110724] rounded-3xl border p-6">
                <Bookmark className="w-10 h-10 text-purple-300 mx-auto mb-2" />
                <h4 className="font-bold text-base text-purple-950">No Saved Providers Yet</h4>
                <p className="text-xs text-slate-500 mt-1">When browsing nearby shops, click the heart icon to save them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedProviders.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 rounded-3xl p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-base font-extrabold text-purple-950 dark:text-white">
                          🏪 {p.name}
                        </strong>
                        <button
                          onClick={() => onToggleSaveProvider(p.id)}
                          className="text-rose-500 hover:text-rose-700"
                          title="Remove bookmark"
                        >
                          ❤️
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{p.address} ({p.distanceKm} km away)</span>
                      </p>
                      <div className="text-xs text-purple-900 font-bold">
                        📞 {p.phone} · ⭐ {p.rating} / 5.0
                      </div>
                    </div>

                    <div className="pt-4 mt-2 flex items-center gap-2">
                      <a
                        href={`tel:${p.phone}`}
                        className="flex-1 py-2 rounded-xl bg-purple-700 text-white text-center text-xs font-bold"
                      >
                        Call Provider
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' ' + p.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl border border-purple-300 text-purple-900 text-xs font-bold"
                      >
                        Directions 📍
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ======================================================== */}
        {/* PROFILE TAB                                              */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <section className="max-w-xl mx-auto bg-white dark:bg-[#110724] border-2 border-purple-200 dark:border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-purple-100">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl font-bold">
                👤
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-purple-950 dark:text-white">
                  {user.fullName || 'Priya Sharma'}
                </h3>
                <span className="text-xs text-slate-500">{user.email || 'priya.sharma@example.com'}</span>
                <span className="block text-[11px] font-mono text-emerald-700 font-bold mt-0.5">
                  📍 Bengaluru Metro · ₹ INR Verified
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40">
                <span>📱 Phone Number:</span>
                <strong>{user.phone || '+91 98450 12345'}</strong>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40">
                <span>📍 Default Location:</span>
                <strong>{user.city || 'Bengaluru'}</strong>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40">
                <span>💰 Preferred Currency:</span>
                <strong className="text-emerald-700 font-mono font-bold">₹ Indian Rupee (INR) Only</strong>
              </div>
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold"
              >
                Log Out
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className="px-5 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs"
              >
                Back to Dashboard
              </button>
            </div>
          </section>
        )}

      </main>

      {/* Footer (No plant emoji) */}
      <footer className={`border-t py-6 px-4 text-center text-xs transition-colors ${
        isDark ? 'border-purple-950/60 bg-[#06020e] text-slate-500' : 'border-purple-200 bg-[#f9f6fd] text-slate-600'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-purple-950">SECOND LIFE AI</span>
            <span>·</span>
            <span>"Give Your Electronics Another Life." ✨</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Bengaluru Metro Hub · ₹ INR Standard</span>
            <span>·</span>
            <button onClick={onOpenDossier} className="hover:text-purple-900 font-bold transition-colors">
              Architecture Dossier (A–T)
            </button>
          </div>
        </div>
      </footer>

      {/* UI Options Modal */}
      {showThemeModal && onSelectTheme && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-purple-200 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-700" />
                <h3 className="font-display font-bold text-lg text-purple-950">
                  Select UI Theme & Style 🎨
                </h3>
              </div>
              <button onClick={() => setShowThemeModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Select your preferred visual aesthetic for SECOND LIFE AI:
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 'moderate_lavender',
                  name: '🌸 Moderate Purple Light Lavender (Requested)',
                  desc: 'Soft lavender surface, white cards, deep purple headings, sustainability accents.',
                  badge: 'Active Default'
                },
                {
                  id: 'dark_purple',
                  name: '🔮 Dark Purple Mixed Black Dark Glassmorphism',
                  desc: 'Deep obsidian violet background, neon glowing luminous rims, dark glass cards.',
                  badge: 'Futuristic Dark'
                }
              ].map((th) => {
                const isSelected = currentTheme === th.id;
                return (
                  <div
                    key={th.id}
                    onClick={() => {
                      onSelectTheme(th.id);
                      setShowThemeModal(false);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/30'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs font-bold text-purple-950">{th.name}</strong>
                      {isSelected && <Check className="w-4 h-4 text-purple-700" />}
                    </div>
                    <p className="text-[11px] text-slate-600">{th.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowThemeModal(false)}
                className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs"
              >
                Apply Selection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
