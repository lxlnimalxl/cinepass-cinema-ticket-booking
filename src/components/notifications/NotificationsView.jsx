import React, { useState } from 'react';
import { ChevronLeft, Bell, Tag, Star, Clock, MapPin, CheckCheck, Ticket } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function NotificationsView({
  notifications = [],
  onMarkRead,
  onBack,
  onBookTicket
}) {
  const [activeTab, setActiveTab] = useState('unread'); // 'unread' | 'read'

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'unread') return !n.is_read;
    return n.is_read;
  });

  return (
    <div className="relative min-h-[750px] pb-12 text-gray-100 bg-[#0d0e12] px-5 pt-3">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>

        <h2 className="text-xl font-extrabold text-white tracking-wide">Notifications</h2>

        <div className="w-10 h-10 flex items-center justify-center text-[#00C853]">
          <Bell size={20} />
        </div>
      </div>

      {/* Promo Discount Banners (Exact Figma 263:385) */}
      <div className="space-y-2.5 mb-5">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-emerald-600/30 border border-[#00C853]/40 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black tracking-wider uppercase text-[#00C853] bg-black/40 px-2.5 py-0.5 rounded-full border border-[#00C853]/30">
              35% Discount For You
            </span>
            <Tag size={16} className="text-[#00C853]" />
          </div>
          <p className="text-xs text-gray-200 mt-2 font-medium">
            You can buy tickets with 35% discount in our selected movie theaters.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-900/50 to-amber-600/20 border border-amber-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black tracking-wider uppercase text-amber-400 bg-black/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              25% Discount For You
            </span>
            <Tag size={16} className="text-amber-400" />
          </div>
          <p className="text-xs text-gray-200 mt-2 font-medium">
            You can buy tickets with 25% discount in our selected movie theaters.
          </p>
        </div>
      </div>

      {/* Filter Tabs: Unread / Readen (Figma exact naming) */}
      <div className="flex items-center space-x-2 bg-[#16171d] p-1 rounded-2xl border border-white/5 mb-4">
        <button
          onClick={() => setActiveTab('unread')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'unread'
              ? 'bg-[#00C853] text-black shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setActiveTab('read')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'read'
              ? 'bg-white/10 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Readen
        </button>
      </div>

      {/* Notification Cards List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => onMarkRead(item.id)}
              className="p-3.5 rounded-2xl bg-[#16171d] border border-white/5 hover:border-white/15 transition-all space-y-2.5 shadow-md relative group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  {item.image_thumb && (
                    <img
                      src={resolveImage(item.image_thumb)}
                      alt={item.title}
                      className="w-10 h-14 rounded-lg object-cover ring-1 ring-white/10 shrink-0"
                    />
                  )}
                  <div>
                    <h4 className="text-xs font-extrabold text-white group-hover:text-[#00C853] transition-colors">
                      {item.title}
                    </h4>
                    {item.cinema_name && (
                      <p className="text-[11px] text-gray-400 flex items-center space-x-1 mt-0.5">
                        <MapPin size={11} className="text-[#00C853]" />
                        <span>{item.cinema_name}</span>
                      </p>
                    )}
                    {item.seats_info && (
                      <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
                        Seats: {item.seats_info}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {item.imdb_rating && (
                    <div className="flex items-center space-x-1 text-[11px] font-bold text-[#F59E0B]">
                      <Star size={11} className="fill-[#F59E0B]" />
                      <span>{item.imdb_rating}</span>
                    </div>
                  )}
                  {item.duration_label && (
                    <span className="text-[10px] text-gray-400 block mt-1">{item.duration_label}</span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-gray-300 leading-relaxed font-normal">
                {item.body}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-[10px] text-gray-400 font-medium">{item.time_label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookTicket();
                  }}
                  className="px-3 py-1 rounded-lg bg-[#00C853]/15 hover:bg-[#00C853] text-[#00C853] hover:text-black font-bold text-[11px] transition-all flex items-center space-x-1"
                >
                  <Ticket size={11} />
                  <span>Book A Ticket</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <CheckCheck size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">All caught up!</p>
            <p className="text-xs mt-1">No {activeTab} notifications at this time</p>
          </div>
        )}
      </div>
    </div>
  );
}
