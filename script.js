/* =========================================================
   PROJECT TIMELINE
========================================================= */

const timeline = document.querySelector(".timeline-scroll");
const clips = document.querySelectorAll(".project-clip");
const playhead = document.querySelector(".playhead");
const previousButton = document.querySelector("#timeline-prev");
const nextButton = document.querySelector("#timeline-next");

let activeIndex = 0;

const playheadPositions = [9, 34, 59, 84];


/* -------------------------
   Activate project
------------------------- */

function activateProject(index) {
  if (!clips.length) return;

  if (index < 0) {
    index = clips.length - 1;
  }

  if (index >= clips.length) {
    index = 0;
  }

  activeIndex = index;

  clips.forEach((clip, i) => {
    clip.classList.toggle("active", i === index);
  });

  if (playhead) {
    playhead.style.left = `${playheadPositions[index]}%`;
  }
}


/* -------------------------
   Project hover
------------------------- */

clips.forEach((clip, index) => {
  clip.addEventListener("mouseenter", () => {
    activateProject(index);
  });
});


/* -------------------------
   Timeline arrows
------------------------- */

previousButton?.addEventListener("click", () => {
  activateProject(activeIndex - 1);
});

nextButton?.addEventListener("click", () => {
  activateProject(activeIndex + 1);
});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".custom-cursor");

if (cursor && window.matchMedia("(pointer: fine)").matches) {

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function updateCursor() {
    cursor.style.transform =
    `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
  }

  updateCursor();


  /* Cursor grows over interactive elements */

  document
    .querySelectorAll("a, button")
    .forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hovering");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hovering");
      });

    });
}


/* =========================================================
   ACTIVE NAV ON SCROLL
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-item");

if (sections.length && navItems.length) {

  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        navItems.forEach((item) => {
          const isActive =
            item.getAttribute("href") === `#${entry.target.id}`;

          item.classList.toggle("active", isActive);
        });

      });

    },
    {
      threshold: 0.4
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".hero-intro, .hero-visual, .timeline-container, .about-text, .contact-content, .site-footer"
);

const workSection = document.querySelector(".work");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("reveal-visible");

      observer.unobserve(entry.target);

    });

  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* -------------------------
   Work section
------------------------- */

if (workSection) {

  const workObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("reveal-visible");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.2
    }
  );

  workObserver.observe(workSection);
}

/* =========================================================
   ABOUT HIGHLIGHTS
========================================================= */

const aboutSection = document.querySelector(".about");
const highlights = document.querySelectorAll(".highlight");

if (aboutSection && highlights.length) {

  const highlightObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        highlights.forEach((highlight) => {
          highlight.classList.add("is-visible");
        });

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.15
    }
  );

  highlightObserver.observe(aboutSection);

}

/* =========================================================
   INITIAL STATE
========================================================= */

activateProject(0);