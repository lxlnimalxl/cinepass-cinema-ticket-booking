import lionKingHero from '../assets/images/lion-king-hero.png';
import tenetBanner from '../assets/images/tenet-banner.png';
import jackobAvatar from '../assets/images/jackob-avatar.png';
import directorNolan from '../assets/images/director-nolan.png';
import cast1 from '../assets/images/cast-1.png';
import cast2 from '../assets/images/cast-2.png';
import cast3 from '../assets/images/cast-3.png';
import cast4 from '../assets/images/cast-4.png';
import cast5 from '../assets/images/cast-5.png';
import savedLionKing from '../assets/images/saved-lion-king.png';
import savedPulpFiction from '../assets/images/saved-pulp-fiction.png';
import savedSoul from '../assets/images/saved-soul.png';
import savedInception from '../assets/images/saved-inception.png';
import savedFightClub from '../assets/images/saved-fight-club.png';
import notifDeadpool from '../assets/images/notif-deadpool.png';
import notifCherry from '../assets/images/notif-cherry.png';
import notifNoTimeToDie from '../assets/images/notif-no-time-to-die.png';
import notifHorizonLine from '../assets/images/notif-horizon-line.png';
import figmaCover from '../assets/images/figma-cover.png';

const API_BASE = 'http://127.0.0.1:8000/api';

// Image mapper helper
export const imageAssets = {
  'lion-king-hero.png': lionKingHero,
  'tenet-banner.png': tenetBanner,
  'jackob-avatar.png': jackobAvatar,
  'director-nolan.png': directorNolan,
  'cast-1.png': cast1,
  'cast-2.png': cast2,
  'cast-3.png': cast3,
  'cast-4.png': cast4,
  'cast-5.png': cast5,
  'saved-lion-king.png': savedLionKing,
  'saved-pulp-fiction.png': savedPulpFiction,
  'saved-soul.png': savedSoul,
  'saved-inception.png': savedInception,
  'saved-fight-club.png': savedFightClub,
  'notif-deadpool.png': notifDeadpool,
  'notif-cherry.png': notifCherry,
  'notif-no-time-to-die.png': notifNoTimeToDie,
  'notif-horizon-line.png': notifHorizonLine,
  'figma-cover.png': figmaCover,
};

export const resolveImage = (name, fallback = tenetBanner) => {
  if (!name) return fallback;
  if (name.startsWith('http://') || name.startsWith('https://') || name.startsWith('data:')) {
    return name;
  }
  return imageAssets[name] || fallback;
};

