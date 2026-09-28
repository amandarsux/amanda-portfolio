/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".custom-cursor");

if (
  cursor &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const interactiveElements = document.querySelectorAll("a, button");

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
    });

  });
}

/* =========================================================
   IDEATE TOGGLE
========================================================= */

const ideateButtons = document.querySelectorAll(".ideate-toggle-btn");
const ideatePanels = document.querySelectorAll(".ideate-panel");

ideateButtons.forEach(button => {
  button.addEventListener("click", () => {

    const view = button.dataset.view;

    ideateButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    ideatePanels.forEach(panel => {
      panel.classList.remove("active");
    });

    button.classList.add("active");

    document
      .querySelector(`.ideate-panel[data-panel="${view}"]`)
      .classList.add("active");

  });
});

/* =========================================================
   DESIGN TOGGLES
========================================================= */

const designScreenButtons = document.querySelectorAll(".design-screen-btn");
const designScreenPanels = document.querySelectorAll(".design-screen-panel");
const designToggleButtons = document.querySelectorAll(".design-toggle-btn");

let currentDesignScreen = "home";
let currentDesignView = "before";


/* SCREEN SELECTOR + MOVING INDICATOR */

const designScreens = document.querySelector(".design-screens");

function moveDesignIndicator(button) {

  if (!designScreens || !button) {
    return;
  }

  const screensRect = designScreens.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  designScreens.style.setProperty(
    "--indicator-left",
    `${buttonRect.left - screensRect.left}px`
  );

  designScreens.style.setProperty(
    "--indicator-width",
    `${buttonRect.width}px`
  );
}


designScreenButtons.forEach(button => {

  button.addEventListener("click", () => {

    const screen = button.dataset.screen;

    currentDesignScreen = screen;

    designScreenButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    designScreenPanels.forEach(panel => {
      panel.classList.remove("active");
    });

    button.classList.add("active");

    const targetPanel = document.querySelector(
      `.design-screen-panel[data-screen-panel="${screen}"]`
    );

    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    moveDesignIndicator(button);

  });

});


/* POSITION INDICATOR ON PAGE LOAD */

const activeDesignScreen = document.querySelector(
  ".design-screen-btn.active"
);

if (activeDesignScreen) {
  moveDesignIndicator(activeDesignScreen);
}


/* KEEP INDICATOR ALIGNED ON RESIZE */

window.addEventListener("resize", () => {

  const activeButton = document.querySelector(
    ".design-screen-btn.active"
  );

  if (activeButton) {
    moveDesignIndicator(activeButton);
  }

});


/* BEFORE / AFTER TOGGLE */

designToggleButtons.forEach(button => {

  button.addEventListener("click", () => {

    const view = button.dataset.view;

    currentDesignView = view;

    designToggleButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    designScreenPanels.forEach(panel => {

      const views = panel.querySelectorAll(".design-view");

      views.forEach(viewPanel => {
        viewPanel.classList.remove("active");
      });

      const matchingView = panel.querySelector(
        `.design-view[data-view-panel="${view}"]`
      );

      if (matchingView) {
        matchingView.classList.add("active");
      }

    });

  });

});

/* =========================================================
   ITERATE TOGGLES
========================================================= */

const iterateScreenButtons = document.querySelectorAll(".iterate-screen-btn");
const iteratePanels = document.querySelectorAll(".iterate-panel");
const iterateToggleButtons = document.querySelectorAll(".iterate-toggle-btn");

const iterateScreens = document.querySelector(".iterate-screens");


/* MOVING INDICATOR */

function moveIterateIndicator(button) {

  if (!iterateScreens || !button) {
    return;
  }

  const screensRect = iterateScreens.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  iterateScreens.style.setProperty(
    "--iterate-indicator-left",
    `${buttonRect.left - screensRect.left}px`
  );

  iterateScreens.style.setProperty(
    "--iterate-indicator-width",
    `${buttonRect.width}px`
  );
}


/* ITERATION SELECTOR */

iterateScreenButtons.forEach(button => {

  button.addEventListener("click", () => {

    const iteration = button.dataset.iteration;

    iterateScreenButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    iteratePanels.forEach(panel => {
      panel.classList.remove("active");
    });

    button.classList.add("active");

    const targetPanel = document.querySelector(
      `.iterate-panel[data-iteration-panel="${iteration}"]`
    );

    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    moveIterateIndicator(button);

  });

});


/* INITIAL INDICATOR */

const activeIterateScreen = document.querySelector(
  ".iterate-screen-btn.active"
);

if (activeIterateScreen) {
  moveIterateIndicator(activeIterateScreen);
}


/* KEEP INDICATOR ALIGNED */

window.addEventListener("resize", () => {

  const activeButton = document.querySelector(
    ".iterate-screen-btn.active"
  );

  if (activeButton) {
    moveIterateIndicator(activeButton);
  }

});


/* BEFORE / AFTER TOGGLE */

iterateToggleButtons.forEach(button => {

  button.addEventListener("click", () => {

    const view = button.dataset.view;

    iterateToggleButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    iteratePanels.forEach(panel => {

      const views = panel.querySelectorAll(".iterate-view");

      views.forEach(viewPanel => {
        viewPanel.classList.remove("active");
      });

      const matchingView = panel.querySelector(
        `.iterate-view[data-view-panel="${view}"]`
      );

      if (matchingView) {
        matchingView.classList.add("active");
      }

    });

  });

});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   CASE STUDY NAVIGATION
========================================================= */

const caseSections = document.querySelectorAll(".case-section");
const caseLinks = document.querySelectorAll(".case-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute("id");

      caseLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.case-link[href="#${id}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }

    });
  },
  {
    rootMargin: "-25% 0px -60% 0px",
    threshold: 0
  }
);

caseSections.forEach((section) => {
  sectionObserver.observe(section);
});


/* =========================================================
   SMOOTH CASE STUDY NAV CLICKS
========================================================= */

caseLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const navOffset = 95;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});