
// Booking Data
let bookings = [];


// Load Dashboard
function loadDashboard() {

    // Load Room Data
    let savedRooms = localStorage.getItem("resortRooms");

    let rooms = [];

    if (savedRooms != null) {

        rooms = JSON.parse(savedRooms);

    } else {

        rooms = [
            { id: 1, status: "Available" },
            { id: 2, status: "Available" },
            { id: 3, status: "Booked" },
            { id: 4, status: "Available" },
            { id: 5, status: "Available" },
            { id: 6, status: "Booked" }
        ];

        localStorage.setItem("resortRooms", JSON.stringify(rooms));
    }


    // Calculate Room Details
    let totalRooms = rooms.length;
    let availableRooms = 0;
    let bookedRooms = 0;

    for (let i = 0; i < rooms.length; i++) {

        if (rooms[i].status == "Available") {
            availableRooms++;
        }
        else if (rooms[i].status == "Booked") {
            bookedRooms++;
        }
    }


    // Display Room Details
    document.getElementById("total-rooms").innerText = totalRooms;

    document.getElementById("available-rooms").innerText = availableRooms;

    document.getElementById("booked-rooms").innerText = bookedRooms;


    // Load Booking Data
    let savedBookings = localStorage.getItem("bookings");

    if (savedBookings != null) {

        bookings = JSON.parse(savedBookings);

    } else {

        bookings = [
            {
                id: 1024,
                room: "Garden Deluxe Room",
                status: "Confirmed"
            },
            {
                id: 1023,
                room: "Executive Suite",
                status: "Pending"
            },
            {
                id: 1022,
                room: "Premium Ocean Room",
                status: "Cancelled"
            }
        ];

        localStorage.setItem("bookings", JSON.stringify(bookings));
    }


    // Calculate Booking Details
    let totalBookings = bookings.length;
    let pending = 0;
    let confirmed = 0;
    let cancelled = 0;

    for (let i = 0; i < bookings.length; i++) {

        if (bookings[i].status == "Pending") {
            pending++;
        }
        else if (bookings[i].status == "Confirmed") {
            confirmed++;
        }
        else if (bookings[i].status == "Cancelled") {
            cancelled++;
        }
    }


    // Display Booking Details
    document.getElementById("total-bookings").innerText = totalBookings;

    document.getElementById("pending-bookings").innerText = pending;

    document.getElementById("confirmed-bookings").innerText = confirmed;

    document.getElementById("cancelled-bookings").innerText = cancelled;


    // Display Recent Bookings
    let recentBookings = document.getElementById("recent-bookings");

    recentBookings.innerHTML = "";

    for (let i = 0; i < bookings.length; i++) {

        let newBooking = document.createElement("p");

        newBooking.innerText =
            "Booking #" + bookings[i].id +
            " — " + bookings[i].room +
            " — " + bookings[i].status;

        recentBookings.appendChild(newBooking);
    }

}


// Run Dashboard
loadDashboard();
