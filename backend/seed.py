import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Movie, CastMember, Review, Showtime, Seat, Booking, NotificationItem

def run():
    print("Flushing and seeding database...")
    Booking.objects.all().delete()
    Seat.objects.all().delete()
    Showtime.objects.all().delete()
    Review.objects.all().delete()
    CastMember.objects.all().delete()
    Movie.objects.all().delete()
    NotificationItem.objects.all().delete()

    # 1. Tenet
    tenet = Movie.objects.create(
        title="Tenet",
        slug="tenet",
        director="Christopher Nolan",
        director_role="Director",
        genres="Action, Sci-Fi, Thriller",
        duration_minutes=127,
        views_count="1.08 M",
        age_rating="13+",
        imdb_rating=7.5,
        description=(
            "Armed with only one word, Tenet, and fighting for the survival of the entire world, "
            "a Protagonist journeys through a twilight world of international espionage on a mission "
            "that will unfold in something beyond real time. Not time travel. Inversion."
        ),
        synopsis=(
            "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery. "
            "In Africa, the lion cub Simba is the pride and joy of his parents King Mufasa and Queen Sarabi. Mufasa prepares Simba to be the next king of the jungle. "
            "However, the naive Simba believes in his envious uncle Scar that wants to kill Mufasa and Simba to become the next king. "
            "He lures Simba and his friend Nala to go to a forbidden place and they are attacked by hyenas but they are rescued by Mufasa. "
            "Then Scar plots another scheme to kill Mufasa and Simba but the cub escapes alive and leaves the kingdom believing he was responsible for the death of his father."
        ),
        poster_image="tenet-banner.png",
        banner_image="tenet-banner.png",
        trailer_url="https://www.youtube.com/watch?v=LdOM0x0WVQc",
        ticket_price=24.00,
        featured=True,
        is_saved=True
    )

    # Cast for Tenet
    cast_data = [
        ("Christopher Nolan", "Director", "director-nolan.png", 0),
        ("John David Washington", "The Protagonist", "cast-1.png", 1),
        ("Robert Pattinson", "Neil", "cast-2.png", 2),
        ("Elizabeth Debicki", "Kat", "cast-3.png", 3),
        ("Kenneth Branagh", "Andrei Sator", "cast-4.png", 4),
        ("Michael Caine", "Michael Crosby", "cast-5.png", 5),
    ]
    for name, char, avatar, order in cast_data:
        CastMember.objects.create(
            movie=tenet,
            name=name,
            character_name=char,
            avatar_image=avatar,
            order=order
        )

    # Reviews for Tenet (exact Figma texts)
    reviews_data = [
        ("Sarah Bilanmarn", 9.1, "28 Min ago", "Want to learn how to speak English faster? Your best bet is to learn the most common English words that you can use throughout.", "cast-1.png"),
        ("Josh Nova", 8.3, "28 Min ago", "Then Scar plots another scheme to kill Mufasa and Simba but the cub escapes alive and leaves.", "cast-2.png"),
        ("Rihana Mizabet", 7.4, "41 Min ago", "Mufasa prepares Simba to be the next king of the jungle.", "cast-3.png"),
    ]
    for author, rating, time_ago, comment, avatar in reviews_data:
        Review.objects.create(
            movie=tenet,
            author_name=author,
            rating=rating,
            time_ago=time_ago,
            comment=comment,
            avatar_image=avatar
        )

    # 2. The Lion King
    lion_king = Movie.objects.create(
        title="The Lion King",
        slug="the-lion-king",
        director="Jon Favreau",
        director_role="Director",
        genres="Animation, Adventure, Drama",
        duration_minutes=127,
        views_count="1.08 M",
        age_rating="PG",
        imdb_rating=8.7,
        description="After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
        synopsis="Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny on the plains of Africa. But not everyone in the kingdom celebrates the new cub's arrival.",
        poster_image="lion-king-hero.png",
        banner_image="lion-king-hero.png",
        ticket_price=22.00,
        featured=True,
        is_saved=True
    )

    # 3. Pulp Fiction
    pulp_fiction = Movie.objects.create(
        title="Pulp Fiction",
        slug="pulp-fiction",
        director="Quentin Tarantino",
        director_role="Director",
        genres="Crime, Drama",
        duration_minutes=123,
        views_count="1.58 M",
        age_rating="18+",
        imdb_rating=8.9,
        description="The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster_image="saved-pulp-fiction.png",
        banner_image="saved-pulp-fiction.png",
        ticket_price=25.00,
        featured=False,
        is_saved=True
    )

    # 4. Soul
    soul = Movie.objects.create(
        title="Soul",
        slug="soul",
        director="Pete Docter",
        director_role="Director",
        genres="Animation, Comedy, Fantasy",
        duration_minutes=135,
        views_count="1.23 M",
        age_rating="PG",
        imdb_rating=8.2,
        description="After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife.",
        poster_image="saved-soul.png",
        banner_image="saved-soul.png",
        ticket_price=20.00,
        featured=False,
        is_saved=True
    )

    # 5. Inception
    inception = Movie.objects.create(
        title="Inception",
        slug="inception",
        director="Christopher Nolan",
        director_role="Director",
        genres="Action, Adventure, Sci-Fi",
        duration_minutes=151,
        views_count="1.79 M",
        age_rating="13+",
        imdb_rating=8.8,
        description="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        poster_image="saved-inception.png",
        banner_image="saved-inception.png",
        ticket_price=24.00,
        featured=False,
        is_saved=True
    )

    # 6. Fight Club
    fight_club = Movie.objects.create(
        title="Fight Club",
        slug="fight-club",
        director="David Fincher",
        director_role="Director",
        genres="Drama, Mystery, Thriller",
        duration_minutes=140,
        views_count="2.12 M",
        age_rating="18+",
        imdb_rating=8.8,
        description="An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        poster_image="saved-fight-club.png",
        banner_image="saved-fight-club.png",
        ticket_price=22.00,
        featured=False,
        is_saved=True
    )

    # Showtimes for Tenet
    showtimes = [
        ("Wed", "21", "OCT", "14:00", False),
        ("Thu", "22", "OCT", "16:30", False),
        ("Fri", "23", "OCT", "18:30", False),
        ("Sat", "24", "OCT", "18:30", True), # Active in Figma
        ("Sun", "25", "OCT", "21:00", False),
        ("Mon", "26", "OCT", "23:00", False),
        ("Tue", "27", "OCT", "18:30", False),
    ]

    primary_showtime = None
    for weekday, day, month, time_str, is_act in showtimes:
        st = Showtime.objects.create(
            movie=tenet,
            hall_name="Dolby Cinema & IMAX Hall 1",
            date_day=day,
            date_month=month,
            date_weekday=weekday,
            time_str=time_str,
            is_active=is_act
        )
        if is_act:
            primary_showtime = st

    # Build 9x10 seat matrix for primary showtime (Rows A through I)
    rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    booked_coords = {
        ('B', 3), ('B', 4), ('C', 7), ('C', 8),
        ('D', 1), ('D', 2), ('D', 5), ('D', 6),
        ('F', 4), ('F', 5), ('G', 8), ('G', 9),
        ('H', 2), ('H', 3), ('H', 7)
    }

    vip_rows = {'G', 'H', 'I'}

    for r in rows:
        for c in range(1, 11):
            is_b = (r, c) in booked_coords
            s_type = 'vip' if r in vip_rows else 'standard'
            Seat.objects.create(
                showtime=primary_showtime,
                row_label=r,
                seat_number=c,
                seat_type=s_type,
                is_booked=is_b,
                booking_code="CP-PREBOOKED" if is_b else None
            )

    # Initial Booking
    Booking.objects.create(
        booking_code="CP-88429-X",
        movie=tenet,
        showtime=primary_showtime,
        customer_name="Jackob Henderson",
        customer_email="jackob.cinema@apple.ios",
        seats="E7, E8",
        seat_count=2,
        total_price=48.00,
        hall_name="IMAX Laser Cinema Hall 1",
        cinema_location="Angelika Film Center, New York",
        date_display="Sat, 24 Oct 2026",
        time_display="18:30",
        qr_payload="CINEPASS:CP-88429-X:Tenet:E7,E8",
        status="CONFIRMED"
    )

    # Notifications (exact Figma texts)
    notifs = [
        {
            "title": "35% Discount For You",
            "body": "You can buy tickets with 35% discount in our selected movie theaters.",
            "category": "discount",
            "time_label": "Limited Offer",
            "image_thumb": "figma-cover.png",
            "is_read": False
        },
        {
            "title": "25% Discount For You",
            "body": "You can buy tickets with 25% discount in our selected movie theaters.",
            "category": "discount",
            "time_label": "Special Promo",
            "image_thumb": "figma-cover.png",
            "is_read": False
        },
        {
            "title": "Visit Your Saved Movies",
            "body": "You have not seen your saved movies in a long time. check them out!",
            "category": "saved",
            "time_label": "Reminder",
            "image_thumb": "saved-fight-club.png",
            "is_read": True
        },
        {
            "title": "2hr Until Fight Club Began",
            "body": "Angelika Film Center - Seats E 20, E 21",
            "category": "reminder",
            "time_label": "2hr Until Show",
            "cinema_name": "Angelika Film Center",
            "seats_info": "E 20, E 21",
            "imdb_rating": "8.8",
            "duration_label": "140 Min",
            "image_thumb": "saved-fight-club.png",
            "is_read": False
        },
        {
            "title": "2hr Until Deadpool Began",
            "body": "Cinepolis - Seats B 17, B 18",
            "category": "reminder",
            "time_label": "2hr Until Show",
            "cinema_name": "Cinepolis",
            "seats_info": "B 17, B 18",
            "imdb_rating": "6.9",
            "duration_label": "102 Min",
            "image_thumb": "notif-deadpool.png",
            "is_read": False
        },
        {
            "title": "4hr Until Soul",
            "body": "Cinema Village - Seats F 7, F 8",
            "category": "reminder",
            "time_label": "4hr Until Show",
            "cinema_name": "Cinema Village",
            "seats_info": "F 7, F 8",
            "imdb_rating": "7.3",
            "duration_label": "118 Min",
            "image_thumb": "saved-soul.png",
            "is_read": True
        },
        {
            "title": "4hr Until Cherry",
            "body": "Film Forum - Seats F 11, F 12",
            "category": "reminder",
            "time_label": "4hr Until Show",
            "cinema_name": "Film Forum",
            "seats_info": "F 11, F 12",
            "imdb_rating": "6.8",
            "duration_label": "131 Min",
            "image_thumb": "notif-cherry.png",
            "is_read": True
        },
        {
            "title": "No Time To Die in Theaters",
            "body": "No Time to Die was originally scheduled for release on 8 November 2019, but was delayed several times due.",
            "category": "promo",
            "time_label": "Now In Theaters",
            "image_thumb": "notif-no-time-to-die.png",
            "is_read": True
        },
        {
            "title": "7hr Until Horizon Line",
            "body": "The Ziegfeld - Seats G 11, G 12",
            "category": "reminder",
            "time_label": "7hr Until Show",
            "cinema_name": "The Ziegfeld",
            "seats_info": "G 11, G 12",
            "imdb_rating": "6.8",
            "duration_label": "150 Min",
            "image_thumb": "notif-horizon-line.png",
            "is_read": True
        }
    ]

    for n in notifs:
        NotificationItem.objects.create(**n)

    print("Successfully seeded all database items!")

if __name__ == '__main__':
    run()
