
let bookings = [
    {
        id: 1024,
        room: "Garden Deluxe Room",
        guest: "Aarav Sharma",
        status: "Confirmed"
    },
    {
        id: 1023,
        room: "Executive Suite",
        guest: "Ananya Verma",
        status: "Pending"
    },
    {
        id: 1022,
        room: "Premium Ocean Room",
        guest: "Rohan Singh",
        status: "Cancelled"
    }
];

// Save bookings in Local Storage
function saveBookings() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Load bookings from Local Storage
function loadBookings() {
    let savedBookings = localStorage.getItem("bookings");

    if (savedBookings != null) {
        bookings = JSON.parse(savedBookings);
    }

    updateSummary();
}

// View Booking
function viewBooking(button) {
    let booking = button.closest(".booking-item");
    alert(booking.innerText);
}

// Confirm Booking
function confirmBooking(button) {
    let bookingElement = button.closest(".booking-item");
    let bookingId = bookingElement.querySelector("h3").innerText;

    for (let i = 0; i < bookings.length; i++) {
        if (bookingId.includes(bookings[i].id)) {
            bookings[i].status = "Confirmed";
        }
    }

    let status = bookingElement.querySelector(".booking-status");
    status.innerText = "Confirmed";
    status.className = "booking-status confirmed";

    saveBookings();
    updateSummary();

    alert("Booking Confirmed Successfully!");
}

// Cancel Booking
function cancelBooking(button) {
    let answer = confirm("Are you sure you want to cancel this booking?");

    if (answer == true) {
        let bookingElement = button.closest(".booking-item");
        let bookingId = bookingElement.querySelector("h3").innerText;

        for (let i = 0; i < bookings.length; i++) {
            if (bookingId.includes(bookings[i].id)) {
                bookings[i].status = "Cancelled";
            }
        }

        let status = bookingElement.querySelector(".booking-status");
        status.innerText = "Cancelled";
        status.className = "booking-status cancelled";

        saveBookings();
        updateSummary();

        alert("Booking Cancelled Successfully!");
    }
}

// Update Summary
function updateSummary() {
    let total = bookings.length;
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

    document.getElementById("total-bookings").innerText = total;
    document.getElementById("pending-bookings").innerText = pending;
    document.getElementById("confirmed-bookings").innerText = confirmed;
    document.getElementById("cancelled-bookings").innerText = cancelled;
}

// Run when page opens
loadBookings();
