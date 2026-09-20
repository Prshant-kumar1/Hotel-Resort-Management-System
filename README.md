# Aurelia Bay Resort — Hotel & Resort Management System
 
B.Tech CSE 3rd Year Mini Project — GLA University, Mathura
Department of Computer Engineering Applications · Supervised by Mr. Deepak Prasad
 
## Overview
 
A centralized web platform for presenting hotel and resort information —
rooms & suites, amenities, gallery, offers — with static UI pages for
booking, login, registration, and admin management. Current phase
delivers a responsive, multi-page front-end with real photography;
backend and database integration are planned for later phases.
 
## Team
 
| Name | Roll No. | Owns |
|---|---|---|
| Prashant Kumar | 2415001151 | Home, About, Contact + shared `css/style.css` |
| Prashant Sharma | 2415001154 | Rooms Listing, Room Detail, Gallery + `css/rooms.css` |
| Prateek Mudgal | 2415001163 | Booking, Login, Register, My Bookings + `css/booking.css` |
| Priyanka Saraswat | 2415001200 | Admin Login, Admin Dashboard, Manage Rooms, Manage Bookings + `css/admin.css` |
 
## Current phase
 
Static, responsive front-end — HTML5 + CSS3 only, no JavaScript. No
backend logic, no database, no working authentication yet.
Booking/login/register/admin pages are UI mockups at this stage. The
contact page embeds a real Google Maps iframe (no API key needed for
the basic embed).
 
## Tech stack
 
- HTML5, CSS3
- Fonts: Fraunces (display) + Work Sans (body), loaded via Google Fonts
- Real photography for rooms, resort exteriors, and team headshots
- Git + GitHub for version control
## Project structure
 
*(as currently on `dev`)*
 
```
Hotel-Resort-Management-System/
├── index.html
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
├── css/
│   ├── style.css      ← shared: reset, variables, typography, header, footer, buttons, cards, forms
│   ├── rooms.css       ← rooms / room-detail / gallery layout only
│   ├── booking.css      ← booking / login / register / my-bookings layout only
│   └── admin.css         ← admin sidebar shell + stat cards
├── gallery/               ← room photography (bedroom + exterior shots per room type)
│                             + team headshots for About
├── images/
│   ├── rooms/              ← one hero image per room type, used on rooms.html
│   ├── admin-resort.jpg
│   └── admin-dashboard.jpg  ← currently a 0-byte file, see Known Issues
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