// Initial Mock Movies for offline / GitHub Pages deployment
const INITIAL_MOVIES = [
  {
    id: 1,
    title: "Tenet",
    slug: "tenet",
    director: "Christopher Nolan",
    director_role: "Director",
    genres: "Action, Sci-Fi, Thriller",
    duration_minutes: 127,
    views_count: "1.08 M",
    age_rating: "13+",
    imdb_rating: 7.5,
    description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time. Not time travel. Inversion.",
    synopsis: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery. In Africa, the lion cub Simba is the pride and joy of his parents King Mufasa and Queen Sarabi. Mufasa prepares Simba to be the next king of the jungle. However, the naive Simba believes in his envious uncle Scar that wants to kill Mufasa and Simba to become the next king. He lures Simba and his friend Nala to go to a forbidden place and they are attacked by hyenas but they are rescued by Mufasa. Then Scar plots another scheme to kill Mufasa and Simba but the cub escapes alive and leaves the kingdom believing he was responsible for the death of his father.",
    poster_image: "tenet-banner.png",
    banner_image: "tenet-banner.png",
    trailer_url: "https://www.youtube.com/embed/LdOM0x0WVQc",
    ticket_price: 24.00,
    featured: true,
    is_saved: true,
    cast: [
      { id: 1, name: "Christopher Nolan", character_name: "Director", avatar_image: "director-nolan.png" },
      { id: 2, name: "John David Washington", character_name: "The Protagonist", avatar_image: "cast-1.png" },
      { id: 3, name: "Robert Pattinson", character_name: "Neil", avatar_image: "cast-2.png" },
      { id: 4, name: "Elizabeth Debicki", character_name: "Kat", avatar_image: "cast-3.png" },
      { id: 5, name: "Kenneth Branagh", character_name: "Andrei Sator", avatar_image: "cast-4.png" },
      { id: 6, name: "Michael Caine", character_name: "Michael Crosby", avatar_image: "cast-5.png" },
    ],
    reviews: [
      { id: 1, author_name: "Sarah Bilanmarn", rating: 9.1, time_ago: "28 Min ago", comment: "Want to learn how to speak English faster? Your best bet is to learn the most common English words that you can use throughout.", avatar_image: "cast-1.png" },
      { id: 2, author_name: "Josh Nova", rating: 8.3, time_ago: "28 Min ago", comment: "Then Scar plots another scheme to kill Mufasa and Simba but the cub escapes alive and leaves.", avatar_image: "cast-2.png" },
      { id: 3, author_name: "Rihana Mizabet", rating: 7.4, time_ago: "41 Min ago", comment: "Mufasa prepares Simba to be the next king of the jungle.", avatar_image: "cast-3.png" },
    ],
    showtimes: [
      { id: 101, hall_name: "IMAX Laser Cinema Hall 1", date_day: "21", date_month: "OCT", date_weekday: "Wed", time_str: "14:00", is_active: false },
      { id: 102, hall_name: "IMAX Laser Cinema Hall 1", date_day: "22", date_month: "OCT", date_weekday: "Thu", time_str: "16:30", is_active: false },
      { id: 103, hall_name: "IMAX Laser Cinema Hall 1", date_day: "23", date_month: "OCT", date_weekday: "Fri", time_str: "18:30", is_active: false },
      { id: 104, hall_name: "IMAX Laser Cinema Hall 1", date_day: "24", date_month: "OCT", date_weekday: "Sat", time_str: "18:30", is_active: true },
      { id: 105, hall_name: "IMAX Laser Cinema Hall 1", date_day: "25", date_month: "OCT", date_weekday: "Sun", time_str: "21:00", is_active: false },
      { id: 106, hall_name: "IMAX Laser Cinema Hall 1", date_day: "26", date_month: "OCT", date_weekday: "Mon", time_str: "23:00", is_active: false },
      { id: 107, hall_name: "IMAX Laser Cinema Hall 1", date_day: "27", date_month: "OCT", date_weekday: "Tue", time_str: "18:30", is_active: false },
    ]
  },
  {
    id: 2,
    title: "The Lion King",
    slug: "the-lion-king",
    director: "Jon Favreau",
    director_role: "Director",
    genres: "Animation, Adventure, Drama",
    duration_minutes: 127,
    views_count: "1.08 M",
    age_rating: "PG",
    imdb_rating: 8.7,
    description: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    synopsis: "Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny on the plains of Africa. But not everyone in the kingdom celebrates the new cub's arrival.",
    poster_image: "lion-king-hero.png",
    banner_image: "lion-king-hero.png",
    trailer_url: "https://www.youtube.com/embed/7TavVZMewpY",
    ticket_price: 22.00,
    featured: true,
    is_saved: true,
    cast: [
      { id: 1, name: "Donald Glover", character_name: "Simba", avatar_image: "cast-1.png" },
      { id: 2, name: "Beyoncé", character_name: "Nala", avatar_image: "cast-2.png" },
      { id: 3, name: "James Earl Jones", character_name: "Mufasa", avatar_image: "cast-3.png" },
      { id: 4, name: "Chiwetel Ejiofor", character_name: "Scar", avatar_image: "cast-4.png" },
    ],
    reviews: [
      { id: 1, author_name: "Jackob Henderson", rating: 9.0, time_ago: "1 hour ago", comment: "The visual CGI effects on the savanna landscapes are completely breathtaking.", avatar_image: "jackob-avatar.png" }
    ],
    showtimes: [
      { id: 201, hall_name: "Grand Dolby Atmos 3", date_day: "24", date_month: "OCT", date_weekday: "Sat", time_str: "16:30", is_active: true }
    ]
  },
  {
    id: 3,
    title: "Pulp Fiction",
    slug: "pulp-fiction",
    director: "Quentin Tarantino",
    director_role: "Director",
    genres: "Crime, Drama",
    duration_minutes: 123,
    views_count: "1.58 M",
    age_rating: "18+",
    imdb_rating: 8.9,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    synopsis: "Jules Winnfield and Vincent Vega are two hitmen out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace.",
    poster_image: "saved-pulp-fiction.png",
    banner_image: "saved-pulp-fiction.png",
    trailer_url: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    ticket_price: 25.00,
    featured: false,
    is_saved: true,
    cast: [],
    reviews: [],
    showtimes: []
  },
  {
    id: 4,
    title: "Soul",
    slug: "soul",
    director: "Pete Docter",
    director_role: "Director",
    genres: "Animation, Comedy, Fantasy",
    duration_minutes: 135,
    views_count: "1.23 M",
    age_rating: "PG",
    imdb_rating: 8.2,
    description: "After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife.",
    synopsis: "Joe is a middle-school band teacher whose life hasn't quite gone the way he expected. His true passion is jazz -- and he's good.",
    poster_image: "saved-soul.png",
    banner_image: "saved-soul.png",
    trailer_url: "https://www.youtube.com/embed/xOsLIiBStEs",
    ticket_price: 20.00,
    featured: false,
    is_saved: true,
    cast: [],
    reviews: [],
    showtimes: []
  },
  {
    id: 5,
    title: "Inception",
    slug: "inception",
    director: "Christopher Nolan",
    director_role: "Director",
    genres: "Action, Adventure, Sci-Fi",
    duration_minutes: 151,
    views_count: "1.79 M",
    age_rating: "13+",
    imdb_rating: 8.8,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    synopsis: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.",
    poster_image: "saved-inception.png",
    banner_image: "saved-inception.png",
    trailer_url: "https://www.youtube.com/embed/YoHD9XEInc0",
    ticket_price: 24.00,
    featured: false,
    is_saved: true,
    cast: [],
    reviews: [],
    showtimes: []
  },
  {
    id: 6,
    title: "Fight Club",
    slug: "fight-club",
    director: "David Fincher",
    director_role: "Director",
    genres: "Drama, Mystery, Thriller",
    duration_minutes: 140,
    views_count: "2.12 M",
    age_rating: "18+",
    imdb_rating: 8.8,
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    synopsis: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    poster_image: "saved-fight-club.png",
    banner_image: "saved-fight-club.png",
    trailer_url: "https://www.youtube.com/embed/qtRKDV93gk8",
    ticket_price: 22.00,
    featured: false,
    is_saved: true,
    cast: [],
    reviews: [],
    showtimes: []
  }
];

