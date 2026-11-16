from django.db import models
import uuid

class Movie(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    director = models.CharField(max_length=150, default="Christopher Nolan")
    director_role = models.CharField(max_length=100, default="Director")
    genres = models.CharField(max_length=200, default="Action, Sci-Fi, Thriller")
    duration_minutes = models.IntegerField(default=127)
    views_count = models.CharField(max_length=50, default="1.08 M")
    age_rating = models.CharField(max_length=50, default="13+")
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1, default=7.5)
    description = models.TextField(blank=True)
    synopsis = models.TextField(blank=True)
    poster_image = models.CharField(max_length=255, blank=True)
    banner_image = models.CharField(max_length=255, blank=True)
    trailer_url = models.CharField(max_length=255, blank=True, default="https://www.youtube.com/watch?v=LdOM0x0WVQc")
    ticket_price = models.DecimalField(max_digits=6, decimal_places=2, default=24.00)
    featured = models.BooleanField(default=False)
    is_saved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class CastMember(models.Model):
    movie = models.ForeignKey(Movie, related_name='cast', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    character_name = models.CharField(max_length=150, blank=True)
    avatar_image = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.movie.title})"

class Review(models.Model):
    movie = models.ForeignKey(Movie, related_name='reviews', on_delete=models.CASCADE)
    author_name = models.CharField(max_length=150)
    avatar_image = models.CharField(max_length=255, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=8.5)
    time_ago = models.CharField(max_length=50, default="28 Min ago")
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author_name} - {self.movie.title} ({self.rating})"

class Showtime(models.Model):
    movie = models.ForeignKey(Movie, related_name='showtimes', on_delete=models.CASCADE)
    hall_name = models.CharField(max_length=100, default="IMAX Laser Cinema Hall 4")
    date_day = models.CharField(max_length=10, default="24")
    date_month = models.CharField(max_length=20, default="OCT")
    date_weekday = models.CharField(max_length=10, default="Sat")
    time_str = models.CharField(max_length=20, default="18:30")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.movie.title} - {self.date_weekday} {self.date_day} @ {self.time_str}"

class Seat(models.Model):
    SEAT_TYPES = (
        ('standard', 'Standard Seat'),
        ('vip', 'VIP Luxury Armchair'),
    )
    showtime = models.ForeignKey(Showtime, related_name='seats', on_delete=models.CASCADE, null=True, blank=True)
    row_label = models.CharField(max_length=5) # A to I
    seat_number = models.IntegerField() # 1 to 10
    seat_type = models.CharField(max_length=20, choices=SEAT_TYPES, default='standard')
    is_booked = models.BooleanField(default=False)
    booking_code = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        unique_together = ('showtime', 'row_label', 'seat_number')

    def __str__(self):
        return f"{self.row_label}{self.seat_number} ({self.seat_type})"

class Booking(models.Model):
    booking_code = models.CharField(max_length=32, unique=True, default=uuid.uuid4)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    showtime = models.ForeignKey(Showtime, on_delete=models.CASCADE, null=True, blank=True)
    customer_name = models.CharField(max_length=150, default="Jackob Henderson")
    customer_email = models.EmailField(default="jackob.cinema@apple.ios")
    seats = models.CharField(max_length=200) # e.g. "E7, E8"
    seat_count = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=8, decimal_places=2, default=24.00)
    hall_name = models.CharField(max_length=100, default="IMAX Laser Hall 4")
    cinema_location = models.CharField(max_length=200, default="Angelika Film Center, New York")
    date_display = models.CharField(max_length=50, default="Sat, 24 Oct 2026")
    time_display = models.CharField(max_length=50, default="18:30")
    qr_payload = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=50, default="CONFIRMED")
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.booking_code:
            self.booking_code = f"CP-{uuid.uuid4().hex[:8].upper()}"
        if not self.qr_payload:
            self.qr_payload = f"CINEPASS:{self.booking_code}:{self.movie.title}:{self.seats}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking {self.booking_code} - {self.movie.title}"

class NotificationItem(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    category = models.CharField(max_length=50, default="reminder") # discount, reminder, saved
    time_label = models.CharField(max_length=50, default="2hr Until Show")
    cinema_name = models.CharField(max_length=100, blank=True)
    seats_info = models.CharField(max_length=50, blank=True)
    imdb_rating = models.CharField(max_length=20, blank=True)
    duration_label = models.CharField(max_length=50, blank=True)
    image_thumb = models.CharField(max_length=255, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
