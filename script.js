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
/* =========================================================
   PORTFOLIO — INTRO + 3D HERO PHOTO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     INTRO
     ------------------------------------------------------- */

  const intro = document.getElementById("intro");

  if (intro) {

    // Let the hawk finish its flight first.
    setTimeout(() => {
      intro.classList.add("opening");
    }, 1750);


    // Remove intro after curtains open.
    setTimeout(() => {
      intro.classList.add("hide");
    }, 2750);

  }


  /* -------------------------------------------------------
     REMOVE WHITE BACKGROUND FROM HERO PHOTO
     ------------------------------------------------------- */

  const photo = document.getElementById("heroPhoto");

  if (photo) {

    const removeWhiteBackground = () => {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true
      });

      canvas.width = photo.naturalWidth;
      canvas.height = photo.naturalHeight;

      ctx.drawImage(
        photo,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const pixels = imageData.data;

      for (let i = 0; i < pixels.length; i += 4) {

        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        /*
         * Detect bright/white background.
         * Keep skin, black suit and dark hair.
         */

        const brightness = (r + g + b) / 3;

        if (
          brightness > 235 &&
          r > 225 &&
          g > 225 &&
          b > 225
        ) {
          pixels[i + 3] = 0;
        }

        /*
         * Softer transition around white edges.
         */

        else if (
          brightness > 215 &&
          r > 205 &&
          g > 205 &&
          b > 205
        ) {

          const fade =
            1 - ((brightness - 215) / 20);

          pixels[i + 3] =
            Math.max(
              0,
              Math.min(255, fade * 255)
            );
        }

      }

      ctx.putImageData(imageData, 0, 0);

      photo.src = canvas.toDataURL("image/png");

    };


    if (photo.complete) {
      removeWhiteBackground();
    } else {
      photo.addEventListener(
        "load",
        removeWhiteBackground,
        { once: true }
      );
    }

  }


  /* -------------------------------------------------------
     3D SCROLL ROTATION
     ------------------------------------------------------- */

  const photoArea =
    document.getElementById("heroPhotoArea");

  if (!photoArea || !photo) return;


  let ticking = false;


  function updatePhotoRotation() {

    const rect =
      photoArea.getBoundingClientRect();

    const viewportHeight =
      window.innerHeight;

    /*
     * progress:
     * 0 = hero starts
     * 1 = hero leaves screen
     */

    let progress =
      (viewportHeight - rect.top) /
      (viewportHeight + rect.height);

    progress =
      Math.max(0, Math.min(1, progress));


    /*
     * Strong 3D rotation:
     *
     * start      = front
     * middle     = slight side
     * later      = opposite side
     */

    const rotateY =
      -32 + (progress * 78);

    const rotateX =
      Math.sin(progress * Math.PI) * -4;

    const translateY =
      progress * -80;

    const scale =
      1.03 - progress * .08;


    photo.style.transform =
      `
      perspective(1100px)
      rotateY(${rotateY}deg)
      rotateX(${rotateX}deg)
      translate3d(0, ${translateY}px, 0)
      scale(${scale})
      `;


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        requestAnimationFrame(
          updatePhotoRotation
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  updatePhotoRotation();

});
