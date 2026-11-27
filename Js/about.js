/**
 * Aurelia Bay Resort - About Page Script (Js/about.js)
 * Handles animated milestone numbers counter and team member interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================================
     1. Animated Stats Counter
     ===================================================================== */
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const target = Number(el.getAttribute("data-target")) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600; // ms
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease-out quad curve
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(ease * target);

        el.textContent = current + suffix;

        if (frame === totalFrames) {
          clearInterval(timer);
          el.textContent = target + suffix;
        }
      }, frameDuration);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      statNumbers.forEach((el) => observer.observe(el));
    } else {
      statNumbers.forEach((el) => animateCounter(el));
    }
  }

  /* =====================================================================
     2. Team Members Interactive Hover/Focus Feedback
     ===================================================================== */
  const teamCards = document.querySelectorAll(".team-grid > div");
  teamCards.forEach((card) => {
    card.style.transition = "transform var(--transition)";
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});
