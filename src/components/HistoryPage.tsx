import React, { useState } from 'react';
import { 
  Laptop, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  FileText, 
  Filter, 
  ChevronRight, 
  Search,
  Sparkles,
  Smartphone,
  Tablet,
  Wrench,
  DollarSign,
  Recycle,
  Layers,
  Info,
  X
} from 'lucide-react';
import { BookingItem, UserProfile } from '../types';

interface HistoryPageProps {
  user: UserProfile;
  bookings: BookingItem[];
  currentTheme?: string;
  onGoToAnalyze: () => void;
  onGoToBookings: () => void;
  onGoToDashboard: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  user,
  bookings,
  currentTheme = 'moderate_lavender',
  onGoToAnalyze,
  onGoToBookings,
  onGoToDashboard
}) => {
  const isDark = currentTheme === 'dark_purple';

  // Primary categories: 📱 My Device History | 📅 My Booking History
  const [activeCategory, setActiveCategory] = useState<'devices' | 'bookings'>('bookings');

  // Booking history filter: All | Completed | Cancelled | Rescheduled
  const [bookingFilter, setBookingFilter] = useState<'all' | 'completed' | 'cancelled' | 'rescheduled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<any | null>(null);

  // Past bookings only: completed, cancelled, rescheduled, past
  const pastBookings = bookings.filter(b => 
    b.status === 'completed' || b.status === 'cancelled' || b.status === 'rescheduled'
  );

  const filteredBookings = pastBookings.filter(b => {
    if (bookingFilter === 'completed' && b.status !== 'completed') return false;
    if (bookingFilter === 'cancelled' && b.status !== 'cancelled') return false;
    if (bookingFilter === 'rescheduled' && b.status !== 'rescheduled') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDevice = `${b.deviceBrand} ${b.deviceModel} ${b.deviceType}`.toLowerCase().includes(q);
      const matchService = b.requiredService.toLowerCase().includes(q);
      const matchProvider = b.providerName.toLowerCase().includes(q);
      if (!matchDevice && !matchService && !matchProvider) return false;
    }

    return true;
  });

  // Previous Device Checks & Analyses
  const deviceHistory = [
    {
      id: 'dev-hist-1',
      deviceType: 'Laptop',
      brand: 'Dell',
      model: 'Inspiron 15 (5-Year Model)',
      icon: '💻',
      date: '16 Oct 2026',
      whatWeFound: '🔋 Your battery may not last very long.',
      plainProblem: 'Battery dies quickly when charger is unplugged',
      chosenPathway: '🔧 Fix My Device',
      serviceType: '🏠 Home Service',
      provider: 'Lapzone Chip-Level Laptop Clinic',
      status: 'Action Planned',
      estimatedCost: '₹2,500 – ₹3,500'
    },
    {
      id: 'dev-hist-2',
      deviceType: 'Laptop',
      brand: 'Apple',
      model: 'MacBook Pro 13" (A1708)',
      icon: '💻',
      date: '28 Sep 2026',
      whatWeFound: '🖥️ Your screen is cracked, but the computer inside is working well.',
      plainProblem: 'Cracked screen display glass',
      chosenPathway: '🔄 Reuse as Secondary Display',
      serviceType: 'Desk Setup',
      provider: 'Self-Setup at Home',
      status: 'Completed',
      estimatedCost: '₹0 (Free Reuse)'
    },
    {
      id: 'dev-hist-3',
      deviceType: 'Gaming Laptop',
      brand: 'Lenovo',
      model: 'Legion 5 Gaming',
      icon: '🎮',
      date: '15 Sep 2026',
      whatWeFound: '⚡ The main circuit board has water damage, but SSD and RAM are healthy.',
      plainProblem: 'Water spilled on keyboard',
      chosenPathway: '🧩 Recover Parts',
      serviceType: 'Component Harvest',
      provider: 'SP Road Component Hub',
      status: 'Completed',
      estimatedCost: '₹1,800 Value Saved'
    },
    {
      id: 'dev-hist-4',
      deviceType: 'Phone',
      brand: 'Samsung',
      model: 'Galaxy S21',
      icon: '📱',
      date: '10 Sep 2026',
      whatWeFound: '🔋 Battery health is low and outer glass has hairline cracks.',
      plainProblem: 'Battery depletes fast and screen has small crack',
      chosenPathway: '🔧 Fix My Device',
      serviceType: '🏠 Home Service',
      provider: 'Urban Company Electronics',
      status: 'Completed',
      estimatedCost: '₹4,750'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      
      {/* Friendly Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 text-xs font-semibold text-purple-900 dark:text-purple-300 mb-2">
              <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Past Activity & History</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-950 dark:text-white tracking-tight">
              📊 History
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              One clear place to see what you did with your devices and previous services.
            </p>
          </div>

          <button
            onClick={onGoToAnalyze}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>🔍 Check Another Device</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Two Large Main Categories: Section 3 & Section 19 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => setActiveCategory('bookings')}
            className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
              activeCategory === 'bookings'
                ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-600 shadow-md ring-2 ring-purple-600/20'
                : 'bg-white dark:bg-[#110724] border-purple-100 dark:border-purple-500/20 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xl font-bold">
                📅
              </div>
              <div>
                <strong className="block text-base font-extrabold text-purple-950 dark:text-white">
                  📅 My Booking History
                </strong>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  "See your previous services."
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded-full bg-purple-200/60 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200">
              {pastBookings.length} past
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('devices')}
            className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
              activeCategory === 'devices'
                ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-600 shadow-md ring-2 ring-purple-600/20'
                : 'bg-white dark:bg-[#110724] border-purple-100 dark:border-purple-500/20 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xl font-bold">
                📱
              </div>
              <div>
                <strong className="block text-base font-extrabold text-purple-950 dark:text-white">
                  📱 My Device History
                </strong>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  "See your previous device checks."
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded-full bg-purple-200/60 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200">
              {deviceHistory.length} checked
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CATEGORY 1: 📅 BOOKING HISTORY (Section 3 & Section 4)  */}
      {/* ======================================================== */}
      {activeCategory === 'bookings' && (
        <div className="space-y-6">
          
          {/* Simple Filters: All | Completed | Cancelled | Rescheduled */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#110724] p-3.5 rounded-2xl border border-purple-100 dark:border-purple-500/20 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filters:
              </span>
              {[
                { id: 'all', label: 'All' },
                { id: 'completed', label: 'Completed' },
                { id: 'cancelled', label: 'Cancelled' },
                { id: 'rescheduled', label: 'Rescheduled' }
              ].map((f) => {
                const isActive = bookingFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setBookingFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-purple-700 text-white shadow-sm'
                        : 'bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Quick search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search device or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-[#090317] border border-purple-200 dark:border-purple-500/30 text-purple-950 dark:text-white focus:outline-none focus:border-purple-500 w-full sm:w-56"
              />
            </div>
          </div>

          {/* Booking Cards (matching exact user example) */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#110724] rounded-2xl border border-purple-100 dark:border-purple-500/20 p-6">
              <Calendar className="w-10 h-10 text-purple-300 mx-auto mb-2" />
              <h3 className="font-bold text-base text-purple-950 dark:text-white">No bookings match this filter</h3>
              <p className="text-xs text-slate-500 mt-1">Try selecting "All" to see all your past bookings.</p>
              <button
                onClick={() => setBookingFilter('all')}
                className="mt-3 px-4 py-1.5 rounded-xl bg-purple-100 text-purple-900 text-xs font-bold hover:bg-purple-200"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBookings.map((b) => {
                const isCompleted = b.status === 'completed';
                const isCancelled = b.status === 'cancelled';
                const isRescheduled = b.status === 'rescheduled';

                return (
                  <div
                    key={b.id}
                    className="bg-white dark:bg-[#110724] rounded-2xl border-2 border-purple-100 dark:border-purple-500/20 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Status Tag */}
                      <div className="mb-3">
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ✅ Completed
                          </span>
                        )}
                        {isCancelled && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-300 text-xs font-bold text-rose-800 dark:text-rose-300">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            ❌ Cancelled
                          </span>
                        )}
                        {isRescheduled && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 text-xs font-bold text-amber-800 dark:text-amber-300">
                            <RotateCcw className="w-4 h-4 text-amber-600" />
                            ⚠️ Rescheduled
                          </span>
                        )}
                      </div>

                      {/* Device & Service Information */}
                      <div className="space-y-1.5 my-3">
                        <div className="font-extrabold text-base text-purple-950 dark:text-white flex items-center gap-2">
                          <span>💻</span>
                          <span>{b.deviceBrand} {b.deviceModel}</span>
                        </div>
                        <div className="text-xs text-purple-900 dark:text-purple-300 font-semibold flex items-center gap-2">
                          <span>🔧</span>
                          <span>{b.requiredService}</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <span>{b.serviceType === 'home_service' ? '🏠 Home Service' : '📍 Store Visit'}</span>
                        </div>
                      </div>

                      <hr className="border-purple-100 dark:border-purple-900/40 my-3" />

                      {/* Date & Cost */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                          <span>📅</span>
                          <span>{b.preferredDate}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono font-bold text-sm text-purple-950 dark:text-white">
                          <span>💰</span>
                          <span>₹{b.finalCost || b.estimatedCost}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="pt-4 mt-2">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="w-full py-2.5 rounded-xl border border-purple-300 dark:border-purple-500/40 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-950 dark:text-white text-xs font-bold tracking-wide transition-all uppercase"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* CATEGORY 2: 📱 DEVICE HISTORY (Section 3 & Section 19)    */}
      {/* ======================================================== */}
      {activeCategory === 'devices' && (
        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-[#110724] p-4 rounded-2xl border border-purple-200 dark:border-purple-500/30 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-purple-950 dark:text-white">Previous Device Checks & Analyses</h2>
              <p className="text-xs text-slate-500">Every device check you ran is saved here with simple next steps.</p>
            </div>
            <button
              onClick={onGoToAnalyze}
              className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-sm"
            >
              + Check New Device
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deviceHistory.map((d) => (
              <div
                key={d.id}
                className="bg-white dark:bg-[#110724] rounded-2xl border border-purple-100 dark:border-purple-500/20 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <h3 className="font-extrabold text-base text-purple-950 dark:text-white">
                          {d.brand} {d.model}
                        </h3>
                        <span className="text-[11px] text-slate-400">Checked on {d.date}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {d.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#0a0318] p-3 rounded-xl border border-purple-100 dark:border-purple-900/40 my-3 text-xs space-y-2">
                    <div>
                      <span className="font-bold text-purple-950 dark:text-white block mb-0.5">What we found:</span>
                      <p className="text-slate-600 dark:text-slate-300">{d.whatWeFound}</p>
                    </div>
                    <div>
                      <span className="font-bold text-purple-950 dark:text-white block mb-0.5">What you chose to do:</span>
                      <span className="inline-block px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-200 font-semibold text-[11px]">
                        {d.chosenPathway}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1">
                    <div><strong>Service:</strong> {d.serviceType}</div>
                    <div><strong>Estimated:</strong> {d.estimatedCost}</div>
                  </div>
                </div>

                <div className="pt-4 mt-2">
                  <button
                    onClick={() => setSelectedDevice(d)}
                    className="w-full py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-900 dark:text-purple-200 text-xs font-bold border border-purple-200 dark:border-purple-500/30"
                  >
                    View Device Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#120727] rounded-3xl border border-purple-200 dark:border-purple-500/30 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-700" />
                <h3 className="font-bold text-base text-purple-950 dark:text-white">
                  Booking Summary #{selectedBooking.bookingNumber}
                </h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30">
                <div className="font-bold text-purple-950 dark:text-white text-sm mb-1">
                  💻 {selectedBooking.deviceBrand} {selectedBooking.deviceModel}
                </div>
                <div><strong>Service:</strong> 🔧 {selectedBooking.requiredService}</div>
                <div><strong>Format:</strong> {selectedBooking.serviceType === 'home_service' ? '🏠 Home Service Visit' : '📍 Store Visit'}</div>
              </div>

              <div>
                <strong>Provider:</strong> 🏪 {selectedBooking.providerName}
              </div>
              <div>
                <strong>Date & Time:</strong> 📅 {selectedBooking.preferredDate} ({selectedBooking.preferredTime})
              </div>
              <div>
                <strong>Location:</strong> 📍 {selectedBooking.serviceAddress}
              </div>
              <div>
                <strong>Total Amount:</strong> <span className="font-bold text-purple-950 dark:text-white font-mono text-sm">₹{selectedBooking.finalCost || selectedBooking.estimatedCost}</span>
              </div>
              {selectedBooking.bookingNotes && (
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border text-slate-600 dark:text-slate-400">
                  <strong>Notes:</strong> {selectedBooking.bookingNotes}
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device Check Details Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#120727] rounded-3xl border border-purple-200 dark:border-purple-500/30 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedDevice.icon}</span>
                <h3 className="font-bold text-base text-purple-950 dark:text-white">
                  {selectedDevice.brand} {selectedDevice.model}
                </h3>
              </div>
              <button onClick={() => setSelectedDevice(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30">
                <span className="font-bold text-purple-950 dark:text-white block mb-1">What was found:</span>
                <p>{selectedDevice.whatWeFound}</p>
              </div>
              <div>
                <strong>Reported problem:</strong> "{selectedDevice.plainProblem}"
              </div>
              <div>
                <strong>Chosen action:</strong> {selectedDevice.chosenPathway}
              </div>
              <div>
                <strong>Estimated cost / value:</strong> {selectedDevice.estimatedCost}
              </div>
              <div>
                <strong>Checked on:</strong> 📅 {selectedDevice.date}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedDevice(null)}
                className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
