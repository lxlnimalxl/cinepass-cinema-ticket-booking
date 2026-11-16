import React, { useState, useEffect } from 'react';
import { ChevronLeft, Info, Calendar, Clock, Armchair, CheckCircle2 } from 'lucide-react';
import { resolveImage } from '../../services/api';

// Exact Figma armchair vector path
const ArmchairSVG = ({ color = '#717171', className = "w-5 h-5" }) => (
  <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M0.691129 8.50308C0.691129 8.50604 0.691129 8.50866 0.691129 8.51127C0.971664 9.00599 1.11849 9.56525 1.11716 10.134V10.762C2.31493 10.2936 3.71586 10.0465 5.18007 10.0465C7.12128 10.0465 8.54676 10.4696 9.29729 10.7602L9.30248 10.1336C9.30248 9.45673 9.46211 8.85135 9.74156 8.36054L10.3741 4.19309C10.5375 3.12408 10.2551 2.10157 9.57782 1.31348C8.85967 0.479267 7.77207 0 6.59401 0H3.82637C2.64608 0 1.55659 0.479267 0.84106 1.31459C0.16463 2.10307 -0.118172 3.12558 0.0451879 4.19386L0.691129 8.50308Z"
      fill={color}
    />
  </svg>
);

export default function SeatBookingView({
  movie,
  onBack,
  onConfirmBooking
}) {
  const dates = [
    { day: '21', weekday: 'Wed' },
    { day: '22', weekday: 'Thu' },
    { day: '23', weekday: 'Fri' },
    { day: '24', weekday: 'Sat', active: true },
    { day: '25', weekday: 'Sun' },
    { day: '26', weekday: 'Mon' },
    { day: '27', weekday: 'Tue' },
  ];

  const showtimes = [
    { time: '14:00' },
    { time: '16:30' },
    { time: '18:30', active: true },
    { time: '21:00' },
    { time: '23:00' },
  ];

  const [selectedDate, setSelectedDate] = useState('24');
  const [selectedTime, setSelectedTime] = useState('18:30');

  // Rows A to I (9 rows)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  // Realistic pre-booked seats matching Figma
  const bookedSeatCodes = new Set([
    'B3', 'B4', 'C7', 'C8', 'D1', 'D2', 'D5', 'D6',
    'F4', 'F5', 'G8', 'G9', 'H2', 'H3', 'H7'
  ]);

  // Selected seats (defaults to E7 and E8 as in Figma)
  const [selectedSeats, setSelectedSeats] = useState(['E7', 'E8']);

  const basePrice = Number(movie?.ticket_price || 24);
  const totalPrice = selectedSeats.length > 0 ? (selectedSeats.length * (basePrice / 2)) : 0; // Each ticket is $12 or basePrice

  const handleSeatClick = (seatCode) => {
    if (bookedSeatCodes.has(seatCode)) return;

    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatCode));
    } else {
      setSelectedSeats([...selectedSeats, seatCode]);
    }
  };

  return (
    <div className="relative min-h-[750px] pb-24 text-gray-100 bg-[#0d0e12] select-none">
      {/* Top Header */}
      <div className="relative z-20 px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-extrabold text-white tracking-wide">{movie?.title || "Tenet"}</h2>
          <span className="text-[11px] text-gray-400">Choose Seats & Showtime</span>
        </div>

        <div className="w-10 h-10 flex items-center justify-center">
          <span className="text-xs font-bold text-[#00C853] px-2 py-0.5 rounded-full bg-[#00C853]/15">
            IMAX
          </span>
        </div>
      </div>

      {/* Date Selector Horizontal Strip */}
      <div className="mt-3 px-4">
        <div className="flex items-center justify-between space-x-2 overflow-x-auto no-scrollbar py-1">
          {dates.map((d) => {
            const isSelected = selectedDate === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDate(d.day)}
                className={`flex flex-col items-center justify-center min-w-[44px] py-2 rounded-2xl transition-all ${
                  isSelected
                    ? 'bg-[#00C853] text-black shadow-lg shadow-[#00C853]/30 scale-105 font-bold'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider">{d.weekday}</span>
                <span className={`text-base font-extrabold ${isSelected ? 'text-black' : 'text-white'}`}>
                  {d.day}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Showtime Pills Strip */}
      <div className="mt-3 px-4">
        <div className="flex items-center justify-between space-x-2 overflow-x-auto no-scrollbar py-1">
          {showtimes.map((st) => {
            const isSelected = selectedTime === st.time;
            return (
              <button
                key={st.time}
                onClick={() => setSelectedTime(st.time)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-white text-black shadow-md'
                    : 'bg-[#181920] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {st.time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Curved Cinema Screen Visualization (Figma 181:1622) */}
      <div className="mt-6 px-6 relative flex flex-col items-center">
        <div className="relative w-full max-w-[340px] flex flex-col items-center">
          {/* Curved Arc with Neon Glow */}
          <svg viewBox="0 0 364 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_0_15px_rgba(0,200,83,0.4)]">
            <path opacity="0.15" d="M19.1462 67C122.881 24.0857 240.31 24.3303 344.146 67" stroke="white" strokeWidth="2" />
            <path d="M19.1462 67L35.2632 62.0742C129.311 33.3308 229.746 32.9593 324.004 61.0064L344.146 67" stroke="#00C853" strokeWidth="3" />
            <text x="182" y="66" fill="#9CA3AF" fontSize="11" fontWeight="700" letterSpacing="4" textAnchor="middle">
              SCREEN
            </text>
          </svg>
        </div>
      </div>

      {/* Interactive 9x10 Seat Matrix */}
      <div className="mt-4 px-4 flex justify-center">
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row} className="flex items-center space-x-1.5 sm:space-x-2">
              {/* Left Row Label */}
              <span className="w-4 text-[10px] font-bold text-gray-500 text-right mr-1">
                {row}
              </span>

              {/* 10 Seats divided into 2 - 6 - 2 arrangement */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => {
                const seatCode = `${row}${col}`;
                const isBooked = bookedSeatCodes.has(seatCode);
                const isSelected = selectedSeats.includes(seatCode);
                const isVIP = ['G', 'H', 'I'].includes(row);

                // Determine seat armchair color
                let seatColor = '#717171'; // Available (gray)
                if (isBooked) {
                  seatColor = '#FFFFFF'; // Booked (white)
                } else if (isSelected) {
                  seatColor = '#FF5A5F'; // Selected (coral red in Figma)
                } else if (isVIP) {
                  seatColor = '#F59E0B'; // VIP (gold)
                }

                // Add aisle spacing
                const hasAisleGap = col === 2 || col === 8;

                return (
                  <React.Fragment key={seatCode}>
                    <button
                      onClick={() => handleSeatClick(seatCode)}
                      disabled={isBooked}
                      className={`relative p-1 rounded-md transition-transform duration-150 ${
                        isBooked
                          ? 'opacity-80 cursor-not-allowed'
                          : 'cursor-pointer hover:scale-125 active:scale-95'
                      } ${isSelected ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,90,95,0.7)]' : ''}`}
                      title={`Seat ${seatCode} - ${isBooked ? 'Booked' : isSelected ? 'Selected' : isVIP ? 'VIP ($16)' : 'Available ($12)'}`}
                    >
                      <ArmchairSVG color={seatColor} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    {hasAisleGap && <div className="w-2.5 sm:w-3" />}
                  </React.Fragment>
                );
              })}

              {/* Right Row Label */}
              <span className="w-4 text-[10px] font-bold text-gray-500 text-left ml-1">
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Legend (Figma Ticket design) */}
      <div className="mt-6 px-6 flex items-center justify-center space-x-5 text-xs text-gray-300">
        <div className="flex items-center space-x-1.5">
          <ArmchairSVG color="#717171" className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Available</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ArmchairSVG color="#FFFFFF" className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Booked</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ArmchairSVG color="#FF5A5F" className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold text-[#FF5A5F]">Selected</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ArmchairSVG color="#F59E0B" className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium text-[#F59E0B]">VIP</span>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (Confirm 24$) */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-4 bg-[#0d0e12]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-between max-w-[400px] mx-auto sm:max-w-none">
        <div>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <span>Seats:</span>
            <span className="font-bold text-white">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
            </span>
          </div>
          <div className="text-xl font-extrabold text-[#00C853]">
            ${totalPrice.toFixed(2)}
          </div>
        </div>

        <button
          onClick={() => {
            if (selectedSeats.length === 0) return;
            onConfirmBooking({
              movie_id: movie?.id || 1,
              movie_title: movie?.title || "Tenet",
              seats: selectedSeats.join(', '),
              seat_count: selectedSeats.length,
              total_price: totalPrice,
              date_display: `Sat, ${selectedDate} Oct 2026`,
              time_display: selectedTime,
              hall_name: "IMAX Laser Cinema Hall 1"
            });
          }}
          disabled={selectedSeats.length === 0}
          className={`py-3 px-8 rounded-2xl font-extrabold text-sm tracking-wide transition-all shadow-xl flex items-center space-x-2 ${
            selectedSeats.length > 0
              ? 'bg-[#00C853] hover:bg-[#00b54b] active:scale-95 text-black shadow-[#00C853]/30 cursor-pointer'
              : 'bg-white/10 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Confirm {totalPrice > 0 ? `$${totalPrice.toFixed(0)}` : 'Seat'}</span>
        </button>
      </div>
    </div>
  );
}
