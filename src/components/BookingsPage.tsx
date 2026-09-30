import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Plus, 
  ArrowRight, 
  Home as HomeIcon, 
  Truck, 
  Store, 
  RotateCcw, 
  ChevronDown, 
  Star,
  User,
  Mail,
  Laptop,
  Check,
  Sparkles,
  CalendarDays,
  FileText
} from 'lucide-react';
import { BookingItem, BookingNotification, BookingServiceType, DeviceInputData, UserProfile } from '../types';
import { ONLINE_BOOKING_PROVIDERS, OnlineBookingProvider } from '../data/bookingsData';

interface BookingsPageProps {
  user: UserProfile;
  bookings: BookingItem[];
  setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
  notifications: BookingNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<BookingNotification[]>>;
  activeDevice?: DeviceInputData;
  onGoToAnalyze: () => void;
  onGoToDashboard: () => void;
  onGoToHistory?: () => void;
}

export const BookingsPage: React.FC<BookingsPageProps> = ({
  user,
  bookings,
  setBookings,
  notifications,
  setNotifications,
  activeDevice,
  onGoToAnalyze,
  onGoToDashboard,
  onGoToHistory
}) => {
  // STRICT REQUIREMENT 2: ONLY two simple tabs: 'upcoming' and 'pending'
  // Completed and cancelled belong in History
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending'>('upcoming');

  // Modals & Popups
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<BookingItem | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [stepInModal, setStepInModal] = useState<'address' | 'datetime' | 'provider' | 'summary' | 'confirmed'>('address');
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<OnlineBookingProvider>(ONLINE_BOOKING_PROVIDERS[0]);
  const [externalLeavingNotice, setExternalLeavingNotice] = useState<OnlineBookingProvider | null>(null);

  // Progressive Booking Form State
  const [bookForm, setBookForm] = useState({
    name: user.fullName || 'Priya Sharma',
    phone: user.phone || '+91 98450 12345',
    email: user.email || 'priya.sharma@example.com',
    address: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103',
    deviceType: activeDevice ? activeDevice.deviceType : 'Laptop',
    deviceBrand: activeDevice ? activeDevice.brand : 'Dell',
    deviceModel: activeDevice ? activeDevice.model : 'Inspiron 15 (5-Year Model)',
    requiredService: 'Laptop Battery Repair & Diagnostics',
    problemDescription: activeDevice?.userReportedFaults || 'Battery stops charging; turns off when unplugged.',
    preferredDate: 'Tomorrow, Oct 19, 2026',
    preferredTime: '10:00 AM – 12:00 PM',
    serviceType: 'home_service' as BookingServiceType,
    estimatedCost: 2800
  });

  // Filter Bookings: ONLY Upcoming and Pending
  const upcomingBookings = bookings.filter(b => b.status === 'scheduled' || b.status === 'in_progress');
  const pendingBookings = bookings.filter(b => b.status === 'pending');

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pendingBookings;

  // Handle Cancel Booking -> moves to History
  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Cancel this booking? It will be moved to your History.')) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      setSelectedBookingForDetails(null);
    }
  };

  // Complete Booking flow
  const handleConfirmNewBooking = () => {
    const newBooking: BookingItem = {
      id: `bk-${Date.now()}`,
      bookingNumber: `SL-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: bookForm.name,
      customerPhone: bookForm.phone,
      customerEmail: bookForm.email,
      serviceAddress: bookForm.address,
      deviceType: bookForm.deviceType,
      deviceBrand: bookForm.deviceBrand,
      deviceModel: bookForm.deviceModel,
      requiredService: bookForm.requiredService,
      problemDescription: bookForm.problemDescription,
      preferredDate: bookForm.preferredDate,
      preferredTime: bookForm.preferredTime,
      estimatedCost: bookForm.estimatedCost,
      status: 'scheduled',
      serviceType: bookForm.serviceType,
      providerId: selectedProviderForBooking.id,
      providerName: selectedProviderForBooking.name,
      providerPhone: selectedProviderForBooking.phone,
      providerWebsite: selectedProviderForBooking.officialBookingWebsite,
      providerRating: selectedProviderForBooking.rating,
      bookingNotes: 'Doorstep technician assigned. Please keep device ready.',
      createdAt: new Date().toISOString(),
      isHomeService: selectedProviderForBooking.homeServiceAvailable,
      externalBookingUrl: selectedProviderForBooking.officialBookingWebsite
    };

    setBookings(prev => [newBooking, ...prev]);
    setStepInModal('confirmed');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      
      {/* Friendly Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 text-xs font-semibold text-purple-900 dark:text-purple-300 mb-2">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <span>Active & Upcoming Services</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-950 dark:text-white tracking-tight">
            📅 Bookings
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Track what is happening next or book a new technician visit to your home.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setStepInModal('address');
              setIsBookModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Book a Service</span>
          </button>
        </div>
      </div>

      {/* Main Tabs (Section 2: ONLY Upcoming and Pending) */}
      <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-900/50 pb-2 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-white dark:bg-[#110724] text-purple-950 dark:text-purple-200 hover:bg-purple-50 border border-purple-200 dark:border-purple-500/30'
            }`}
          >
            <span>📅 Upcoming</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
              activeTab === 'upcoming' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'
            }`}>
              {upcomingBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-white dark:bg-[#110724] text-purple-950 dark:text-purple-200 hover:bg-purple-50 border border-purple-200 dark:border-purple-500/30'
            }`}
          >
            <span>🕐 Pending</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
              activeTab === 'pending' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-900'
            }`}>
              {pendingBookings.length}
            </span>
          </button>
        </div>

        {/* Clear link to History for completed / cancelled */}
        {onGoToHistory && (
          <button
            onClick={onGoToHistory}
            className="text-xs font-bold text-purple-700 dark:text-purple-300 hover:underline flex items-center gap-1.5 hidden sm:flex"
          >
            <span>Looking for past or cancelled bookings? Go to 📊 History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Booking Cards (Section 16: Upcoming, Section 17: Pending) */}
      {displayedBookings.length === 0 ? (
        <div className="text-center py-14 bg-white dark:bg-[#110724] rounded-3xl border border-purple-200 dark:border-purple-500/20 p-8 shadow-sm">
          <Calendar className="w-12 h-12 text-purple-300 mx-auto mb-3" />
          <h3 className="font-extrabold text-lg text-purple-950 dark:text-white mb-1">
            {activeTab === 'upcoming' ? 'No Upcoming Services' : 'No Bookings Waiting for Confirmation'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
            {activeTab === 'upcoming'
              ? 'You do not have any active appointments scheduled. Need help with a device?'
              : 'All your bookings have either been scheduled or completed.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setStepInModal('address');
                setIsBookModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md"
            >
              + Book a Home Service
            </button>
            {onGoToHistory && (
              <button
                onClick={onGoToHistory}
                className="px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs"
              >
                📊 View History
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedBookings.map((b) => {
            const isScheduled = b.status === 'scheduled';

            return (
              <div
                key={b.id}
                className="bg-white dark:bg-[#110724] rounded-3xl border-2 border-purple-200 dark:border-purple-500/30 p-5 sm:p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Title matching User Spec Section 16 & 17 */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-extrabold text-xs uppercase font-mono text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      {isScheduled ? '📅 Your Upcoming Service' : '🕐 Booking Waiting for Confirmation'}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isScheduled 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : 'bg-purple-100 text-purple-900 border border-purple-300'
                    }`}>
                      {isScheduled ? '🟡 Scheduled' : '⏳ Pending'}
                    </span>
                  </div>

                  {/* Device and Problem details */}
                  <div className="space-y-2 mb-4">
                    <div className="font-black text-lg text-purple-950 dark:text-white flex items-center gap-2">
                      <span>💻</span>
                      <span>{b.deviceBrand} {b.deviceModel}</span>
                    </div>

                    <div className="text-xs text-purple-900 dark:text-purple-300 font-bold flex items-center gap-2">
                      <span>🔧</span>
                      <span>{b.requiredService}</span>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <span>{b.serviceType === 'home_service' ? '🏠 Home Service' : '📍 Store Visit'}</span>
                    </div>
                  </div>

                  <hr className="border-purple-100 dark:border-purple-900/50 my-3" />

                  {/* Date, Time, Cost */}
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <strong className="text-purple-950 dark:text-white">{b.preferredDate}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{b.preferredTime}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono font-bold text-sm text-purple-950 dark:text-white pt-1">
                      <span>💰</span>
                      <span>₹{b.estimatedCost}</span>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="pt-5 mt-3">
                  <button
                    onClick={() => setSelectedBookingForDetails(b)}
                    className="w-full py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 border border-purple-200 dark:border-purple-500/40 text-purple-950 dark:text-white font-bold text-xs tracking-wider uppercase transition-all"
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* SIMPLE PROGRESSIVE BOOKING WIZARD MODAL (Sections 13-15) */}
      {/* ======================================================== */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#120727] rounded-3xl border border-purple-200 dark:border-purple-500/30 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-purple-950 dark:text-white">
                  Book a Home Service 🏠
                </h3>
                <p className="text-xs text-slate-500">
                  Step-by-step assistance for your device.
                </p>
              </div>
              <button onClick={() => setIsBookModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">
                ✕
              </button>
            </div>

            {/* STEP 1: "Where should we come?" (Section 14) */}
            {stepInModal === 'address' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-950 dark:text-white mb-1">
                    Where should we come? 📍
                  </label>
                  <p className="text-xs text-slate-500 mb-2">
                    Enter your home or office address in Bengaluru:
                  </p>
                  <textarea
                    rows={3}
                    value={bookForm.address}
                    onChange={(e) => setBookForm({ ...bookForm, address: e.target.value })}
                    className="w-full p-3 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-slate-50 dark:bg-[#0a0318] text-xs text-purple-950 dark:text-white focus:outline-none focus:border-purple-600"
                    placeholder="Flat / House No, Street, Area, Bengaluru"
                  />
                </div>

                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-xs">
                  <div className="font-bold text-purple-950 dark:text-white mb-1">Device Details:</div>
                  <div>💻 {bookForm.deviceBrand} {bookForm.deviceModel} ({bookForm.requiredService})</div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsBookModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStepInModal('datetime')}
                    className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Next: Choose Time</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: "When would you like help?" (Section 14) */}
            {stepInModal === 'datetime' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-950 dark:text-white mb-1">
                    When would you like help? 📅
                  </label>
                  <p className="text-xs text-slate-500 mb-2">
                    Pick a convenient date and arrival window:
                  </p>
                  
                  {/* Quick Dates */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {['Tomorrow, Oct 19', 'Day after, Oct 20', 'This Weekend', 'Pick Custom'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setBookForm({ ...bookForm, preferredDate: d })}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                          bookForm.preferredDate === d
                            ? 'bg-purple-100 border-purple-600 text-purple-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        📅 {d}
                      </button>
                    ))}
                  </div>

                  {/* Arrival Windows */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-600">Choose Arrival Time:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['10:00 AM – 12:00 PM', '01:00 PM – 03:00 PM', '03:00 PM – 05:00 PM', '05:00 PM – 07:00 PM'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBookForm({ ...bookForm, preferredTime: t })}
                          className={`p-2 rounded-xl border text-xs font-medium text-left ${
                            bookForm.preferredTime === t
                              ? 'bg-purple-100 border-purple-600 text-purple-950 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          🕐 {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStepInModal('address')}
                    className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStepInModal('provider')}
                    className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Next: Choose Provider</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Simple Provider Selection (Section 13) */}
            {stepInModal === 'provider' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-purple-950 dark:text-white mb-1">
                    Choose Your Service Provider 🏪
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Available verified providers in Bengaluru:
                  </p>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {ONLINE_BOOKING_PROVIDERS.map((prov) => {
                      const isSelected = selectedProviderForBooking.id === prov.id;
                      return (
                        <div
                          key={prov.id}
                          onClick={() => setSelectedProviderForBooking(prov)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-600 ring-2 ring-purple-600/20'
                              : 'bg-white dark:bg-[#0a0318] border-purple-100 dark:border-purple-900/50 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <strong className="text-xs font-extrabold text-purple-950 dark:text-white">
                              🏪 {prov.name}
                            </strong>
                            <span className="text-xs font-bold text-purple-900 dark:text-purple-300 font-mono">
                              From ₹{prov.startingPriceInr}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3">
                            <span>🏠 Home service available</span>
                            <span>⭐ {prov.rating} rating</span>
                            <span>📍 Bengaluru area</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStepInModal('datetime')}
                    className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStepInModal('summary')}
                    className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Check Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Simple Booking Summary (Section 15) */}
            {stepInModal === 'summary' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-500/30 space-y-2 text-xs">
                  <h4 className="font-extrabold text-sm text-purple-950 dark:text-white mb-2">
                    Check Your Booking 📋
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                    <div><strong>Device:</strong> 💻 {bookForm.deviceBrand} {bookForm.deviceModel}</div>
                    <div><strong>Service:</strong> 🔧 {bookForm.requiredService}</div>
                    <div><strong>Type:</strong> 🏠 Home Service</div>
                    <div><strong>Provider:</strong> 🏪 {selectedProviderForBooking.name}</div>
                    <div><strong>Date:</strong> 📅 {bookForm.preferredDate}</div>
                    <div><strong>Time:</strong> 🕐 {bookForm.preferredTime}</div>
                  </div>

                  <div className="pt-2 border-t border-purple-200 dark:border-purple-800">
                    <strong>Address:</strong> 📍 {bookForm.address}
                  </div>

                  <div className="pt-2 text-base font-extrabold text-purple-950 dark:text-white flex items-center justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-mono">₹{selectedProviderForBooking.startingPriceInr}</span>
                  </div>
                </div>

                {/* Transparent Notice if External (Section 15) */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-600 dark:text-slate-400 text-xs">
                  <p>
                    Second Life AI connects you with certified service partners. You can confirm directly or continue to the partner's page.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
                  <button
                    onClick={() => setStepInModal('provider')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl border text-xs font-bold text-slate-600"
                  >
                    Back
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setExternalLeavingNotice(selectedProviderForBooking);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-purple-300 text-purple-900 font-bold text-xs"
                    >
                      🌐 Continue to Provider
                    </button>

                    <button
                      onClick={handleConfirmNewBooking}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md"
                    >
                      ✅ CONFIRM
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Confirmed Success Screen */}
            {stepInModal === 'confirmed' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-black text-xl text-purple-950 dark:text-white">
                  Booking Confirmed! 🎉
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your home service request has been scheduled with <strong>{selectedProviderForBooking.name}</strong>. You can view it under <strong>Upcoming Bookings</strong>.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsBookModalOpen(false);
                      setActiveTab('upcoming');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs"
                  >
                    View Upcoming Bookings
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#120727] rounded-3xl border border-purple-200 dark:border-purple-500/30 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-700" />
                <h3 className="font-bold text-base text-purple-950 dark:text-white">
                  Booking #{selectedBookingForDetails.bookingNumber}
                </h3>
              </div>
              <button onClick={() => setSelectedBookingForDetails(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30">
                <div className="font-bold text-purple-950 dark:text-white text-sm mb-1">
                  💻 {selectedBookingForDetails.deviceBrand} {selectedBookingForDetails.deviceModel}
                </div>
                <div><strong>Service:</strong> 🔧 {selectedBookingForDetails.requiredService}</div>
                <div><strong>Status:</strong> {selectedBookingForDetails.status === 'scheduled' ? '🟡 Scheduled' : '⏳ Pending Confirmation'}</div>
              </div>

              <div><strong>Provider:</strong> 🏪 {selectedBookingForDetails.providerName}</div>
              <div><strong>Date & Time:</strong> 📅 {selectedBookingForDetails.preferredDate} ({selectedBookingForDetails.preferredTime})</div>
              <div><strong>Address:</strong> 📍 {selectedBookingForDetails.serviceAddress}</div>
              <div><strong>Estimated Cost:</strong> <span className="font-bold text-purple-950 dark:text-white">₹{selectedBookingForDetails.estimatedCost}</span></div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between gap-2">
              <button
                onClick={() => handleCancelBooking(selectedBookingForDetails.id)}
                className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold"
              >
                Cancel Booking
              </button>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* External Leaving Notice Modal */}
      {externalLeavingNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#120727] rounded-3xl border border-purple-200 dark:border-purple-500/30 p-6 max-w-sm w-full text-center space-y-4">
            <Globe className="w-10 h-10 text-purple-700 mx-auto" />
            <h3 className="font-bold text-base text-purple-950 dark:text-white">
              Continue to {externalLeavingNotice.name}
            </h3>
            <p className="text-xs text-slate-600">
              "You will now continue on the provider's website to complete your booking."
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setExternalLeavingNotice(null)}
                className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600"
              >
                Stay Here
              </button>
              <a
                href={externalLeavingNotice.officialBookingWebsite}
                target="_blank"
                rel="noreferrer"
                onClick={() => setExternalLeavingNotice(null)}
                className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs inline-flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
