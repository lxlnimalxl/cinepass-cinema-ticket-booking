from django.urls import path
from .views import (
    MovieListView, MovieDetailView, ToggleSavedMovieView,
    ShowtimeListView, ShowtimeSeatsView, CreateBookingView,
    BookingDetailView, NotificationListView, MarkNotificationReadView,
    SystemOverviewView
)

urlpatterns = [
    path('system/overview/', SystemOverviewView.as_view(), name='system-overview'),
    path('movies/', MovieListView.as_view(), name='movie-list'),
    path('movies/<int:id>/', MovieDetailView.as_view(), name='movie-detail'),
    path('movies/<int:pk>/toggle-save/', ToggleSavedMovieView.as_view(), name='movie-toggle-save'),
    path('showtimes/', ShowtimeListView.as_view(), name='showtime-list'),
    path('showtimes/<int:showtime_id>/seats/', ShowtimeSeatsView.as_view(), name='showtime-seats'),
    path('bookings/', CreateBookingView.as_view(), name='booking-create'),
    path('bookings/<str:booking_code>/', BookingDetailView.as_view(), name='booking-detail'),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/read/', MarkNotificationReadView.as_view(), name='notification-read'),
]
