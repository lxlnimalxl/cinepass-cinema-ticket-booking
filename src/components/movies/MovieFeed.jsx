import React, { useState } from 'react';
import { Menu, Bell, Search, Star, Bookmark, Play, ChevronRight, SlidersHorizontal, Film } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function MovieFeed({
  movies = [],
  onSelectMovie,
  onOpenDrawer,
  onOpenNotifications,
  unreadCount = 2,
  onToggleSave
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Now Showing', 'Coming Soon', 'IMAX 3D', 'VIP Lounge'];

  const filteredMovies = movies.filter(m => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.genres.toLowerCase().includes(q);
    }
    return true;
  });

  const activeMovie = filteredMovies[activeIndex] || filteredMovies[0] || movies[0];

  return (
    <div className="relative flex flex-col justify-between min-h-[750px] pb-6">
      {/* Top Navigation Bar */}
      <div className="relative z-20 px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={onOpenDrawer}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-md active:scale-95"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* Brand / Title */}
        <div className="flex items-center space-x-1.5">
          <Film size={18} className="text-[#00C853]" />
          <span className="font-bold tracking-wider text-base text-white">CINEPASS</span>
        </div>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-md active:scale-95"
          aria-label="Open Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#00C853] rounded-full ring-2 ring-[#0d0e12] animate-pulse" />
          )}
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-5 mt-2 z-20">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie, director, genre..."
            className="w-full bg-[#181920]/80 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all backdrop-blur-md"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-5 mt-3 flex items-center space-x-2 overflow-x-auto no-scrollbar z-20 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              filterCategory === cat
                ? 'bg-[#00C853] text-black shadow-md shadow-[#00C853]/25 font-bold'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Movie Poster Hero Stage */}
      {activeMovie && (
        <div className="relative px-5 mt-4 flex-1 flex flex-col justify-end min-h-[460px]">
          {/* Card Container */}
          <div className="relative w-full h-[470px] rounded-[32px] overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
            {/* Movie Backdrop Poster */}
            <img
              src={resolveImage(activeMovie.poster_image)}
              alt={activeMovie.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

            {/* Top Badges inside card */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              {/* IMDb Rating Badge */}
              <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full shadow-lg">
                <Star size={13} className="text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-xs font-bold text-[#F59E0B] tracking-wide">
                  IMDB {activeMovie.imdb_rating}
                </span>
              </div>

              {/* Save / Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(activeMovie.id);
                }}
                className={`w-9 h-9 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all ${
                  activeMovie.is_saved
                    ? 'bg-[#00C853] text-black shadow-lg shadow-[#00C853]/30'
                    : 'bg-black/60 text-white hover:bg-black/80'
                }`}
                aria-label="Save to Watchlist"
              >
                <Bookmark size={16} className={activeMovie.is_saved ? 'fill-black' : ''} />
              </button>
            </div>

            {/* Bottom Card Content */}
            <div className="absolute bottom-5 inset-x-5 z-10 flex flex-col space-y-2.5">
              {/* Genre & Duration */}
              <div className="flex items-center space-x-2 text-xs font-medium text-gray-300">
                <span>{activeMovie.genres}</span>
                <span>•</span>
                <span>{activeMovie.duration_minutes} Min</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {activeMovie.title}
              </h2>

              {/* Synopsis Snippet */}
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {activeMovie.synopsis || activeMovie.description}
              </p>

              {/* Action Buttons Row */}
              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={() => onSelectMovie(activeMovie)}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#00C853] hover:bg-[#00b54b] active:scale-[0.98] text-black font-extrabold text-sm tracking-wide shadow-lg shadow-[#00C853]/30 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Buy a Ticket</span>
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={() => onSelectMovie(activeMovie)}
                  className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-all active:scale-95"
                  title="View Movie Details & Trailer"
                >
                  <Play size={18} className="fill-white translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Carousel Thumbnails */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            More In Theaters ({filteredMovies.length})
          </span>
          <span className="text-xs text-[#00C853] font-semibold">Swipe to explore</span>
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-1">
          {filteredMovies.map((movie, idx) => {
            const isCurrent = (filteredMovies[activeIndex]?.id === movie.id);
            return (
              <div
                key={movie.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-20 h-28 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isCurrent
                    ? 'ring-2 ring-[#00C853] scale-105 shadow-lg shadow-[#00C853]/20'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={resolveImage(movie.poster_image)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 inset-x-1 text-center">
                  <span className="text-[10px] font-bold text-white truncate block">
                    {movie.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
