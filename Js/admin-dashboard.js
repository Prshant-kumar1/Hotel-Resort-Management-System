
// Booking Details
let bookings = [
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

// Variables for counting bookings
let total = bookings.length;
let pending = 0;
let confirmed = 0;
let cancelled = 0;

// Count booking statuses
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

// Display booking counts
document.getElementById("total-bookings").innerText = total;
document.getElementById("pending-bookings").innerText = pending;
document.getElementById("confirmed-bookings").innerText = confirmed;
document.getElementById("cancelled-bookings").innerText = cancelled;

// Display recent bookings
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
