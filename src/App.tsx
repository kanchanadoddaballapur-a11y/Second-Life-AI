import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SplashPage } from './components/SplashPage';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { BookingsPage } from './components/BookingsPage';
import { HistoryPage } from './components/HistoryPage';
import { Screen1Input } from './components/Screen1Input';
import { Screen2Assessment } from './components/Screen2Assessment';
import { Screen4Providers } from './components/Screen4Providers';
import { Screen5Compare } from './components/Screen5Compare';
import { Screen6ActionPlan } from './components/Screen6ActionPlan';
import { ProfilePage } from './components/ProfilePage';
import { DossierModal } from './components/DossierModal';
import { AdvisorDrawer } from './components/AdvisorDrawer';
import { PRESET_DEVICES } from './data/presets';
import { VERIFIED_PROVIDERS } from './data/providers';
import { INITIAL_BOOKINGS, INITIAL_NOTIFICATIONS } from './data/bookingsData';
import { 
  AnalysisResult, 
  BookingItem, 
  BookingNotification, 
  DeviceInputData, 
  NearbyProvider, 
  UserPreferences, 
  UserProfile 
} from './types';
import { calculateCircularityTriage } from './lib/decisionEngine';

export default function App() {
  // Navigation View:
  // SPLASH -> SIGNUP -> LOGIN -> DASHBOARD / ANALYZE / MY_DEVICES / BOOKINGS / PROVIDERS / SAVED_PROVIDERS / HISTORY / PROFILE
  const [viewMode, setViewMode] = useState<
    'splash' | 'signup' | 'login' | 'dashboard' | 'analyze' | 'my_devices' | 'bookings' | 'providers' | 'saved_providers' | 'history' | 'profile'
  >('splash');
  
  // 6-Stage Wizard Step
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currency] = useState<'INR'>('INR'); // Strictly INR (₹)
  
  // UI Theme Options State
  const [currentTheme, setCurrentTheme] = useState<string>('moderate_lavender');
  const isDark = currentTheme === 'dark_purple';
  
  // User Profile & Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: 'usr-balaji-1',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98450 12345',
    city: 'Bengaluru',
    savedProviderIds: ['prov-lapzone-repair-2', 'prov-saahas-recycler']
  });

  // Saved / Bookmarked Provider IDs
  const [savedProviderIds, setSavedProviderIds] = useState<string[]>([
    'prov-lapzone-repair-2',
    'prov-saahas-recycler'
  ]);

  // Bookings & Notifications State
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState<BookingNotification[]>(INITIAL_NOTIFICATIONS);

  const handleToggleSaveProvider = (id: string) => {
    setSavedProviderIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const [formData, setFormData] = useState<DeviceInputData>({
    ...PRESET_DEVICES[0].data,
    currency: 'INR'
  });
  
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(() => {
    return calculateCircularityTriage({ ...PRESET_DEVICES[0].data, currency: 'INR' });
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);

  // User-Led Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>({
    selectedPathways: ['repair'],
    budgetPreset: '2500-5000',
    isCustomBudget: false,
    customBudgetMin: 2500,
    customBudgetMax: 5000,
    distanceLimit: 5,
    priority: 'lowest_cost',
    providerTypes: [],
    location: {
      city: 'Bengaluru',
      areaName: 'Koramangala'
    }
  });

  const [selectedProvider, setSelectedProvider] = useState<NearbyProvider>(VERIFIED_PROVIDERS[0]);

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          currency: 'INR'
        })
      });

      if (response.ok) {
        const result: AnalysisResult = await response.json();
        setAnalysis(result);
        setCurrentStep(2);
      } else {
        const fallback = calculateCircularityTriage({ ...formData, currency: 'INR' });
        setAnalysis(fallback);
        setCurrentStep(2);
      }
    } catch (e) {
      console.warn('Backend call failed, using client decision engine:', e);
      const fallback = calculateCircularityTriage({ ...formData, currency: 'INR' });
      setAnalysis(fallback);
      setCurrentStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnalysis(null);
  };

  const handleStartDeviceIntake = (presetId?: string) => {
    if (presetId) {
      const preset = PRESET_DEVICES.find(p => p.id === presetId);
      if (preset) {
        setFormData({ ...preset.data, currency: 'INR' });
        setAnalysis(calculateCircularityTriage({ ...preset.data, currency: 'INR' }));
      }
    }
    setCurrentStep(1);
    setViewMode('analyze');
  };

  // =========================================================
  // VIEW 1: PAGE 1 — LOGO / SPLASH PAGE (Light UI)
  // =========================================================
  if (viewMode === 'splash') {
    return (
      <>
        <SplashPage
          onGetStarted={() => setViewMode('signup')}
          onGoToLogin={() => setViewMode('login')}
          onOpenDossier={() => setIsDossierOpen(true)}
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
        />
        <DossierModal
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
        />
      </>
    );
  }

  // =========================================================
  // VIEW 2: PAGE 2 — SIGN UP (Dark Purple Glassmorphism)
  // =========================================================
  if (viewMode === 'signup') {
    return (
      <>
        <AuthPage
          initialMode="signup"
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            setViewMode('login');
          }}
          onBackToSplash={() => setViewMode('splash')}
        />
        <DossierModal
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
        />
      </>
    );
  }

  // =========================================================
  // VIEW 3: PAGE 3 — LOGIN (Dark Purple Glassmorphism)
  // =========================================================
  if (viewMode === 'login') {
    return (
      <>
        <AuthPage
          initialMode="login"
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            setViewMode('dashboard');
          }}
          onBackToSplash={() => setViewMode('splash')}
        />
        <DossierModal
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
        />
      </>
    );
  }

  // =========================================================
  // AUTHENTICATED APPLICATION WITH SIMPLIFIED NAVIGATION (Section 1)
  // =========================================================
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-b from-[#13072b] via-[#090317] to-[#04010a] text-slate-100 selection:bg-purple-500/25 selection:text-purple-200'
        : 'bg-gradient-to-b from-[#f8f4fe] via-[#f1e8fb] to-[#eae0f8] text-slate-800 selection:bg-purple-500/25 selection:text-purple-900'
    }`}>
      
      {/* Simplified Main Navigation Bar (Section 1) */}
      <Navbar
        currentView={viewMode}
        onNavigate={(targetView) => {
          if (targetView === 'analyze') {
            setCurrentStep(1);
          }
          setViewMode(targetView);
        }}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        hasAnalyzed={Boolean(analysis)}
        user={currentUser}
        savedProviderCount={savedProviderIds.length}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        onGoToDashboard={() => setViewMode('dashboard')}
        onGoToBookings={() => setViewMode('bookings')}
        onGoToHistory={() => setViewMode('history')}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onReset={handleReset}
        onLogout={() => {
          setCurrentUser(null);
          setViewMode('splash');
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1 pb-16">
        
        {/* 1. 🔍 DASHBOARD (Analyze Device is the Main Dashboard) */}
        {(viewMode === 'dashboard' || viewMode === 'analyze') && (
          <div className="py-4">
            {currentStep === 1 && (
              <Screen1Input
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleRunAnalysis}
                isLoading={isLoading}
                currency={currency}
              />
            )}

            {currentStep === 2 && analysis && (
              <Screen2Assessment
                analysis={analysis}
                onProceed={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(1)}
                onSelectPathwayAndGo={(pathway, serviceFormat) => {
                  const pathwayMap: Record<string, any> = {
                    'fix': 'repair',
                    'refurbish': 'refurbish',
                    'sell': 'resell',
                    'donate': 'donate',
                    'recycle': 'recycling'
                  };
                  const mapped = pathwayMap[pathway] || 'repair';
                  setPreferences(prev => ({
                    ...prev,
                    selectedPathways: [mapped]
                  }));

                  if (pathway === 'fix' && serviceFormat === 'home') {
                    setViewMode('bookings');
                  } else {
                    // Go straight to Providers, completely removing the duplicate second pathway page
                    setCurrentStep(4);
                  }
                }}
              />
            )}

            {currentStep === 4 && analysis && (
              <Screen4Providers
                analysis={analysis}
                preferences={preferences}
                setPreferences={setPreferences}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
                savedProviderIds={savedProviderIds}
                onToggleSaveProvider={handleToggleSaveProvider}
                onProceed={() => setCurrentStep(6)}
                onBack={() => setCurrentStep(2)}
                onGoToCompare={() => setCurrentStep(5)}
              />
            )}

            {currentStep === 5 && analysis && (
              <Screen5Compare
                initialAnalysis={analysis}
                formData={formData}
                preferences={preferences}
                setPreferences={setPreferences}
                onProceed={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(4)}
              />
            )}

            {currentStep === 6 && analysis && (
              <Screen6ActionPlan
                analysis={analysis}
                formData={formData}
                preferences={preferences}
                selectedProvider={selectedProvider}
                isSaved={savedProviderIds.includes(selectedProvider.id)}
                onToggleSaveProvider={() => handleToggleSaveProvider(selectedProvider.id)}
                onGoToBookings={() => setViewMode('bookings')}
                onBack={() => setCurrentStep(4)}
                onReset={handleReset}
                onOpenDossier={() => setIsDossierOpen(true)}
              />
            )}
          </div>
        )}

        {/* 3. 💻 MY DEVICES */}
        {viewMode === 'my_devices' && (
          <Dashboard
            initialTab="my_devices"
            user={currentUser || {
              id: 'usr-balaji-1',
              fullName: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              city: 'Bengaluru',
              savedProviderIds: []
            }}
            savedProviderIds={savedProviderIds}
            bookings={bookings}
            notifications={notifications}
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
            onToggleSaveProvider={handleToggleSaveProvider}
            onStartDeviceIntake={handleStartDeviceIntake}
            onGoToBookings={() => setViewMode('bookings')}
            onGoToProviders={() => setViewMode('providers')}
            onGoToHistory={() => setViewMode('history')}
            onOpenDossier={() => setIsDossierOpen(true)}
            onLogout={() => {
              setCurrentUser(null);
              setViewMode('splash');
            }}
          />
        )}

        {/* 4. 📅 BOOKINGS (Section 2: ONLY Upcoming & Pending) */}
        {viewMode === 'bookings' && (
          <BookingsPage
            user={currentUser || {
              id: 'usr-balaji-1',
              fullName: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              city: 'Bengaluru',
              savedProviderIds: []
            }}
            bookings={bookings}
            setBookings={setBookings}
            notifications={notifications}
            setNotifications={setNotifications}
            activeDevice={formData}
            onGoToAnalyze={() => {
              setCurrentStep(1);
              setViewMode('analyze');
            }}
            onGoToDashboard={() => setViewMode('dashboard')}
            onGoToHistory={() => setViewMode('history')}
          />
        )}

        {/* 5. 📍 NEARBY PROVIDERS (Direct 5+ Shop Results) */}
        {viewMode === 'providers' && analysis && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <Screen4Providers
              analysis={analysis}
              preferences={preferences}
              setPreferences={setPreferences}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              savedProviderIds={savedProviderIds}
              onToggleSaveProvider={handleToggleSaveProvider}
              onProceed={() => setViewMode('bookings')}
              onBack={() => setViewMode('dashboard')}
              onGoToCompare={() => {
                setCurrentStep(5);
                setViewMode('analyze');
              }}
            />
          </div>
        )}

        {/* 6. ❤️ SAVED PROVIDERS */}
        {viewMode === 'saved_providers' && (
          <Dashboard
            initialTab="saved_providers"
            user={currentUser || {
              id: 'usr-balaji-1',
              fullName: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              city: 'Bengaluru',
              savedProviderIds: []
            }}
            savedProviderIds={savedProviderIds}
            bookings={bookings}
            notifications={notifications}
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
            onToggleSaveProvider={handleToggleSaveProvider}
            onStartDeviceIntake={handleStartDeviceIntake}
            onGoToBookings={() => setViewMode('bookings')}
            onGoToProviders={() => setViewMode('providers')}
            onGoToHistory={() => setViewMode('history')}
            onOpenDossier={() => setIsDossierOpen(true)}
            onLogout={() => {
              setCurrentUser(null);
              setViewMode('splash');
            }}
          />
        )}

        {/* 7. 📊 HISTORY (Section 3 & 4: Device History & Booking History) */}
        {viewMode === 'history' && (
          <HistoryPage
            user={currentUser || {
              id: 'usr-balaji-1',
              fullName: 'Priya Sharma',
              email: 'priya.sharma@example.com',
              city: 'Bengaluru',
              savedProviderIds: []
            }}
            bookings={bookings}
            currentTheme={currentTheme}
            onGoToAnalyze={() => {
              setCurrentStep(1);
              setViewMode('analyze');
            }}
            onGoToBookings={() => setViewMode('bookings')}
            onGoToDashboard={() => setViewMode('dashboard')}
          />
        )}

        {/* 8. 👤 PROFILE (Only Photo, Name, Address, Mobile Num, Gmail) */}
        {viewMode === 'profile' && (
          <ProfilePage
            user={currentUser || {
              id: 'usr-balaji-1',
              fullName: 'Priya Sharma',
              email: 'priya.sharma@gmail.com',
              phone: '+91 98450 12345',
              address: '42, 4th Cross, 7th Main, Koramangala 4th Block, Bengaluru 560034',
              city: 'Bengaluru',
              savedProviderIds: []
            }}
            onUpdateUser={(updated) => setCurrentUser(updated)}
            onBackToDashboard={() => {
              setCurrentStep(1);
              setViewMode('dashboard');
            }}
            currentTheme={currentTheme}
            isDark={isDark}
          />
        )}

      </main>

      {/* Shared Modals */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
      <AdvisorDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        formData={formData}
      />
    </div>
  );
}
