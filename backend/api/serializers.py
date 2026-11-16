from rest_framework import serializers
from .models import Movie, CastMember, Review, Showtime, Seat, Booking, NotificationItem

class CastMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CastMember
        fields = ['id', 'name', 'character_name', 'avatar_image', 'order']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'author_name', 'avatar_image', 'rating', 'time_ago', 'comment', 'created_at']

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'row_label', 'seat_number', 'seat_type', 'is_booked']

class ShowtimeSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)
    
    class Meta:
        model = Showtime
        fields = ['id', 'hall_name', 'date_day', 'date_month', 'date_weekday', 'time_str', 'is_active', 'seats']

class MovieDetailSerializer(serializers.ModelSerializer):
    cast = CastMemberSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    showtimes = ShowtimeSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'slug', 'director', 'director_role', 'genres',
            'duration_minutes', 'views_count', 'age_rating', 'imdb_rating',
            'description', 'synopsis', 'poster_image', 'banner_image',
            'trailer_url', 'ticket_price', 'featured', 'is_saved',
            'cast', 'reviews', 'showtimes'
        ]

class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'slug', 'director', 'genres',
            'duration_minutes', 'views_count', 'age_rating',
            'imdb_rating', 'description', 'poster_image', 'banner_image',
            'ticket_price', 'featured', 'is_saved'
        ]

class BookingSerializer(serializers.ModelSerializer):
    movie_title = serializers.CharField(source='movie.title', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'booking_code', 'movie', 'movie_title', 'showtime',
            'customer_name', 'customer_email', 'seats', 'seat_count',
            'total_price', 'hall_name', 'cinema_location',
            'date_display', 'time_display', 'qr_payload', 'status', 'created_at'
        ]

class NotificationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationItem
        fields = [
            'id', 'title', 'body', 'category', 'time_label',
            'cinema_name', 'seats_info', 'imdb_rating',
            'duration_label', 'image_thumb', 'is_read', 'created_at'
        ]
