document.addEventListener("DOMContentLoaded", () => {

  const heroPhoto = document.querySelector(".hero-photo");
  const nav = document.querySelector(".nav");

  /* =========================
     NAVBAR
  ========================= */

  if (nav) {
    const updateNav = () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };

    window.addEventListener("scroll", updateNav, {
      passive: true
    });

    updateNav();
  }


  /* =========================
     HERO 3D PHOTO
  ========================= */

  if (heroPhoto) {

    let ticking = false;

    const updatePhoto = () => {

      const scroll = window.scrollY;
      const heroHeight = window.innerHeight;

      const progress = Math.min(
        Math.max(scroll / heroHeight, 0),
        1
      );

      /*
        Smooth continuous rotation:
        front → angled → opposite angle
      */

      const rotation = progress * 38 - 5;
      const depth = progress * 45;
      const vertical = progress * 18;

      heroPhoto.style.transform = `
        perspective(1100px)
        rotateY(${rotation}deg)
        translateZ(${depth}px)
        translateY(${vertical}px)
      `;

      ticking = false;
    };


    window.addEventListener("scroll", () => {

      if (!ticking) {
        window.requestAnimationFrame(updatePhoto);
        ticking = true;
      }

    }, {
      passive: true
    });

    updatePhoto();
  }


  /* =========================
     REVEAL ANIMATIONS
  ========================= */

  const revealItems =
    document.querySelectorAll(".reveal");

  if (revealItems.length) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealItems.forEach(item => {
      observer.observe(item);
    });
  }


  /* =========================
     INTERNAL SCROLL LINKS
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const id =
          link.getAttribute("href");

        if (!id || id === "#") return;

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });

});
