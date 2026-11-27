# Aurelia Bay Resort — Hotel & Resort Management System

A responsive, multi-page front-end prototype for a fictional resort on the Konkan coast. It presents rooms, resort information, and guest and admin workflows.

## Features

- Home, About, Contact, Rooms & Suites, Room Details, and Gallery pages
- Room-category and price filters
- Booking, login, registration, and My Bookings interfaces
- Admin login, dashboard, room management, and booking management interfaces
- Responsive layouts with locally stored photography
- Vanilla JavaScript for selected interactions and browser-side demo flows

## Project status

This is a front-end prototype, not a production booking system. It has no server, database, API, payment processing, or real authentication. Any demo data or browser storage is local to the visitor and is not shared with a hotel or other users.

## Tech stack

- HTML5 and CSS3
- Vanilla JavaScript
- Google Fonts: Fraunces and Work Sans
- Git and GitHub

## Project structure

The application source currently lives on the `dev` branch; the `main` branch contains this README. Switch to `dev` before running the site.

```
Hotel-Resort-Management-System/
├── index.html                 # Home
├── about.html
├── contact.html
├── rooms.html
├── room-detail.html
├── gallery.html
├── booking.html
├── login.html
├── register.html
├── my-bookings.html
├── admin-login.html
├── admin-dashboard.html
├── manage-rooms.html
├── manage-bookings.html
├── css/                       # Shared, rooms, booking, and admin styles
├── js/                        # Page interaction scripts
├── Js/                        # Additional shared/page scripts
├── gallery/                   # Resort and room photography, team images
└── images/                    # Room and admin imagery
```

## Run locally

There is no build step or package installation.

```bash
git clone https://github.com/Prshant-kumar1/Hotel-Resort-Management-System.git
cd Hotel-Resort-Management-System
git switch dev
python3 -m http.server 8000
```

Open <http://localhost:8000> in a browser. Alternatively, open `index.html` directly or use an editor's local-server extension. Keep the capitalization of paths such as `Js/` and `js/` unchanged; they are distinct on case-sensitive systems.

## Planned work

- Add a backend and database
- Implement secure guest and admin authentication
- Connect bookings, room availability, and admin tools to real data
