
/* =========================================
   ABOUT PAGE INTERACTIONS
   ========================================= */


/* =========================================
   FLOATING FACTS
   ========================================= */

const floatingItems = document.querySelectorAll(".floating-item");

floatingItems.forEach((item) => {

    item.addEventListener("click", (event) => {

        // Prevent the click from affecting anything else
        event.stopPropagation();

        // Close every other open item
        floatingItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("is-open");
            }
        });

        // Toggle this item
        item.classList.toggle("is-open");
    });

});

/* =========================================
   CUSTOM CURSOR
   ========================================= */

document.addEventListener("click", () => {

    floatingItems.forEach((item) => {
        item.classList.remove("is-open");
    });

});

const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});


document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursor.style.width = "24px";
        cursor.style.height = "24px";
    });

    element.addEventListener("mouseleave", () => {
        cursor.style.width = "14px";
        cursor.style.height = "14px";
    });
});

document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursor.style.width = "24px";
        cursor.style.height = "24px";
    });

    element.addEventListener("mouseleave", () => {
        cursor.style.width = "14px";
        cursor.style.height = "14px";
    });
});

/* =========================================
   SCROLL REVEAL
   ========================================= */

const revealElements = document.querySelectorAll(
    ".intro-copy, .intro-photo, .creative-section, .background-section, .about-closing, .site-footer"
);


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "reveal-visible"
                );

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


/* =========================================
   SHOW FIRST SECTION ON PAGE LOAD
   ========================================= */

const firstSection = document.querySelector(".about-intro");

if (firstSection) {
    requestAnimationFrame(() => {
        firstSection.classList.add("reveal-visible");
    });
}


/* =========================================
   CREATIVE VIDEO HOVER PREVIEW
   ========================================= */

const creativeCards = document.querySelectorAll(".creative-card");

creativeCards.forEach((card) => {

    const preview = card.querySelector(".video-preview");

    // Skip cards that don't contain a video preview
    if (!preview) return;


    /*
       Start the preview when hovering.
    */

    card.addEventListener("mouseenter", () => {

        preview.play().catch((error) => {
            console.log("Video preview could not play:", error);
        });

    });


    /*
       Pause and reset the preview when leaving.
    */

    card.addEventListener("mouseleave", () => {

        preview.pause();
        preview.currentTime = 0;

    });

});
