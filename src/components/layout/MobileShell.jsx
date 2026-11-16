import React, { useState } from 'react';
import { Menu, Bell, Smartphone, Monitor, Search, Sparkles } from 'lucide-react';

export default function MobileShell({
  children,
  onOpenDrawer,
  unreadCount = 2,
  onOpenNotifications,
  currentTab
}) {
  const [deviceMode, setDeviceMode] = useState('iphone'); // 'iphone' | 'expanded'

  return (
    <div className="min-h-screen bg-[#07080a] text-gray-100 flex flex-col items-center justify-start py-4 px-2 sm:px-6 relative selection:bg-[#00C853] selection:text-black">
      {/* Top Device Switcher & Info Toolbar */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md z-40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C853] to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.78 10.54C21.65 10.67 21.47 10.75 21.27 10.75C20.56 10.75 19.98 11.31 19.98 12C19.98 12.69 20.55 13.25 21.26 13.25C21.66 13.26 22 13.53 22 13.92V16.33C22 18.35 20.31 20 18.22 20H5.78C3.7 20 2 18.36 2 16.33V13.92C2 13.53 2.34 13.26 2.74 13.25C3.45 13.25 4.02 12.69 4.02 12C4.02 11.33 3.46 10.82 2.73 10.82C2.53 10.82 2.35 10.75 2.21 10.61C2.08 10.48 2 10.3 2 10.12V7.68C2 5.66 3.71 4 5.79 4H18.22C20.31 4 22 5.64 22 7.67V10.04C22 10.23 21.92 10.41 21.78 10.54Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-1.5">
              CinePass <span className="text-xs px-2 py-0.5 rounded-full bg-[#00C853]/20 text-[#00C853] font-semibold border border-[#00C853]/30">iOS Native</span>
            </h1>
            <p className="text-[11px] text-gray-400">Pixel-Perfect Figma Dark Mode Reproduction</p>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center space-x-2">
          <div className="bg-[#121318] p-1 rounded-xl border border-white/10 flex items-center">
            <button
              onClick={() => setDeviceMode('iphone')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === 'iphone'
                  ? 'bg-[#00C853] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="iOS 15/16 Pro Mobile Shell View"
            >
              <Smartphone size={14} />
              <span>iPhone Frame</span>
            </button>
            <button
              onClick={() => setDeviceMode('expanded')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === 'expanded'
                  ? 'bg-[#00C853] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Expanded Responsive View"
            >
              <Monitor size={14} />
              <span>Full Screen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Device Shell Wrapper */}
      <div className={`transition-all duration-300 w-full flex justify-center ${
        deviceMode === 'iphone' 
          ? 'max-w-[400px]' 
          : 'max-w-4xl'
      }`}>
        <div className={`w-full relative overflow-hidden bg-[#0d0e12] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all ${
          deviceMode === 'iphone'
            ? 'rounded-[44px] min-h-[825px] ring-8 ring-[#1c1d22]'
            : 'rounded-2xl min-h-[780px]'
        }`}>
          
          {/* iOS Dynamic Island & Status Bar (in iPhone mode) */}
          {deviceMode === 'iphone' && (
            <div className="relative pt-3 pb-2 px-6 flex items-center justify-between z-30 select-none bg-[#0d0e12]">
              {/* iOS Clock */}
              <div className="text-[14px] font-semibold tracking-tight text-white w-14">
                9:41
              </div>

              {/* Dynamic Island */}
              <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto border border-white/5 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
                <div className="w-2 h-2 rounded-full bg-[#00C853]/80 animate-pulse" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center space-x-1.5 text-white/90 w-14 justify-end">
                {/* Signal */}
                <div className="flex items-end space-x-0.5 h-2.5">
                  <span className="w-0.5 h-1 bg-white rounded-full"></span>
                  <span className="w-0.5 h-1.5 bg-white rounded-full"></span>
                  <span className="w-0.5 h-2 bg-white rounded-full"></span>
                  <span className="w-0.5 h-2.5 bg-white rounded-full"></span>
                </div>
                {/* 5G */}
                <span className="text-[10px] font-bold tracking-tighter">5G</span>
                {/* Battery */}
                <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5 flex items-center">
                  <div className="h-full w-full bg-[#00C853] rounded-xs"></div>
                </div>
              </div>
            </div>
          )}

          {/* Screen Body */}
          <main className="relative min-h-[750px] flex flex-col justify-between overflow-x-hidden">
            {children}
          </main>

          {/* iOS Home Indicator Bar */}
          {deviceMode === 'iphone' && (
            <div className="relative py-2 select-none pointer-events-none flex justify-center bg-[#0d0e12]">
              <div className="w-32 h-1 bg-white/40 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
