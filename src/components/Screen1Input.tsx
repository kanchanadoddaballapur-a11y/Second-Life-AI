import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  Upload, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
  Camera,
  Smartphone,
  Tablet,
  Tv,
  Gamepad2,
  Watch,
  Plug,
  Monitor,
  Mic,
  MicOff,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Edit3
} from 'lucide-react';
import { DeviceInputData } from '../types';
import { PRESET_DEVICES } from '../data/presets';

interface Screen1InputProps {
  formData: DeviceInputData;
  setFormData: React.Dispatch<React.SetStateAction<DeviceInputData>>;
  onSubmit: () => void;
  isLoading: boolean;
  currency: 'INR';
}

export const Screen1Input: React.FC<Screen1InputProps> = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  currency = 'INR'
}) => {
  // Questioning pattern: 1 = Device, 2 = Brand/Model, 3 = Main Issue, 4 = Details/Voice, 5 = Photo & Review
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isListening, setIsListening] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('dell-laptop-official');

  // Loading animation step tracker
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const loadingSteps = [
    '🤖 Understanding what is happening with your device...',
    '🔍 Checking the screen, battery, and components...',
    '💡 Figuring out whether it can be fixed or reused...',
    '💰 Estimating repair & resale value in ₹ INR...',
    '📍 Finding verified technicians near you in Bengaluru...'
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % loadingSteps.length);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Voice Speech-to-Text Support
  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setFormData(prev => ({
              ...prev,
              userReportedFaults: prev.userReportedFaults 
                ? `${prev.userReportedFaults}. ${transcript}` 
                : transcript
            }));
          }
        };

        recognition.start();
      } catch (err) {
        fallbackVoiceTyping();
      }
    } else {
      fallbackVoiceTyping();
    }
  };

  const fallbackVoiceTyping = () => {
    setIsListening(true);
    const spoken = "My laptop battery runs out in 10 minutes and it turns off when unplugged.";
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        userReportedFaults: prev.userReportedFaults ? `${prev.userReportedFaults}. ${spoken}` : spoken
      }));
      setIsListening(false);
    }, 1200);
  };

  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = PRESET_DEVICES.find(p => p.id === presetId);
    if (found) {
      setFormData({
        ...found.data,
        currency: 'INR'
      });
      // Jump to review step for instant convenience
      setCurrentStep(5);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageBase64: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Step 1: Device choices (exactly as present)
  const deviceChoices = [
    { label: 'Laptop', emoji: '💻', type: 'Laptop' },
    { label: 'Phone', emoji: '📱', type: 'Smartphone' },
    { label: 'Desktop', emoji: '🖥️', type: 'Desktop' },
    { label: 'TV', emoji: '📺', type: 'TV' },
    { label: 'Gaming Device', emoji: '🎮', type: 'Gaming Device' },
    { label: 'Other', emoji: '⌨️', type: 'Other' },
  ];

  // Step 2: Adaptive brands based on selected device
  const getBrandsForDevice = (type: string) => {
    const t = (type || '').toLowerCase();
    if (t.includes('laptop')) {
      return ['Dell', 'HP', 'Lenovo', 'Apple (MacBook)', 'ASUS', 'Acer', 'MSI'];
    }
    if (t.includes('phone') || t.includes('smart')) {
      return ['Samsung', 'Apple (iPhone)', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo', 'Realme'];
    }
    if (t.includes('desktop')) {
      return ['Dell', 'HP', 'Custom Assembled PC', 'Apple (iMac/Mac Mini)', 'Lenovo', 'ASUS'];
    }
    if (t.includes('tv')) {
      return ['Samsung', 'LG', 'Sony', 'Mi / Xiaomi', 'OnePlus', 'TCL', 'Vu'];
    }
    if (t.includes('gaming')) {
      return ['Sony PlayStation', 'Microsoft Xbox', 'Nintendo Switch', 'Custom Gaming PC', 'Steam Deck'];
    }
    return ['Apple iPad / Tablet', 'Smartwatch', 'Audio Speaker / Soundbar', 'Printer', 'Smart Home'];
  };

  // Step 3: Adaptive issues based on selected device
  const getIssuesForDevice = (type: string) => {
    const t = (type || '').toLowerCase();
    if (t.includes('laptop')) {
      return [
        { label: 'Battery problem', emoji: '🔋', fault: 'Battery does not hold charge; drains rapidly', detail: 'Drains in minutes or won\'t charge' },
        { label: 'Screen problem', emoji: '🖥️', fault: 'Screen cracked or displaying lines/blanks', detail: 'Cracked, flickering, or black screen' },
        { label: 'Very slow', emoji: '🐌', fault: 'Extremely slow performance and freezing', detail: 'Takes minutes to boot, freezes often' },
        { label: 'Not charging / No power', emoji: '🔌', fault: 'Device does not charge when plugged into power', detail: 'Charging pin loose or won\'t turn on' },
        { label: 'Water damage', emoji: '💧', fault: 'Liquid spill or water damage', detail: 'Coffee, water, or tea spilled' },
        { label: 'Overheating / Loud fan', emoji: '🔥', fault: 'Device gets extremely hot and fan spins loudly', detail: 'Heats up quickly, loud whining sound' },
        { label: 'Keyboard / Trackpad', emoji: '⌨️', fault: 'Keys not responding or trackpad erratic', detail: 'Sticky keys or jumping cursor' },
        { label: 'Something else', emoji: '❓', fault: 'General hardware or operating issue', detail: 'Other technical issue or checkup' }
      ];
    }
    if (t.includes('phone') || t.includes('smart')) {
      return [
        { label: 'Screen cracked', emoji: '🖥️', fault: 'Screen glass cracked or touch unresponsive', detail: 'Cracked display glass or dead touch zones' },
        { label: 'Battery draining fast', emoji: '🔋', fault: 'Battery drains rapidly within a few hours', detail: 'Needs multiple charges per day, gets warm' },
        { label: 'Charging port loose', emoji: '🔌', fault: 'Cable is loose or phone will not charge', detail: 'Cable falls out or won\'t connect' },
        { label: 'Dropped in water', emoji: '💧', fault: 'Liquid contact or dropped in water', detail: 'Dropped in water, sink, or rain' },
        { label: 'Camera / Speaker fault', emoji: '📷', fault: 'Camera blurry or speaker muffled/crackling', detail: 'Camera black screen or crackling audio' },
        { label: 'Won\'t turn on / Stuck', emoji: '⚡', fault: 'Phone is stuck on logo or completely black', detail: 'Bootloop, black screen, or power fault' },
        { label: 'Something else', emoji: '❓', fault: 'General phone issue', detail: 'Other phone issue or checkup' }
      ];
    }
    if (t.includes('desktop')) {
      return [
        { label: 'No power / Won\'t turn on', emoji: '⚡', fault: 'Desktop does not power on at all', detail: 'No lights, no fan movement' },
        { label: 'No display on monitor', emoji: '🖥️', fault: 'PC turns on but no signal to monitor', detail: 'Fans spin but screen stays black' },
        { label: 'Extremely slow / Freezing', emoji: '🐌', fault: 'Frequent crashes, blue screen, or freezing', detail: 'Windows takes forever, blue screen errors' },
        { label: 'Storage / Hard drive issue', emoji: '💾', fault: 'Hard drive clicking or drive not detected', detail: 'Disk 100% or boot device not found' },
        { label: 'Overheating / Loud noise', emoji: '🔥', fault: 'Loud fan noise, shuts down during load', detail: 'CPU cooler loud, sudden shut downs' },
        { label: 'Something else', emoji: '❓', fault: 'Other desktop issue', detail: 'Hardware or component failure' }
      ];
    }
    if (t.includes('tv')) {
      return [
        { label: 'Blank screen with audio', emoji: '📺', fault: 'Screen is black but sound is playing', detail: 'Sound works but screen is dark' },
        { label: 'Lines or patches on display', emoji: '🌈', fault: 'Horizontal/vertical lines or dark patches', detail: 'Colored lines or dark areas on picture' },
        { label: 'Won\'t turn on / Blinking light', emoji: '⚡', fault: 'TV will not turn on from remote or button', detail: 'Red standby light blinks, no power' },
        { label: 'No sound / Muffled audio', emoji: '🔊', fault: 'Speakers buzzing or no audio output', detail: 'Muffled sound, crackling, or silence' },
        { label: 'Smart TV apps / WiFi issue', emoji: '📡', fault: 'WiFi disconnected or HDMI ports unresponsive', detail: 'Apps crashing or HDMI signal dropped' },
        { label: 'Something else', emoji: '❓', fault: 'Other TV issue', detail: 'Display, board, or audio problem' }
      ];
    }
    if (t.includes('gaming')) {
      return [
        { label: 'Overheating / Auto shut down', emoji: '🔥', fault: 'Console overheats and shuts off after 15 mins', detail: 'Loud fan, turns off mid-game' },
        { label: 'HDMI port / No video output', emoji: '📺', fault: 'Console powers on but black screen on TV', detail: 'Loose port or no video signal' },
        { label: 'Disc drive not reading', emoji: '💿', fault: 'Discs not inserting or reading properly', detail: 'Drive clicking or disc read error' },
        { label: 'Controller drift / Disconnect', emoji: '🎮', fault: 'Controller thumbsticks drift or desync', detail: 'Character moves by itself' },
        { label: 'System error / Won\'t boot', emoji: '⚡', fault: 'Error code on startup or blinking lights', detail: 'Storage corruption or power supply' },
        { label: 'Something else', emoji: '❓', fault: 'Other gaming console issue', detail: 'Console or controller issue' }
      ];
    }
    return [
      { label: 'Won\'t turn on', emoji: '⚡', fault: 'Device completely unresponsive to power', detail: 'No power or reaction to button' },
      { label: 'Battery depleted', emoji: '🔋', fault: 'Battery does not hold charge', detail: 'Turns off immediately after unplugging' },
      { label: 'Sound or screen issue', emoji: '🔊', fault: 'Display or audio malfunction', detail: 'Cracked, noisy, or distorted output' },
      { label: 'Physical damage', emoji: '🔨', fault: 'Casing cracked or buttons broken', detail: 'Dropped or damaged casing' },
      { label: 'Something else', emoji: '❓', fault: 'Other issue', detail: 'General electronics fault' }
    ];
  };

  // Step 4: Contextual everyday phrases based on the specific issue selected
  const getQuickPhrasesForIssue = (deviceType: string, fault: string) => {
    const f = (fault || '').toLowerCase();
    if (f.includes('battery')) {
      return [
        'Battery dies in under 15 minutes unplugged.',
        'Turns off immediately when charger is removed.',
        'Battery percentage drops from 80% to 0% suddenly.',
        'Battery looks swollen or trackpad is raised.'
      ];
    }
    if (f.includes('screen')) {
      return [
        'Glass is cracked after a drop, touch still responds.',
        'Display has vertical colored lines running through it.',
        'Screen is completely black but power light stays on.',
        'Display flickers when opening or adjusting the angle.'
      ];
    }
    if (f.includes('slow')) {
      return [
        'Takes 10 minutes to boot up and open basic apps.',
        'Frequently freezes and shows Not Responding.',
        'Web browsing and video playback stutter heavily.'
      ];
    }
    if (f.includes('charging') || f.includes('power')) {
      return [
        'Charger pin has to be bent at a specific angle to charge.',
        'No charging light when plugged into the socket.',
        'Device is completely dead and does not react at all.'
      ];
    }
    if (f.includes('water') || f.includes('liquid')) {
      return [
        'Spilled water or tea onto the device yesterday.',
        'Shut off immediately after liquid contact.',
        'Left it to dry for 24 hours but won\'t turn on now.'
      ];
    }
    if (f.includes('heat') || f.includes('fan')) {
      return [
        'Bottom of the device gets burning hot within 10 minutes.',
        'Fan makes loud clicking or whining noises.',
        'Shuts down automatically while running tasks.'
      ];
    }
    return [
      'Suddenly stopped working without any warning.',
      'Has been sitting unused in a cupboard for months.',
      'Works sometimes but randomly restarts.',
      'Want to know if fixing it is worth the cost.'
    ];
  };

  const stepsMeta = [
    { num: 1, title: 'Device', desc: 'What device do you have?' },
    { num: 2, title: 'Brand', desc: 'Brand and model' },
    { num: 3, title: 'Issue', desc: 'What is wrong with it?' },
    { num: 4, title: 'Details', desc: 'Tell us in everyday words' },
    { num: 5, title: 'Review', desc: 'Photo & free check' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans">
      
      {/* Friendly Human Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Simple Device Check · One Question At A Time</span>
        </div>
        
        <h1 
          className="font-display text-3xl sm:text-4xl font-extrabold text-purple-950 dark:text-white tracking-tight"
          style={{ backgroundColor: '#e3cdf6', color: '#090808' }}
        >
          Let's understand your device ✨
        </h1>
        
        <p 
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto"
          style={{ fontSize: '16px', color: '#a25fdc' }}
        >
          Answer simple questions in normal everyday words. We will figure out whether it can be repaired, reused, or sold.
        </p>

        {/* Quick Demo Preset Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => handlePresetSelect('dell-laptop-official')}
            className="text-xs text-purple-700 dark:text-purple-300 hover:underline font-semibold"
          >
            ⚡ Or click here to test with a 5-Year Dell Laptop (Official Scenario)
          </button>
        </div>
      </div>

      {/* Progressive Step Progress Indicator */}
      <div className="mb-6 bg-white dark:bg-[#110724] border border-purple-200 dark:border-purple-500/30 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {stepsMeta.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div 
                key={s.num} 
                onClick={() => {
                  // Allow jumping back to answered steps
                  if (s.num <= currentStep || (s.num === 2 && formData.deviceType)) {
                    setCurrentStep(s.num);
                  }
                }}
                className={`flex-1 flex items-center gap-2 cursor-pointer transition-all ${
                  isCurrent ? 'opacity-100' : isCompleted ? 'opacity-90' : 'opacity-40'
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-transform ${
                  isCurrent 
                    ? 'bg-purple-700 text-white ring-4 ring-purple-400/25 scale-105' 
                    : isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <div className="hidden md:block text-left">
                  <span className="block text-[11px] font-bold text-purple-950 dark:text-white leading-tight">
                    {s.title}
                  </span>
                  <span className="block text-[9px] text-slate-500 leading-none">
                    {isCurrent ? 'Current' : isCompleted ? 'Done' : 'Next'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Friendly Intake Card */}
      <div 
        className="bg-[#180e20] dark:bg-[#180e20] border-2 border-purple-200 dark:border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-xl text-white"
        style={{ backgroundColor: '#180e20' }}
      >
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">

          {/* ========================================================== */}
          {/* QUESTION 1: "What device do you have?"                     */}
          {/* ========================================================== */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Question 1 of 5
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    What device do you have?
                  </h2>
                </div>
                <span className="text-xs text-purple-300">Tap one to continue</span>
              </div>

              {/* Exact same options as present */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
                {deviceChoices.map((dev) => {
                  const isSelected = formData.deviceType.toLowerCase() === dev.type.toLowerCase();
                  return (
                    <button
                      key={dev.label}
                      type="button"
                      onClick={() => {
                        // Based on answer given, set defaults and advance to next question
                        const defaultBrand = dev.type === 'Laptop' ? 'Dell' : 
                                            dev.type === 'Smartphone' ? 'Samsung' : 
                                            dev.type === 'Desktop' ? 'HP' : 
                                            dev.type === 'TV' ? 'Sony' : 
                                            dev.type === 'Gaming Device' ? 'Sony PlayStation' : 'Tablet';
                        
                        const defaultModel = dev.type === 'Laptop' ? 'Inspiron 15' : 
                                            dev.type === 'Smartphone' ? 'Galaxy S21' : 
                                            dev.type === 'Desktop' ? 'Desktop 24' : 
                                            dev.type === 'TV' ? 'Bravia 55' : 
                                            dev.type === 'Gaming Device' ? 'PlayStation 5' : 'Generic Model';

                        setFormData(prev => ({
                          ...prev,
                          deviceType: dev.type,
                          brand: prev.brand && prev.deviceType === dev.type ? prev.brand : defaultBrand,
                          model: prev.model && prev.deviceType === dev.type ? prev.model : defaultModel
                        }));
                        // Advance to Question 2
                        setCurrentStep(2);
                      }}
                      className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 group transform active:scale-95 ${
                        isSelected
                          ? 'bg-purple-900/80 border-purple-500 ring-4 ring-purple-500/30 shadow-lg scale-105'
                          : 'bg-[#0f071a] border-purple-900/60 hover:border-purple-400 hover:bg-[#1d0e33]'
                      }`}
                    >
                      <span className="text-4xl transition-transform group-hover:scale-110">{dev.emoji}</span>
                      <span className="text-xs font-extrabold text-white">
                        {dev.label}
                      </span>
                      <span className="text-[10px] text-purple-300">
                        Select ➔
                      </span>
                    </button>
                  );
                })}
              </div>

              {formData.deviceType && (
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>Next: Brand & Model</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================== */}
          {/* QUESTION 2: Adaptive based on Device Choice                */}
          {/* ========================================================== */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Question 2 of 5 · Based on your {formData.deviceType || 'Device'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    What brand is your {formData.deviceType}?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Device</span>
                </button>
              </div>

              {/* Quick Brand Pills based on device */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-purple-200">
                  Tap your brand or type below:
                </span>
                <div className="flex flex-wrap gap-2">
                  {getBrandsForDevice(formData.deviceType).map((brandName) => {
                    const isSelected = formData.brand.toLowerCase() === brandName.toLowerCase();
                    return (
                      <button
                        key={brandName}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, brand: brandName }))}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-purple-600 border-purple-400 text-white ring-2 ring-purple-400/40 shadow-md'
                            : 'bg-[#0f071a] border-purple-900/70 text-purple-200 hover:border-purple-400'
                        }`}
                      >
                        {brandName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand and Model inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-purple-200 block mb-1">
                    Brand Name:
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="e.g. Dell, HP, Apple"
                    className="w-full p-3 rounded-xl border border-purple-500/40 bg-[#0c0416] text-sm text-white font-semibold focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-purple-200 block mb-1">
                    Model or Age (Rough guess is fine):
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="e.g. Inspiron 15 (approx. 5 years old)"
                    className="w-full p-3 rounded-xl border border-purple-500/40 bg-[#0c0416] text-sm text-white font-semibold focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-xs font-bold text-purple-200 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>Next: What is wrong?</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* QUESTION 3: Adaptive based on Device & Brand               */}
          {/* ========================================================== */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Question 3 of 5 · Diagnosing your {formData.brand} {formData.deviceType}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    What is wrong with your {formData.brand || formData.deviceType}?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Brand</span>
                </button>
              </div>

              {/* Tailored Problems based on Device */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 pt-1">
                {getIssuesForDevice(formData.deviceType).map((prob) => {
                  const isSelected = (formData.userReportedFaults || '').toLowerCase().includes(prob.label.toLowerCase()) || 
                                     (prob.label.includes('Battery') && formData.batteryStatus === 'poor');
                  return (
                    <button
                      key={prob.label}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          userReportedFaults: prob.fault,
                          batteryStatus: prob.label.toLowerCase().includes('battery') ? 'poor' : 'good',
                          physicalBodyStatus: prob.label.toLowerCase().includes('screen') ? 'minor_scratches' : 'clean'
                        }));
                        // Advance to Question 4
                        setCurrentStep(4);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 transform active:scale-98 ${
                        isSelected
                          ? 'bg-purple-900/80 border-purple-400 font-bold text-white ring-2 ring-purple-400/40 shadow-md'
                          : 'bg-[#0f071a] border-purple-900/60 text-slate-200 hover:border-purple-400 hover:bg-[#1b0d2f]'
                      }`}
                    >
                      <span className="text-3xl mt-0.5">{prob.emoji}</span>
                      <div className="flex-1">
                        <strong className="block text-sm font-extrabold text-white">
                          {prob.label}
                        </strong>
                        <p className="text-xs text-purple-200/80 mt-0.5">
                          {prob.detail}
                        </p>
                      </div>
                      <span className="text-xs text-purple-400 font-bold self-center">
                        Select ➔
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-xs font-bold text-purple-200 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                {formData.userReportedFaults && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                  >
                    <span>Next: Describe Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* QUESTION 4: Tailored Follow-up based on Issue Chosen       */}
          {/* ========================================================== */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Question 4 of 5 · Tell us what happened
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    Describe what happened in everyday words
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Issue</span>
                </button>
              </div>

              {/* Textarea with integrated voice typing */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-purple-200">
                    Type or speak what happened:
                  </span>
                  <span className="text-[11px] text-purple-300">No tech terms needed</span>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={formData.userReportedFaults || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, userReportedFaults: e.target.value }))}
                    placeholder="e.g. My laptop battery only lasts 10 minutes unplugged, and it shuts off as soon as the power cord is pulled out."
                    className="w-full p-4 rounded-2xl border-2 border-purple-500/40 bg-[#0c0416] text-sm text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 leading-relaxed"
                  />

                  {/* Voice Button */}
                  <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all ${
                        isListening
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-purple-800 hover:bg-purple-700 text-purple-100 border border-purple-500/40'
                      }`}
                      title="Speak your problem"
                    >
                      {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-purple-200" />}
                      <span>{isListening ? 'Listening...' : '🎤 SPEAK'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tailored 1-tap sentences based on the issue */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-purple-200 block">
                  Or tap a common sentence to add:
                </span>
                <div className="flex flex-wrap gap-2">
                  {getQuickPhrasesForIssue(formData.deviceType, formData.userReportedFaults).map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          userReportedFaults: prev.userReportedFaults ? `${prev.userReportedFaults}. ${phrase}` : phrase
                        }));
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 text-xs font-medium border border-purple-500/30 transition-all text-left"
                    >
                      "{phrase}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-xs font-bold text-purple-200 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>Next: Photo & Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* QUESTION 5: Optional Photo & Summary Review               */}
          {/* ========================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Question 5 of 5 · Final Check
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    Attach photo & review your answers
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {/* Summary Card of Answers Given */}
              <div className="bg-[#0e051c] border border-purple-500/40 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                  <span className="text-xs font-mono uppercase font-bold text-purple-300">
                    📋 Summary of your answers
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">✓ Ready for Assessment</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-purple-400 block font-mono">1. DEVICE</span>
                      <strong className="text-white font-bold text-sm">
                        {formData.deviceType}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-purple-300 hover:text-white flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-purple-400 block font-mono">2. BRAND & MODEL</span>
                      <strong className="text-white font-bold text-sm">
                        {formData.brand} {formData.model}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-purple-300 hover:text-white flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 col-span-1 sm:col-span-2 flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-purple-400 block font-mono">3 & 4. REPORTED PROBLEM</span>
                      <p className="text-purple-100 text-xs mt-0.5 leading-relaxed">
                        "{formData.userReportedFaults || 'Standard hardware diagnostic check'}"
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="text-purple-300 hover:text-white flex items-center gap-1 font-semibold text-[11px] shrink-0"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional: Photo Upload */}
              <div className="bg-purple-950/50 p-4 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-900/60 text-purple-300 flex items-center justify-center text-lg">
                    📷
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-white">
                      Attach photo of device or screen (Optional)
                    </strong>
                    <span className="text-[11px] text-purple-300">
                      Shows any label, damage, or screen glitch.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-800 hover:bg-purple-700 border border-purple-500/50 text-white font-bold text-xs shadow-sm transition-all">
                    <Camera className="w-4 h-4 text-purple-300" />
                    <span>{formData.imageBase64 ? 'Photo Added ✓' : '📷 Take / Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {formData.imageBase64 && (
                <div className="relative inline-block">
                  <img src={formData.imageBase64} alt="Preview" className="h-24 w-auto rounded-xl border border-purple-400 object-cover shadow-md" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageBase64: undefined }))}
                    className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-rose-700"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-[0.99] text-white font-extrabold text-base tracking-wide shadow-xl shadow-purple-900/50 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{loadingSteps[loadingStepIndex]}</span>
                    </>
                  ) : (
                    <>
                      <span>🔍 Run Free AI Analysis & Action Plan</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-purple-300 mt-2">
                  Free assessment · Plain everyday language · Pricing & technicians in ₹ INR
                </p>
              </div>

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to description</span>
                </button>
              </div>
            </div>
          )}

        </form>
      </div>

    </div>
  );
};
