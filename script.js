document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const heroPhoto = document.querySelector(".hero-photo");
  const revealElements = document.querySelectorAll(".reveal");

  // Navbar scroll effect
  function updateNav() {
    if (!nav) return;

    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNav);
  updateNav();

  // Scroll-based cinematic photo rotation
  function updatePhoto() {
    if (!heroPhoto) return;

    const scrollY = window.scrollY;
    const rotation = Math.max(-18, Math.min(18, scrollY * 0.035));
    const movement = Math.min(45, scrollY * 0.04);

    heroPhoto.style.transform =
      `translateY(${movement}px) rotateY(${rotation}deg)`;
  }

  window.addEventListener("scroll", updatePhoto);
  updatePhoto();

  // Reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => observer.observe(element));

  // Hidden photo trigger → full body modal
  const trigger = document.querySelector(".photo-trigger");
  const modal = document.querySelector(".fullbody-modal");
  const closeButton = document.querySelector(".modal-close");

  function openModal() {
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (trigger) {
    trigger.addEventListener("click", openModal);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Small mouse-depth effect on desktop
  if (window.innerWidth > 900 && heroPhoto) {
    document.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      heroPhoto.style.setProperty("--mouse-x", `${x}`);
      heroPhoto.style.setProperty("--mouse-y", `${y}`);
    });
  }
});
