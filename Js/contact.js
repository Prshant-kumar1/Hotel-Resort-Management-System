/**
 * Aurelia Bay Resort - Contact Page Script (Js/contact.js)
 * Handles Contact Form Validation, Inquiries Storage, Character Counter,
 * and Quick Contact Category Pre-selection.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-card");
  if (!form) return;

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const subjectInput = document.querySelector("#subject");
  const messageInput = document.querySelector("#message");

  /* =====================================================================
     1. Live Character Counter for Message Textarea
     ===================================================================== */
  if (messageInput) {
    const counter = document.createElement("span");
    counter.className = "char-counter";
    counter.textContent = "0 / 500 characters";
    messageInput.parentNode.appendChild(counter);

    messageInput.setAttribute("maxlength", "500");
    messageInput.addEventListener("input", () => {
      const length = messageInput.value.length;
      counter.textContent = `${length} / 500 characters`;
      if (length >= 480) {
        counter.style.color = "var(--color-accent)";
      } else {
        counter.style.color = "var(--color-text-muted)";
      }
    });
  }

  /* =====================================================================
     2. Inline Field Validation Helpers
     ===================================================================== */
  const setFieldError = (input, message) => {
    input.classList.add("input-error");
    let errorEl = input.parentNode.querySelector(".form-error-msg");
    if (!errorEl) {
      errorEl = document.createElement("span");
      errorEl.className = "form-error-msg";
      input.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
  };

  const clearFieldError = (input) => {
    input.classList.remove("input-error");
    const errorEl = input.parentNode.querySelector(".form-error-msg");
    if (errorEl) {
      errorEl.remove();
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time clearance on input
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => clearFieldError(input));
  });

  /* =====================================================================
     3. Form Feedback Message Container
     ===================================================================== */
  let feedbackBox = document.querySelector(".form-feedback-box");
  if (!feedbackBox) {
    feedbackBox = document.createElement("div");
    feedbackBox.className = "form-feedback-box";
    form.insertBefore(feedbackBox, form.querySelector(".form-group"));
  }

  /* =====================================================================
     4. Form Submission Handling
     ===================================================================== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    feedbackBox.style.display = "none";

    // Validate Name
    const nameVal = nameInput?.value.trim() || "";
    if (!nameVal) {
      setFieldError(nameInput, "Please enter your full name.");
      isValid = false;
    } else if (nameVal.length < 2) {
      setFieldError(nameInput, "Name must be at least 2 characters.");
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // Validate Email
    const emailVal = emailInput?.value.trim() || "";
    if (!emailVal) {
      setFieldError(emailInput, "Please enter your email address.");
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      setFieldError(emailInput, "Please enter a valid email address (e.g., name@example.com).");
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    // Validate Subject
    const subjectVal = subjectInput?.value.trim() || "";
    if (!subjectVal) {
      setFieldError(subjectInput, "Please enter a subject.");
      isValid = false;
    } else {
      clearFieldError(subjectInput);
    }

    // Validate Message
    const messageVal = messageInput?.value.trim() || "";
    if (!messageVal) {
      setFieldError(messageInput, "Please write your message.");
      isValid = false;
    } else if (messageVal.length < 10) {
      setFieldError(messageInput, "Message must be at least 10 characters long.");
      isValid = false;
    } else {
      clearFieldError(messageInput);
    }

    if (!isValid) {
      // Focus on first invalid field
      const firstError = form.querySelector(".input-error");
      if (firstError) firstError.focus();
      return;
    }

    // Save inquiry to localStorage
    try {
      const inquiries = JSON.parse(localStorage.getItem("aurelia_inquiries") || "[]");
      const newInquiry = {
        id: "INQ" + Math.floor(1000 + Math.random() * 9000),
        name: nameVal,
        email: emailVal,
        subject: subjectVal,
        message: messageVal,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      inquiries.unshift(newInquiry);
      localStorage.setItem("aurelia_inquiries", JSON.stringify(inquiries));
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    // Show Success Message
    feedbackBox.className = "form-feedback-box is-success";
    feedbackBox.innerHTML = `<strong>Message Sent!</strong> Thank you, ${nameVal}. We have received your inquiry regarding "<em>${subjectVal}</em>". Our team will respond to <strong>${emailVal}</strong> within 24 hours.`;
    feedbackBox.style.display = "block";

    if (window.showToast) {
      window.showToast("Message sent successfully!", "success");
    }

    // Reset Form
    form.reset();
    const charCounter = form.querySelector(".char-counter");
    if (charCounter) charCounter.textContent = "0 / 500 characters";
    feedbackBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  /* =====================================================================
     5. Quick Contact Cards Category Autofill
     ===================================================================== */
  const quickCards = document.querySelectorAll(".quick-contact .card");
  const quickCategories = [
    { title: "Reservations", subject: "Inquiry: Room Reservations & Availability" },
    { title: "Events", subject: "Inquiry: Weddings, Offsites & Private Dining" },
    { title: "Concierge", subject: "Inquiry: Concierge Services & Local Transfers" },
  ];

  quickCards.forEach((card, index) => {
    const category = quickCategories[index];
    if (!category) return;

    card.setAttribute("title", `Click to send inquiry about ${category.title}`);
    card.addEventListener("click", () => {
      if (subjectInput) {
        subjectInput.value = category.subject;
        clearFieldError(subjectInput);
      }
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      if (messageInput) {
        messageInput.focus();
      }
      if (window.showToast) {
        window.showToast(`Selected "${category.title}" category`, "info", 2000);
      }
    });
  });
});