// Initial mock notifications
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "35% Discount For You",
    body: "You can buy tickets with 35% discount in our selected movie theaters.",
    category: "discount",
    time_label: "Limited Offer",
    image_thumb: "figma-cover.png",
    is_read: false
  },
  {
    id: 2,
    title: "25% Discount For You",
    body: "You can buy tickets with 25% discount in our selected movie theaters.",
    category: "discount",
    time_label: "Special Promo",
    image_thumb: "figma-cover.png",
    is_read: false
  },
  {
    id: 3,
    title: "Visit Your Saved Movies",
    body: "You have not seen your saved movies in a long time. check them out!",
    category: "saved",
    time_label: "Reminder",
    image_thumb: "saved-fight-club.png",
    is_read: true
  },
  {
    id: 4,
    title: "2hr Until Fight Club Began",
    body: "Angelika Film Center - Seats E 20, E 21",
    category: "reminder",
    time_label: "2hr Until Show",
    cinema_name: "Angelika Film Center",
    seats_info: "E 20, E 21",
    imdb_rating: "8.8",
    duration_label: "140 Min",
    image_thumb: "saved-fight-club.png",
    is_read: false
  },
  {
    id: 5,
    title: "2hr Until Deadpool Began",
    body: "Cinepolis - Seats B 17, B 18",
    category: "reminder",
    time_label: "2hr Until Show",
    cinema_name: "Cinepolis",
    seats_info: "B 17, B 18",
    imdb_rating: "6.9",
    duration_label: "102 Min",
    image_thumb: "notif-deadpool.png",
    is_read: false
  },
  {
    id: 6,
    title: "4hr Until Soul",
    body: "Cinema Village - Seats F 7, F 8",
    category: "reminder",
    time_label: "4hr Until Show",
    cinema_name: "Cinema Village",
    seats_info: "F 7, F 8",
    imdb_rating: "7.3",
    duration_label: "118 Min",
    image_thumb: "saved-soul.png",
    is_read: true
  },
  {
    id: 7,
    title: "4hr Until Cherry",
    body: "Film Forum - Seats F 11, F 12",
    category: "reminder",
    time_label: "4hr Until Show",
    cinema_name: "Film Forum",
    seats_info: "F 11, F 12",
    imdb_rating: "6.8",
    duration_label: "131 Min",
    image_thumb: "notif-cherry.png",
    is_read: true
  },
  {
    id: 8,
    title: "No Time To Die in Theaters",
    body: "No Time to Die was originally scheduled for release on 8 November 2019, but was delayed several times due.",
    category: "promo",
    time_label: "Now In Theaters",
    image_thumb: "notif-no-time-to-die.png",
    is_read: true
  },
  {
    id: 9,
    title: "7hr Until Horizon Line",
    body: "The Ziegfeld - Seats G 11, G 12",
    category: "reminder",
    time_label: "7hr Until Show",
    cinema_name: "The Ziegfeld",
    seats_info: "G 11, G 12",
    imdb_rating: "6.8",
    duration_label: "150 Min",
    image_thumb: "notif-horizon-line.png",
    is_read: true
  }
];

// Initial confirmed booking
const INITIAL_BOOKING = {
  id: 1,
  booking_code: "CP-88429-X",
  movie_title: "Tenet",
  movie_id: 1,
  showtime_id: 104,
  customer_name: "Jackob Henderson",
  customer_email: "jackob.cinema@apple.ios",
  seats: "E7, E8",
  seat_count: 2,
  total_price: 24.00,
  hall_name: "IMAX Laser Cinema Hall 1",
  cinema_location: "Angelika Film Center, New York",
  date_display: "Sat, 24 Oct 2026",
  time_display: "18:30",
  qr_payload: "CINEPASS:CP-88429-X:Tenet:E7,E8",
  status: "CONFIRMED",
  created_at: new Date().toISOString()
};

