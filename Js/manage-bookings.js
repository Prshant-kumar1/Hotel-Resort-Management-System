
// Function to View Booking
function viewBooking(button) {

    let booking = button.closest(".booking-item");

    let details = booking.innerText;

    alert(details);

}


// Function to Confirm Booking
function confirmBooking(button) {

    let booking = button.closest(".booking-item");

    let status = booking.querySelector(".booking-status");

    status.innerText = "Confirmed";

    status.className = "booking-status confirmed";

    alert("Booking Confirmed Successfully!");

    updateSummary();

}


// Function to Cancel Booking
function cancelBooking(button) {

    let answer = confirm("Are you sure you want to cancel this booking?");

    if (answer == true) {

        let booking = button.closest(".booking-item");

        let status = booking.querySelector(".booking-status");

        status.innerText = "Cancelled";

        status.className = "booking-status cancelled";

        alert("Booking Cancelled Successfully!");

        updateSummary();

    }

}


// Function to Update Booking Summary
function updateSummary() {

    let bookings = document.getElementsByClassName("booking-item");

    let total = bookings.length;

    let pending = 0;
    let confirmed = 0;
    let cancelled = 0;

    for (let i = 0; i < bookings.length; i++) {

        let status = bookings[i].querySelector(".booking-status").innerText;

        if (status == "Pending") {
            pending++;
        }

        else if (status == "Confirmed") {
            confirmed++;
        }

        else if (status == "Cancelled") {
            cancelled++;
        }

    }

    document.getElementById("total-bookings").innerText = total;

    document.getElementById("pending-bookings").innerText = pending;

    document.getElementById("confirmed-bookings").innerText = confirmed;

    document.getElementById("cancelled-bookings").innerText = cancelled;

}
