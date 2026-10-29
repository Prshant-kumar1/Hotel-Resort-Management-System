document.addEventListener("DOMContentLoaded", () => {
  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  const checkInInput = document.querySelector("#check-in");
  const checkOutInput = document.querySelector("#check-out");

  if (checkInInput && checkOutInput) {
    const today = new Date();
    const todayString = formatDate(today);

    checkInInput.min = todayString;
    checkOutInput.min = todayString;

    checkInInput.addEventListener("change", () => {
      if (!checkInInput.value) return;

      const nextDay = new Date(checkInInput.value);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOutInput.min = formatDate(nextDay);

      if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
        checkOutInput.value = "";
      }
    });
  }

  const saveBooking = (booking) => {
    const savedBookings = JSON.parse(localStorage.getItem("aurelia-bookings") || "[]");
    savedBookings.unshift(booking);
    localStorage.setItem("aurelia-bookings", JSON.stringify(savedBookings));
  };

  const renderBookings = () => {
    const tableBody = document.querySelector(".bookings-table tbody");
    if (!tableBody) return;

    const bookings = JSON.parse(localStorage.getItem("aurelia-bookings") || "[]");

    if (!bookings.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center;">No bookings yet. Book your next stay.</td>
        </tr>
      `;
      return;
    }

    const rows = bookings
      .map(
        (booking) => `
          <tr>
            <td>#${booking.id}</td>
            <td>${booking.room}</td>
            <td>${booking.checkIn}</td>
            <td>${booking.checkOut}</td>
            <td>${booking.guests}</td>
            <td>
              <span class="status status-confirmed">Confirmed</span>
            </td>
          </tr>
        `
      )
      .join("");

    tableBody.innerHTML = rows;
  };

  const bookingForm = document.querySelector(".booking-form form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const guestName = document.querySelector("#guest-name")?.value.trim();
      const email = document.querySelector("#email")?.value.trim();
      const room = document.querySelector("#room")?.value;
      const checkIn = document.querySelector("#check-in")?.value;
      const checkOut = document.querySelector("#check-out")?.value;
      const guests = Number(document.querySelector("#guests")?.value || 1);

      if (!guestName || !email || !room || !checkIn || !checkOut) {
        alert("Please complete all booking details before submitting.");
        return;
      }

      if (new Date(checkOut) <= new Date(checkIn)) {
        alert("Check-out date must be later than the check-in date.");
        return;
      }

      const bookingId = `BK${Math.floor(1000 + Math.random() * 9000)}`;
      const booking = {
        id: bookingId,
        room: room
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        checkIn: new Date(checkIn).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        checkOut: new Date(checkOut).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        guests,
      };

      saveBooking(booking);
      alert(`Booking confirmed! Your reference is ${bookingId}.`);
      bookingForm.reset();
      window.location.href = "My-bookings.html";
    });
  }

  const loginForm = document.querySelector("form");
  if (loginForm && loginForm.querySelector("#password") && !loginForm.querySelector("#confirm-password")) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = loginForm.querySelector("#email")?.value.trim();
      const password = loginForm.querySelector("#password")?.value;

      if (!email || !password) {
        alert("Please enter both your email and password.");
        return;
      }

      alert("Login successful. Welcome back!");
      loginForm.reset();
    });
  }

  const registrationForm = document.querySelector("form");
  if (registrationForm && registrationForm.querySelector("#confirm-password")) {
    registrationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const password = registrationForm.querySelector("#password")?.value;
      const confirmPassword = registrationForm.querySelector("#confirm-password")?.value;

      if (!password || !confirmPassword) {
        alert("Please fill in all registration fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      alert("Account created successfully. You can now log in.");
      registrationForm.reset();
      window.location.href = "login.html";
    });
  }

  renderBookings();
});
