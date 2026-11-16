import React from 'react';
import { Home, Ticket, Bookmark, Settings, LogOut, X, Film, Bell } from 'lucide-react';
import jackobAvatar from '../../assets/images/jackob-avatar.png';

export default function NavigationDrawer({ isOpen, onClose, currentTab, onSelectTab, bookedCount = 1 }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tickets', label: 'Tickets', icon: Ticket, badge: bookedCount > 0 ? bookedCount : null },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'notifications', label: 'Notification', icon: Bell },
    { id: 'settings', label: 'Setting', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-72 max-w-[80vw] h-full bg-[#111216] border-r border-white/10 flex flex-col justify-between p-6 z-10 shadow-2xl transition-transform duration-300">
        <div>
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-4 mt-6 mb-10 pb-6 border-b border-white/10">
            <div className="relative">
              <img 
                src={jackobAvatar} 
                alt="Jackob" 
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00C853]/60 shadow-lg"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00C853] border-2 border-[#111216] rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">Jackob</h3>
              <p className="text-xs text-gray-400 font-medium">VIP Member</p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#00C853]/20 to-transparent text-[#00C853] font-semibold border-l-4 border-[#00C853]' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <Icon size={20} className={isActive ? 'text-[#00C853]' : 'text-gray-400 group-hover:text-white transition-colors'} />
                    <span className="text-[16px]">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#00C853] text-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={() => {
              onSelectTab('logout');
              onClose();
            }}
            className="w-full flex items-center space-x-3.5 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="text-[16px] font-medium">Logout</span>
          </button>
          
          <div className="mt-4 px-4 text-center">
            <p className="text-[11px] text-gray-500 font-medium">CinePass v2.4.0 iOS Kit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