// Local storage caching for offline state persistence
const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(`cinepass_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(`cinepass_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
};

// Local reactive storage
let localMovies = loadFromStorage('movies', INITIAL_MOVIES);
let localNotifications = loadFromStorage('notifications', INITIAL_NOTIFICATIONS);
let localBookings = loadFromStorage('bookings', [INITIAL_BOOKING]);

export const api = {
  async getMovies(params = {}) {
    try {
      const url = new URL(`${API_BASE}/movies/`);
      if (params.saved) url.searchParams.set('saved', params.saved);
      if (params.search) url.searchParams.set('search', params.search);
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // fallback
    }

    let list = [...localMovies];
    if (params.saved === 'true') {
      list = list.filter(m => m.is_saved);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(m => m.title.toLowerCase().includes(q) || m.genres.toLowerCase().includes(q));
    }
    return list;
  },

  async getMovieDetail(id) {
    try {
      const res = await fetch(`${API_BASE}/movies/${id}/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    const movie = localMovies.find(m => m.id === Number(id)) || localMovies[0];
    return movie;
  },

  async toggleSaveMovie(id) {
    try {
      const res = await fetch(`${API_BASE}/movies/${id}/toggle-save/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }

    localMovies = localMovies.map(m => {
      if (m.id === Number(id)) {
        return { ...m, is_saved: !m.is_saved };
      }
      return m;
    });
    saveToStorage('movies', localMovies);
    const updated = localMovies.find(m => m.id === Number(id));
    return { id: updated.id, is_saved: updated.is_saved };
  },

  async getShowtimeSeats(showtimeId) {
    try {
      const res = await fetch(`${API_BASE}/showtimes/${showtimeId}/seats/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }

    // Generate standard 9x10 matrix (Rows A-I, 1-10)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const bookedCoords = new Set([
      'B3', 'B4', 'C7', 'C8', 'D1', 'D2', 'D5', 'D6',
      'F4', 'F5', 'G8', 'G9', 'H2', 'H3', 'H7'
    ]);
    const vipRows = new Set(['G', 'H', 'I']);

    const seats = [];
    rows.forEach(r => {
      for (let c = 1; c <= 10; c++) {
        const code = `${r}${c}`;
        seats.push({
          id: `${showtimeId}_${code}`,
          row_label: r,
          seat_number: c,
          seat_type: vipRows.has(r) ? 'vip' : 'standard',
          is_booked: bookedCoords.has(code)
        });
      }
    });

    return {
      showtime_id: showtimeId,
      movie_title: "Tenet",
      date: "Sat 24 OCT",
      time: "18:30",
      hall: "IMAX Laser Cinema Hall 1",
      seats
    };
  },

  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_BASE}/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const data = await res.json();
        localBookings.unshift(data);
        saveToStorage('bookings', localBookings);
        return data;
      }
    } catch {
      // fallback
    }

    const bookingCode = `CP-${Math.random().toString(36).substring(2, 8).toUpperCase()}-X`;
    const newBooking = {
      id: Date.now(),
      booking_code: bookingCode,
      movie_title: bookingData.movie_title || "Tenet",
      movie_id: bookingData.movie_id || 1,
      customer_name: bookingData.customer_name || "Jackob Henderson",
      customer_email: bookingData.customer_email || "jackob.cinema@apple.ios",
      seats: bookingData.seats || "E7",
      seat_count: bookingData.seat_count || 1,
      total_price: bookingData.total_price || 24.00,
      hall_name: bookingData.hall_name || "IMAX Laser Cinema Hall 1",
      cinema_location: "Angelika Film Center, New York",
      date_display: bookingData.date_display || "Sat, 24 Oct 2026",
      time_display: bookingData.time_display || "18:30",
      qr_payload: `CINEPASS:${bookingCode}:${bookingData.movie_title || "Tenet"}:${bookingData.seats}`,
      status: "CONFIRMED",
      created_at: new Date().toISOString()
    };

    localBookings.unshift(newBooking);
    saveToStorage('bookings', localBookings);
    return newBooking;
  },

  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE}/notifications/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    return localNotifications;
  },

  async markNotificationRead(id) {
    try {
      await fetch(`${API_BASE}/notifications/${id}/read/`, { method: 'POST', signal: AbortSignal.timeout(1500) });
    } catch {
      // fallback
    }
    localNotifications = localNotifications.map(n => n.id === id ? { ...n, is_read: true } : n);
    saveToStorage('notifications', localNotifications);
    return { status: 'success' };
  },

  async getBookings() {
    return localBookings;
  }
};
