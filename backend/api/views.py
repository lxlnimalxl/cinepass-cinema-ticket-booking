import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from .models import Movie, CastMember, Review, Showtime, Seat, Booking, NotificationItem
from .serializers import (
    MovieListSerializer, MovieDetailSerializer, BookingSerializer,
    ShowtimeSerializer, SeatSerializer, NotificationItemSerializer
)

class MovieListView(generics.ListCreateAPIView):
    serializer_class = MovieListSerializer

    def get_queryset(self):
        qs = Movie.objects.all().order_by('-featured', '-imdb_rating')
        saved_param = self.request.query_params.get('saved')
        if saved_param == 'true':
            qs = qs.filter(is_saved=True)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(title__icontains=search)
        return qs

class MovieDetailView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailSerializer
    lookup_field = 'id'

class ToggleSavedMovieView(APIView):
    def post(self, request, pk):
        movie = get_object_or_404(Movie, pk=pk)
        movie.is_saved = not movie.is_saved
        movie.save()
        return Response({
            'id': movie.id,
            'title': movie.title,
            'is_saved': movie.is_saved,
            'message': f"{movie.title} {'added to' if movie.is_saved else 'removed from'} saved watchlist"
        })

class ShowtimeListView(generics.ListAPIView):
    serializer_class = ShowtimeSerializer

    def get_queryset(self):
        movie_id = self.request.query_params.get('movie_id')
        if movie_id:
            return Showtime.objects.filter(movie_id=movie_id)
        return Showtime.objects.all()

class ShowtimeSeatsView(APIView):
    def get(self, request, showtime_id):
        showtime = get_object_or_404(Showtime, pk=showtime_id)
        seats = showtime.seats.all().order_by('row_label', 'seat_number')
        serializer = SeatSerializer(seats, many=True)
        return Response({
            'showtime_id': showtime.id,
            'movie_title': showtime.movie.title,
            'date': f"{showtime.date_weekday} {showtime.date_day} {showtime.date_month}",
            'time': showtime.time_str,
            'hall': showtime.hall_name,
            'seats': serializer.data
        })

class CreateBookingView(APIView):
    def post(self, request):
        movie_id = request.data.get('movie_id')
        showtime_id = request.data.get('showtime_id')
        seats_str = request.data.get('seats', '') # e.g. "E7, E8"
        customer_name = request.data.get('customer_name', 'Jackob Henderson')
        customer_email = request.data.get('customer_email', 'jackob.cinema@apple.ios')

        movie = get_object_or_404(Movie, pk=movie_id)
        showtime = Showtime.objects.filter(pk=showtime_id).first() if showtime_id else movie.showtimes.first()

        seat_list = [s.strip() for s in seats_str.split(',') if s.strip()]
        seat_count = max(len(seat_list), 1)
        total_price = float(movie.ticket_price) * seat_count

        booking_code = f"CP-{uuid.uuid4().hex[:6].upper()}-X"

        booking = Booking.objects.create(
            booking_code=booking_code,
            movie=movie,
            showtime=showtime,
            customer_name=customer_name,
            customer_email=customer_email,
            seats=', '.join(seat_list) if seat_list else 'E7',
            seat_count=seat_count,
            total_price=total_price,
            hall_name=showtime.hall_name if showtime else "IMAX Laser Hall 4",
            cinema_location="Angelika Film Center, New York",
            date_display=f"{showtime.date_weekday}, {showtime.date_day} {showtime.date_month} 2026" if showtime else "Sat, 24 Oct 2026",
            time_display=showtime.time_str if showtime else "18:30",
            qr_payload=f"CINEPASS:{booking_code}:{movie.title}:{seats_str}",
            status="CONFIRMED"
        )

        # Mark seats as booked
        if showtime:
            for s in seat_list:
                row = s[0]
                try:
                    num = int(s[1:])
                    seat = Seat.objects.filter(showtime=showtime, row_label=row, seat_number=num).first()
                    if seat:
                        seat.is_booked = True
                        seat.booking_code = booking_code
                        seat.save()
                except ValueError:
                    pass

        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class BookingDetailView(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = 'booking_code'

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationItemSerializer
    queryset = NotificationItem.objects.all().order_by('-created_at')

class MarkNotificationReadView(APIView):
    def post(self, request, pk):
        notif = get_object_or_404(NotificationItem, pk=pk)
        notif.is_read = True
        notif.save()
        return Response({'status': 'success', 'id': notif.id, 'is_read': notif.is_read})

class SystemOverviewView(APIView):
    def get(self, request):
        return Response({
            'system': 'CinePass iOS Cinema Booking API Engine',
            'version': '2.4.0-Production',
            'status': 'HEALTHY',
            'total_movies': Movie.objects.count(),
            'total_bookings': Booking.objects.count(),
            'featured_now': Movie.objects.filter(featured=True).values_list('title', flat=True),
        })
