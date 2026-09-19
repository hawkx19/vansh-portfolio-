document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */

  const intro = document.querySelector(".intro");
  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const heroPhoto = document.querySelector("#heroPhoto");
  const reveals = document.querySelectorAll(".reveal");


  /* =========================
     INTRO
  ========================= */

  if (intro) {
    setTimeout(() => {
      intro.classList.add("hide");
    }, 4000);
  }


  /* =========================
     NAVBAR
  ========================= */

  const updateNav = () => {
    if (!nav) return;

    nav.classList.toggle("scrolled", window.scrollY > 40);
  };

  updateNav();

  window.addEventListener("scroll", updateNav, {
    passive: true
  });


  /* =========================
     MOBILE MENU
  ========================= */

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuBtn.classList.toggle("active", isOpen);

      menuBtn.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }
    /* =========================
     SCROLL REVEAL
  ========================= */

  if (reveals.length) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    reveals.forEach(element => {
      revealObserver.observe(element);
    });

  }


  /* =========================
     HERO PHOTO PARALLAX
  ========================= */

  if (heroPhoto) {

    const updateHeroPhoto = () => {

      const scrollY = window.scrollY;

      if (scrollY > window.innerHeight * 1.2) {
        return;
      }

      const rotation = Math.min(
        18,
        Math.max(-5, -5 + scrollY * 0.035)
      );

      const moveY = Math.min(
        35,
        scrollY * 0.08
      );

      heroPhoto.style.transform =
        `perspective(1100px)
         translateY(${moveY}px)
         rotateY(${rotation}deg)`;

    };


    updateHeroPhoto();

    window.addEventListener(
      "scroll",
      updateHeroPhoto,
      { passive: true }
    );

  }


  /* =========================
     SMOOTH ANCHOR SCROLL
  ========================= */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });
    /* =========================
     ACTIVE NAV LINK
  ========================= */

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const updateActiveLink = () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }

    });


    navItems.forEach(link => {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }

    });

  };


  updateActiveLink();

  window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
  );


  /* =========================
     PAGE LOAD
  ========================= */

  window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    if (heroPhoto) {
      heroPhoto.classList.add("ready");
    }

  });


  /* =========================
     PREVENT BROKEN IMAGE LOOK
  ========================= */

  if (heroPhoto) {

    heroPhoto.addEventListener("error", () => {

      heroPhoto.style.opacity = "0";

    });

  }


  /* =========================
     FINISHED
  ========================= */

});
