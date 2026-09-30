import React, { useState } from 'react';
import { Camera, Check, ArrowLeft, User, Phone, Mail, MapPin } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onBackToDashboard?: () => void;
  currentTheme?: string;
  isDark?: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onBackToDashboard,
  currentTheme,
  isDark: isDarkProp
}) => {
  const isDark = isDarkProp !== undefined ? isDarkProp : currentTheme === 'dark_purple';

  const [fullName, setFullName] = useState(user.fullName || 'Priya Sharma');
  const [email, setEmail] = useState(user.email || 'priya.sharma@gmail.com');
  const [phone, setPhone] = useState(user.phone || '+91 98450 12345');
  const [address, setAddress] = useState(user.address || '#42, 4th Cross, Koramangala 4th Block, Bengaluru, Karnataka 560034');
  const [photoUrl, setPhotoUrl] = useState(
    user.avatarUrl || 
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      fullName,
      email,
      phone,
      address,
      avatarUrl: photoUrl
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 font-sans animate-in fade-in duration-300">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBackToDashboard}
          className={`inline-flex items-center gap-2 text-xs font-bold transition-colors ${
            isDark ? 'text-purple-300 hover:text-white' : 'text-purple-800 hover:text-purple-950'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Dashboard</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <div className={`border-2 rounded-3xl p-6 sm:p-8 shadow-xl ${
        isDark 
          ? 'bg-[#180e20] border-purple-500/30 text-white' 
          : 'bg-white border-purple-200 text-purple-950'
      }`}>
        
        <form onSubmit={handleSave} className="space-y-6">

          {/* Profile Photo */}
          <div className="flex flex-col items-center justify-center text-center space-y-3 pb-6 border-b border-purple-100 dark:border-purple-900/50">
            <div className="relative group">
              <img
                src={photoUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-purple-500/40 shadow-lg group-hover:opacity-90 transition-opacity"
              />
              <label 
                className="absolute bottom-0 right-0 p-2.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white shadow-md cursor-pointer transition-transform hover:scale-110"
                title="Change Profile Photo"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                {fullName || 'Your Name'}
              </h2>
              <span className="text-xs text-slate-500 dark:text-purple-300/80">
                Click camera to change photo
              </span>
            </div>
          </div>

          {/* Inputs Section: ONLY Name, Address, Mobile Num, Gmail */}
          <div className="space-y-4">
            
            {/* 1. Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-extrabold mb-1.5 text-purple-900 dark:text-purple-200">
                <User className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Name</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className={`w-full p-3.5 rounded-xl border text-sm font-semibold focus:outline-none focus:border-purple-600 transition-all ${
                  isDark 
                    ? 'bg-[#0f0719] border-purple-500/30 text-white focus:border-purple-400' 
                    : 'bg-slate-50 border-purple-200 text-purple-950 focus:bg-white'
                }`}
              />
            </div>

            {/* 2. Address */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-extrabold mb-1.5 text-purple-900 dark:text-purple-200">
                <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Address</span>
              </label>
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Flat No, Street, Area, City, Pin Code"
                className={`w-full p-3.5 rounded-xl border text-sm font-semibold focus:outline-none focus:border-purple-600 transition-all leading-relaxed ${
                  isDark 
                    ? 'bg-[#0f0719] border-purple-500/30 text-white focus:border-purple-400' 
                    : 'bg-slate-50 border-purple-200 text-purple-950 focus:bg-white'
                }`}
              />
            </div>

            {/* 3. Mobile Number */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-extrabold mb-1.5 text-purple-900 dark:text-purple-200">
                <Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Mobile Number</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98450 12345"
                className={`w-full p-3.5 rounded-xl border text-sm font-semibold focus:outline-none focus:border-purple-600 transition-all ${
                  isDark 
                    ? 'bg-[#0f0719] border-purple-500/30 text-white focus:border-purple-400' 
                    : 'bg-slate-50 border-purple-200 text-purple-950 focus:bg-white'
                }`}
              />
            </div>

            {/* 4. Gmail */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-extrabold mb-1.5 text-purple-900 dark:text-purple-200">
                <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Gmail</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className={`w-full p-3.5 rounded-xl border text-sm font-semibold focus:outline-none focus:border-purple-600 transition-all ${
                  isDark 
                    ? 'bg-[#0f0719] border-purple-500/30 text-white focus:border-purple-400' 
                    : 'bg-slate-50 border-purple-200 text-purple-950 focus:bg-white'
                }`}
              />
            </div>

          </div>

          {/* Success Message */}
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 active:scale-[0.99] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
