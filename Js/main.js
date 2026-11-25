/**
 * Aurelia Bay Resort - Main Shared Script (Js/main.js)
 * Shared utilities for Header, Mobile Navigation, Auth State (Login/Logout),
 * Back-to-Top Button, and Toast Notifications.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================================
     1. Toast Notification System
     ===================================================================== */
  window.showToast = (message, type = "info", duration = 3200) => {
    let toast = document.querySelector(".aurelia-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "aurelia-toast";
      document.body.appendChild(toast);
    }

    toast.className = `aurelia-toast ${type} show`;
    toast.textContent = message;

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  };

  /* =====================================================================
     2. Authentication State (Login / Logout / My Bookings)
     ===================================================================== */
  const getLoggedInUser = () => {
    try {
      const data = localStorage.getItem("aurelia_user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  const updateAuthNavigation = () => {
    const navUl = document.querySelector(".main-nav ul");
    if (!navUl) return;

    let authSlot = document.querySelector("#nav-auth-slot");
    if (!authSlot) {
      authSlot = document.createElement("li");
      authSlot.id = "nav-auth-slot";
      navUl.appendChild(authSlot);
    }

    let logoutSlot = document.querySelector("#nav-logout-slot");
    const user = getLoggedInUser();

    if (user && user.email) {
      // User is logged in -> show My Bookings and Logout
      const isMyBookingsPage = window.location.pathname.toLowerCase().includes("my-bookings");
      authSlot.innerHTML = `<a href="my-bookings.html" class="nav-link ${isMyBookingsPage ? "active" : ""}">My Bookings</a>`;

      if (!logoutSlot) {
        logoutSlot = document.createElement("li");
        logoutSlot.id = "nav-logout-slot";
        navUl.appendChild(logoutSlot);
      }
      logoutSlot.innerHTML = `<button type="button" class="nav-logout-btn" id="nav-logout-btn">Logout</button>`;

      const logoutBtn = document.querySelector("#nav-logout-btn");
      if (logoutBtn) {
        logoutBtn.onclick = (e) => {
          e.preventDefault();
          localStorage.removeItem("aurelia_user");
          window.showToast("You have been logged out successfully.", "info");
          updateAuthNavigation();

          // If on my-bookings.html, redirect back to index.html
          if (window.location.pathname.toLowerCase().includes("my-bookings")) {
            setTimeout(() => {
              window.location.href = "index.html";
            }, 800);
          }
        };
      }
    } else {
      // User is logged out -> show Login
      const isLoginPage = window.location.pathname.toLowerCase().includes("login");
      authSlot.innerHTML = `<a href="login.html" class="nav-link ${isLoginPage ? "active" : ""}">Login</a>`;
      if (logoutSlot) {
        logoutSlot.remove();
      }
    }
  };

  updateAuthNavigation();

  /* =====================================================================
     3. Sticky Scrolled Header Effect
     ===================================================================== */
  const header = document.querySelector(".site-header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* =====================================================================
     4. Mobile Navigation Auto-Close
     ===================================================================== */
  const navToggle = document.querySelector("#nav-toggle");
  if (navToggle) {
    // Close nav when clicking any nav link
    document.querySelectorAll(".main-nav a, .main-nav button").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.checked = false;
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (navToggle.checked) {
        const isHeaderClick = e.target.closest(".site-header");
        if (!isHeaderClick) {
          navToggle.checked = false;
        }
      }
    });
  }

  /* =====================================================================
     5. Back to Top Floating Button
     ===================================================================== */
  let backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.className = "back-to-top";
    backToTopBtn.setAttribute("type", "button");
    backToTopBtn.setAttribute("aria-label", "Back to top");
    backToTopBtn.innerHTML = "&#8593;";
    document.body.appendChild(backToTopBtn);
  }

  const handleBackToTopVisibility = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", handleBackToTopVisibility, { passive: true });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =====================================================================
     6. Home Page Promo Code ("AURELIA5") Copy Handler
     ===================================================================== */
  const claimOfferBtn = document.querySelector(".cta-banner .btn-primary");
  if (claimOfferBtn) {
    claimOfferBtn.addEventListener("click", (e) => {
      // Store promo code in session storage so booking page can use it
      sessionStorage.setItem("aurelia_promo", "AURELIA5");

      // Attempt to copy code to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText("AURELIA5").catch(() => {});
      }
      window.showToast("Promo code 'AURELIA5' copied! Redirecting to booking...", "success");
    });
  }
});
