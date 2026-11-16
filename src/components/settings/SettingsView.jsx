import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Lock, Phone, MapPin, Globe, Bell, Ticket, Info, LogOut } from 'lucide-react';
import jackobAvatar from '../../assets/images/jackob-avatar.png';

export default function SettingsView({
  onBack,
  onOpenTickets,
  onLogout
}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [location, setLocation] = useState('Los Angeles');
  const [language, setLanguage] = useState('English');

  return (
    <div className="relative min-h-[750px] pb-12 text-gray-100 bg-[#0d0e12] px-5 pt-3">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>

        <h2 className="text-xl font-extrabold text-white tracking-wide">Setting</h2>

        <div className="w-10 h-10" />
      </div>

      {/* User Header Profile */}
      <div className="p-4 rounded-2xl bg-[#16171d] border border-white/5 flex items-center space-x-3.5 mb-6 shadow-md">
        <img
          src={jackobAvatar}
          alt="Jackob"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00C853]/60"
        />
        <div>
          <h3 className="text-base font-extrabold text-white">Jackob Henderson</h3>
          <p className="text-xs text-gray-400">jackob.cinema@apple.ios</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#00C853]/20 text-[#00C853] text-[10px] font-bold">
            Diamond VIP Tier
          </span>
        </div>
      </div>

      {/* Account Settings Section (Figma 263:264) */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 px-1">
          Account Setting
        </h3>
        <div className="rounded-2xl bg-[#16171d] border border-white/5 divide-y divide-white/5 overflow-hidden shadow-md">
          <button
            onClick={() => alert('Change email modal')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <Mail size={16} className="text-[#00C853]" />
              <span>Change Email</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </button>

          <button
            onClick={() => alert('Change password modal')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <Lock size={16} className="text-[#00C853]" />
              <span>Change Password</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </button>

          <button
            onClick={() => alert('Change mobile number modal')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <Phone size={16} className="text-[#00C853]" />
              <span>Change Mobile Number</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </button>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <MapPin size={16} className="text-[#00C853]" />
              <span>My Location</span>
            </div>
            <span className="text-xs font-bold text-gray-300">{location}</span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <Globe size={16} className="text-[#00C853]" />
              <span>Language</span>
            </div>
            <span className="text-xs font-bold text-gray-300">{language}</span>
          </div>
        </div>
      </div>

      {/* App Settings Section */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 px-1">
          App Setting
        </h3>
        <div className="rounded-2xl bg-[#16171d] border border-white/5 divide-y divide-white/5 overflow-hidden shadow-md">
          {/* Notification Switch */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <Bell size={16} className="text-[#00C853]" />
              <span>Mobile Notification</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notificationsEnabled ? 'bg-[#00C853]' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <button
            onClick={onOpenTickets}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <Ticket size={16} className="text-[#00C853]" />
              <span>Bought Tickets</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </button>

          <button
            onClick={() => alert('CinePass v2.4.0 - Built from Figma iOS Kit with React & Django REST Framework')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center space-x-3 text-xs text-white font-medium">
              <Info size={16} className="text-[#00C853]" />
              <span>About Us</span>
            </div>
            <span className="text-[11px] text-gray-400">v2.4.0</span>
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={onLogout}
        className="w-full py-3.5 px-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs tracking-wide border border-red-500/20 transition-all flex items-center justify-center space-x-2"
      >
        <LogOut size={16} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
