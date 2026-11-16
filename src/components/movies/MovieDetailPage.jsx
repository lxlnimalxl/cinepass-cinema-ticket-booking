import React, { useState } from 'react';
import { ChevronLeft, Bookmark, Play, Star, Clock, Eye, ShieldAlert, Share2, MessageSquare, X } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function MovieDetailPage({
  movie,
  onBack,
  onBookTickets,
  onToggleSave
}) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  if (!movie) return null;

  return (
    <div className="relative min-h-[750px] pb-24 text-gray-100 bg-[#0d0e12]">
      {/* Video Modal */}
      {isPlayingTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsPlayingTrailer(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <iframe
              src={movie.trailer_url || "https://www.youtube.com/embed/LdOM0x0WVQc"}
              title={`${movie.title} Official Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
          <p className="mt-4 text-sm text-gray-400 font-medium">Click outside or X to close</p>
        </div>
      )}

      {/* Top Header / Video Trailer Backdrop */}
      <div className="relative w-full h-[280px]">
        <img
          src={resolveImage(movie.banner_image || movie.poster_image)}
          alt={movie.title}
          className="w-full h-full object-cover object-top"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        {/* Navigation Bar Top Icons */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all active:scale-95"
            aria-label="Back to movie feed"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleSave(movie.id)}
              className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center transition-all active:scale-95 ${
                movie.is_saved
                  ? 'bg-[#00C853] text-black shadow-lg shadow-[#00C853]/30'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
              aria-label="Save to Watchlist"
            >
              <Bookmark size={18} className={movie.is_saved ? 'fill-black' : ''} />
            </button>
          </div>
        </div>

        {/* Play Trailer Floating Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={() => setIsPlayingTrailer(true)}
            className="w-16 h-16 rounded-full bg-[#00C853]/90 hover:bg-[#00C853] text-black flex items-center justify-center shadow-xl shadow-[#00C853]/40 transition-all hover:scale-110 active:scale-95 group"
            aria-label="Play Trailer"
          >
            <Play size={24} className="fill-black translate-x-0.5" />
          </button>
        </div>

        {/* Director Badge (Figma Details 2 Header) */}
        <div className="absolute -bottom-6 left-6 z-20 flex items-center space-x-3 bg-[#181920]/90 backdrop-blur-md border border-white/10 py-1.5 px-3.5 rounded-full shadow-lg">
          <img
            src={resolveImage('director-nolan.png')}
            alt={movie.director}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-white/30"
          />
          <div>
            <span className="text-xs font-bold text-white block">{movie.director}</span>
            <span className="text-[10px] text-gray-400 font-medium">Director</span>
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="px-6 pt-10">
        {/* Title & Rating */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{movie.title}</h1>
            <p className="text-xs text-gray-400 mt-1 font-medium">{movie.genres}</p>
          </div>
          <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
            <Star size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-xs font-bold text-[#F59E0B]">IMDB {movie.imdb_rating}</span>
          </div>
        </div>

        {/* Stats Row (Time, Views, P-G) as in Figma */}
        <div className="grid grid-cols-3 gap-3 mt-6 p-4 rounded-2xl bg-[#16171d] border border-white/5 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[11px] text-gray-400 font-medium mb-1">Time</span>
            <span className="text-base font-extrabold text-white">{movie.duration_minutes} Min</span>
          </div>
          <div className="flex flex-col items-center justify-center border-x border-white/10">
            <span className="text-[11px] text-gray-400 font-medium mb-1">Views</span>
            <span className="text-base font-extrabold text-white">{movie.views_count}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[11px] text-gray-400 font-medium mb-1">P-G</span>
            <span className="text-base font-extrabold text-white">{movie.age_rating}</span>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">Cast & Actors</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-bold">+7</span>
          </div>
          <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar pb-2">
            {movie.cast && movie.cast.length > 0 ? (
              movie.cast.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center shrink-0 text-center w-16">
                  <img
                    src={resolveImage(actor.avatar_image)}
                    alt={actor.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 shadow-md mb-1.5"
                  />
                  <span className="text-[11px] font-semibold text-white truncate w-full">{actor.name}</span>
                  <span className="text-[9px] text-gray-400 truncate w-full">{actor.character_name}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span>Featured Hollywood ensemble cast</span>
              </div>
            )}
          </div>
        </div>

        {/* Description / Synopsis Section */}
        <div className="mt-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">Description</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            {showFullSynopsis ? (movie.synopsis || movie.description) : (movie.description || movie.synopsis)}
          </p>
          {(movie.synopsis && movie.synopsis !== movie.description) && (
            <button
              onClick={() => setShowFullSynopsis(!showFullSynopsis)}
              className="text-xs text-[#00C853] font-bold mt-1.5 hover:underline"
            >
              {showFullSynopsis ? 'Show less' : 'Read full synopsis...'}
            </button>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">Reviews & Ratings</h3>
            <span className="text-xs text-gray-400">{movie.reviews ? movie.reviews.length : 0} reviews</span>
          </div>

          <div className="space-y-3">
            {movie.reviews && movie.reviews.map((rev) => (
              <div key={rev.id} className="p-3.5 rounded-2xl bg-[#16171d] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={resolveImage(rev.avatar_image)}
                      alt={rev.author_name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.author_name}</h4>
                      <p className="text-[10px] text-gray-400">{rev.time_ago}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-[#00C853]/15 text-[#00C853] text-xs font-bold">
                    <Star size={11} className="fill-[#00C853]" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-normal">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar (Confirm 24$) */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-4 bg-[#0d0e12]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-between max-w-[400px] mx-auto sm:max-w-none">
        <div>
          <span className="text-[11px] text-gray-400 block font-medium">Standard Admission</span>
          <span className="text-2xl font-extrabold text-white">${movie.ticket_price}</span>
        </div>
        <button
          onClick={onBookTickets}
          className="py-3 px-8 rounded-2xl bg-[#00C853] hover:bg-[#00b54b] active:scale-95 text-black font-extrabold text-sm tracking-wide shadow-xl shadow-[#00C853]/30 transition-all flex items-center space-x-2"
        >
          <span>Confirm ${movie.ticket_price}</span>
        </button>
      </div>
    </div>
  );
}
