import React from 'react';
import { ChevronLeft, Star, Clock, Eye, Trash2, Ticket, Bookmark } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function SavedWatchlistView({
  savedMovies = [],
  onSelectMovie,
  onRemoveSaved,
  onBack
}) {
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

        <h2 className="text-xl font-extrabold text-white tracking-wide">Saved Movies</h2>

        <div className="w-10 h-10 flex items-center justify-center text-[#00C853]">
          <Bookmark size={20} className="fill-[#00C853]" />
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-4 px-1">
        Your personal curated cinema watchlist ({savedMovies.length} titles)
      </p>

      {/* Movies List */}
      <div className="space-y-3.5">
        {savedMovies.length > 0 ? (
          savedMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative p-3.5 rounded-2xl bg-[#16171d] border border-white/5 hover:border-white/15 transition-all flex items-center space-x-3.5 shadow-lg group"
            >
              {/* Poster Thumbnail */}
              <div 
                onClick={() => onSelectMovie(movie)}
                className="w-20 h-28 rounded-xl overflow-hidden shrink-0 cursor-pointer relative shadow-md"
              >
                <img
                  src={resolveImage(movie.poster_image)}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 
                      onClick={() => onSelectMovie(movie)}
                      className="text-base font-extrabold text-white truncate cursor-pointer hover:text-[#00C853] transition-colors"
                    >
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">{movie.director}</p>
                  </div>

                  <button
                    onClick={() => onRemoveSaved(movie.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Metrics */}
                <div className="flex items-center space-x-3 text-[11px] text-gray-300 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="font-bold text-[#F59E0B]">IMDB {movie.imdb_rating}</span>
                  </div>
                  <span>•</span>
                  <span>{movie.duration_minutes} Min</span>
                  <span>•</span>
                  <span>{movie.views_count}</span>
                </div>

                {/* Quick CTA */}
                <div className="mt-2.5">
                  <button
                    onClick={() => onSelectMovie(movie)}
                    className="w-full py-1.5 px-3 rounded-xl bg-[#00C853]/15 hover:bg-[#00C853] text-[#00C853] hover:text-black font-bold text-xs tracking-wide transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Ticket size={13} />
                    <span>Book A Ticket</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <Bookmark size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No saved movies yet</p>
            <p className="text-xs mt-1">Tap the bookmark icon on any movie to save it here</p>
          </div>
        )}
      </div>
    </div>
  );
}
