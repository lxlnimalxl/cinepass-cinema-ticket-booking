import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Download, Share2, Home, QrCode, Ticket, ArrowLeft } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function TicketConfirmationView({
  booking,
  onGoHome
}) {
  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00C853', '#FF5A5F', '#F59E0B', '#FFFFFF']
      });
    } catch (e) {
      console.warn('Confetti failed:', e);
    }
  }, []);

  if (!booking) return null;

  return (
    <div className="relative min-h-[750px] pb-10 text-gray-100 bg-[#0d0e12] px-5 pt-4 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10 mb-2">
        <button
          onClick={onGoHome}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
          aria-label="Back to Home"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-base font-extrabold text-white tracking-wide">Mobile Ticket Pass</span>
        <div className="w-10 h-10 flex items-center justify-center text-[#00C853]">
          <CheckCircle size={22} className="text-[#00C853]" />
        </div>
      </div>

      {/* Main Boarding Pass Card */}
      <div className="relative w-full max-w-sm mx-auto my-auto rounded-[32px] bg-[#16171d] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Header Card with Movie Backdrop */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={resolveImage('tenet-banner.png')}
            alt="Movie Banner"
            className="w-full h-full object-cover object-top filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16171d] via-[#16171d]/50 to-transparent" />

          {/* Booking Status Pill */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#00C853] text-black shadow-lg">
              CONFIRMED
            </span>
          </div>

          <div className="absolute bottom-3 left-5 right-5">
            <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
              {booking.movie_title || "Tenet"}
            </h3>
            <p className="text-xs text-gray-300 font-medium">{booking.hall_name || "IMAX Laser Cinema Hall 1"}</p>
          </div>
        </div>

        {/* Ticket Details Grid */}
        <div className="p-6 pt-3 space-y-4">
          <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Date</span>
              <span className="text-sm font-bold text-white">{booking.date_display || "Sat, 24 Oct 2026"}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Time</span>
              <span className="text-sm font-bold text-white">{booking.time_display || "18:30"}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Seats</span>
              <span className="text-base font-extrabold text-[#00C853]">{booking.seats || "E7, E8"}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Total Price</span>
              <span className="text-base font-extrabold text-white">${Number(booking.total_price || 24).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-300">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-semibold">Customer</span>
              <span className="font-bold text-white">{booking.customer_name || "Jackob Henderson"}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block uppercase font-semibold">Ref Code</span>
              <span className="font-mono text-xs font-bold text-amber-400">{booking.booking_code || "CP-88429-X"}</span>
            </div>
          </div>
        </div>

        {/* Perforated Tear Line with Circular Notches */}
        <div className="relative py-1 flex items-center justify-center">
          <div className="ticket-notch-left shadow-inner" />
          <div className="w-full border-t-2 border-dashed border-white/20 mx-4" />
          <div className="ticket-notch-right shadow-inner" />
        </div>

        {/* Bottom Barcode & QR Code Section */}
        <div className="p-6 pt-3 pb-6 flex flex-col items-center justify-center text-center bg-[#13141a]">
          {/* QR Code Graphic Box */}
          <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-3">
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="black">
              {/* Corner squares */}
              <rect x="10" y="10" width="24" height="24" rx="4" fill="black" />
              <rect x="14" y="14" width="16" height="16" fill="white" />
              <rect x="18" y="18" width="8" height="8" fill="black" />

              <rect x="66" y="10" width="24" height="24" rx="4" fill="black" />
              <rect x="70" y="14" width="16" height="16" fill="white" />
              <rect x="74" y="18" width="8" height="8" fill="black" />

              <rect x="10" y="66" width="24" height="24" rx="4" fill="black" />
              <rect x="14" y="70" width="16" height="16" fill="white" />
              <rect x="18" y="74" width="8" height="8" fill="black" />

              {/* Data matrix dots */}
              <rect x="42" y="12" width="6" height="6" />
              <rect x="52" y="12" width="6" height="12" />
              <rect x="42" y="24" width="10" height="6" />
              <rect x="12" y="42" width="6" height="10" />
              <rect x="24" y="42" width="14" height="6" />
              <rect x="44" y="44" width="12" height="12" fill="#00C853" />
              <rect x="62" y="42" width="8" height="6" />
              <rect x="76" y="42" width="12" height="6" />
              <rect x="62" y="54" width="26" height="6" />
              <rect x="42" y="66" width="6" height="18" />
              <rect x="54" y="72" width="12" height="6" />
              <rect x="72" y="68" width="16" height="6" />
              <rect x="72" y="80" width="10" height="8" />
            </svg>
          </div>

          <span className="text-[11px] font-mono text-gray-400 tracking-wider">
            SCAN AT CINEMA USHER TURNSTILE
          </span>

          {/* Barcode lines */}
          <div className="mt-3 flex items-center space-x-1 opacity-70">
            {[4, 2, 6, 2, 8, 3, 2, 5, 2, 7, 3, 2, 6, 4, 2, 5, 2, 8, 2, 4, 6].map((w, i) => (
              <div key={i} className="h-6 bg-white rounded-xs" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-4 flex flex-col space-y-2.5 max-w-sm mx-auto w-full">
        {/* Add to Apple Wallet Button */}
        <button
          onClick={() => alert('Pass added to Apple Wallet!')}
          className="w-full py-3 px-4 rounded-2xl bg-black hover:bg-neutral-900 border border-white/20 text-white font-bold text-xs tracking-wide flex items-center justify-center space-x-2 shadow-lg active:scale-98 transition-all"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.67-2.83 1.45-.58.67-1.1 1.76-.96 2.82 1.11.09 2.19-.54 2.83-1.32z" />
          </svg>
          <span>Add to Apple Wallet</span>
        </button>

        <button
          onClick={onGoHome}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#00C853] hover:bg-[#00b54b] text-black font-extrabold text-sm tracking-wide shadow-lg shadow-[#00C853]/25 flex items-center justify-center space-x-2 active:scale-98 transition-all"
        >
          <Home size={18} />
          <span>Back to Movie Home</span>
        </button>
      </div>
    </div>
  );
}
