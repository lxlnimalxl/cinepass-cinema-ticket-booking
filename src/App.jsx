import React, { useState, useEffect } from 'react';
import MobileShell from './components/layout/MobileShell';
import NavigationDrawer from './components/layout/NavigationDrawer';
import MovieFeed from './components/movies/MovieFeed';
import MovieDetailPage from './components/movies/MovieDetailPage';
import SeatBookingView from './components/booking/SeatBookingView';
import TicketConfirmationView from './components/booking/TicketConfirmationView';
import SavedWatchlistView from './components/saved/SavedWatchlistView';
import NotificationsView from './components/notifications/NotificationsView';
import SettingsView from './components/settings/SettingsView';
import { api } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // home | movie-detail | booking | ticket-pass | saved | notifications | settings
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Show brief toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Load initial data
  useEffect(() => {
    async function initData() {
      try {
        const fetchedMovies = await api.getMovies();
        setMovies(fetchedMovies);
        const defaultMovie = fetchedMovies.find(m => m.slug === 'tenet') || fetchedMovies[0];
        setSelectedMovie(defaultMovie);

        const fetchedNotifs = await api.getNotifications();
        setNotifications(fetchedNotifs);

        const fetchedBookings = await api.getBookings();
        setBookingsList(fetchedBookings);
        if (fetchedBookings.length > 0) {
          setCurrentBooking(fetchedBookings[0]);
        }
      } catch (err) {
        console.error('Data initialization failed:', err);
      }
    }
    initData();
  }, []);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setCurrentTab('movie-detail');
  };

  const handleToggleSave = async (movieId) => {
    const res = await api.toggleSaveMovie(movieId);
    setMovies(prev => prev.map(m => m.id === movieId ? { ...m, is_saved: res.is_saved } : m));
    if (selectedMovie && selectedMovie.id === movieId) {
      setSelectedMovie(prev => ({ ...prev, is_saved: res.is_saved }));
    }
    showToast(res.is_saved ? 'Added to Saved Watchlist' : 'Removed from Saved');
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      const created = await api.createBooking(bookingData);
      setCurrentBooking(created);
      setBookingsList(prev => [created, ...prev]);
      setCurrentTab('ticket-pass');
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  const handleMarkNotificationRead = async (notifId) => {
    await api.markNotificationRead(notifId);
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, is_read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const savedMovies = movies.filter(m => m.is_saved);

  return (
    <div className="relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#00C853] text-black font-extrabold text-xs tracking-wide shadow-2xl flex items-center space-x-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3D Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tabId) => {
          if (tabId === 'tickets') {
            if (bookingsList.length > 0) {
              setCurrentBooking(bookingsList[0]);
              setCurrentTab('ticket-pass');
            } else {
              showToast('No active tickets yet');
            }
          } else if (tabId === 'logout') {
            showToast('Signed out of Jackob session');
          } else {
            setCurrentTab(tabId);
          }
        }}
        bookedCount={bookingsList.length}
      />

      {/* Mobile / Desktop Outer Shell */}
      <MobileShell
        onOpenDrawer={() => setIsDrawerOpen(true)}
        unreadCount={unreadCount}
        onOpenNotifications={() => setCurrentTab('notifications')}
        currentTab={currentTab}
      >
        {/* Screen 1: Movie Feed (Film 1 / Film 2) */}
        {currentTab === 'home' && (
          <MovieFeed
            movies={movies}
            onSelectMovie={handleSelectMovie}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            onOpenNotifications={() => setCurrentTab('notifications')}
            unreadCount={unreadCount}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* Screen 2: Movie Detail Page (Details 2 - Tenet) */}
        {currentTab === 'movie-detail' && (
          <MovieDetailPage
            movie={selectedMovie}
            onBack={() => setCurrentTab('home')}
            onBookTickets={() => setCurrentTab('booking')}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* Screen 3: Seat Selection Matrix (Ticket) */}
        {currentTab === 'booking' && (
          <SeatBookingView
            movie={selectedMovie}
            onBack={() => setCurrentTab('movie-detail')}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {/* Screen 4: Confirmed Mobile Boarding Pass (Ticket Confirmation) */}
        {currentTab === 'ticket-pass' && (
          <TicketConfirmationView
            booking={currentBooking}
            onGoHome={() => setCurrentTab('home')}
          />
        )}

        {/* Screen 5: Saved Watchlist (iPhone 11 Pro / X - 72) */}
        {currentTab === 'saved' && (
          <SavedWatchlistView
            savedMovies={savedMovies}
            onSelectMovie={handleSelectMovie}
            onRemoveSaved={handleToggleSave}
            onBack={() => setCurrentTab('home')}
          />
        )}

        {/* Screen 6: Notifications & Promos (iPhone 11 Pro / X - 74) */}
        {currentTab === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkRead={handleMarkNotificationRead}
            onBack={() => setCurrentTab('home')}
            onBookTicket={() => {
              setSelectedMovie(movies.find(m => m.slug === 'fight-club') || movies[0]);
              setCurrentTab('booking');
            }}
          />
        )}

        {/* Screen 7: Settings (iPhone 11 Pro / X - 68) */}
        {currentTab === 'settings' && (
          <SettingsView
            onBack={() => setCurrentTab('home')}
            onOpenTickets={() => {
              if (bookingsList.length > 0) {
                setCurrentBooking(bookingsList[0]);
                setCurrentTab('ticket-pass');
              } else {
                showToast('No active tickets yet');
              }
            }}
            onLogout={() => showToast('Signed out of Jackob session')}
          />
        )}
      </MobileShell>
    </div>
  );
}
