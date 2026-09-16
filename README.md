# Hotel-Resort-Management-System

## Overview

A centralized web platform for presenting hotel and resort information —
rooms & suites, amenities, gallery, offers — with static UI pages for
booking, login, registration, and admin management. Current phase
delivers a responsive, multi-page front-end; backend and database
integration are planned for later phases.

## Team

| Name | Roll No. | Owns |
|---|---|---|
| Prashant Kumar | 2415001151 | Home, About, Contact + shared `css/style.css` |
| Prashant Sharma | 2415001154 | Rooms Listing, Room Detail, Gallery + `css/rooms.css` |
| Prateek Mudgal | 2415001163 | Booking, Login, Register, My Bookings + `css/booking.css` |
| Priyanka Saraswat | 2415001200 | Admin Login, Admin Dashboard, Manage Rooms, Manage Bookings + `css/admin.css` |

## Current phase

Static, responsive front-end — HTML5 + CSS3 only. No backend logic,
no database, no working authentication yet. Booking/login/register/admin
pages are UI mockups at this stage.

## Tech stack

- HTML5, CSS3 
- Fonts: Fraunces (display) + Work Sans (body), loaded via Google Fonts
- Git + GitHub for version control

## Project structure

```
hotel-resort-management/dev/
├── index.html                 ← Home
├── about.html                 ← About Us
├── contact.html                ← Contact Us
├── rooms.html                   ← Rooms Listing
├── room-detail.html              ← Room Detail
├── gallery.html                   ← Gallery
├── booking.html                    ← Booking
├── login.html                       ← Login
├── register.html                     ← Register
├── my-bookings.html                   ← My Bookings
├── admin-login.html                    ← Admin Login
├── admin-dashboard.html                 ← Admin Dashboard
├── manage-rooms.html                     ← Manage Rooms
├── manage-bookings.html                   ← Manage Bookings
├── css/
│   ├── style.css      ← shared: reset, variables, typography, header, footer, buttons, cards, forms
│   ├── rooms.css       ← rooms / room-detail / gallery layout only
│   ├── booking.css      ← booking / login / register / my-bookings layout only
│   └── admin.css         ← admin sidebar shell + stat cards
├── images/
│   ├── rooms/
│   ├── gallery/
│   └── icons/
├── README.md
```

## Running it

No build step. Open `index.html` in a browser, or use a local dev
server (e.g. VS Code's Live Server) for auto-reload while editing.

## Roadmap (future phases)

- Node.js / Express.js / MySQL backend
- Working authentication (guest + admin)
- Live booking logic and availability
- Admin dashboard wired to real data
- Real photography in `/images`
