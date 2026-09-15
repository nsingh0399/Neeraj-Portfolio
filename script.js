/* =====================================================
   NEERAJ SINGH PORTFOLIO
===================================================== */


/* =====================================================
   AOS
===================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 650,

        easing: "ease-out-cubic",

        once: true,

        offset: 60

    });

}


/* =====================================================
   DARK MODE
   DARK IS DEFAULT
===================================================== */

const html =
    document.documentElement;

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );


function setTheme(theme) {

    if (theme === "dark") {

        html.classList.add("dark");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        }

    } else {

        html.classList.remove("dark");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

}


/*
   Important:
   Dark mode is deliberately the
   default for first-time visitors.
*/

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );

if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("dark");

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                html.classList.contains("dark");

            setTheme(
                isDark
                    ? "light"
                    : "dark"
            );

        }
    );

}


/* =====================================================
   MOBILE NAV
===================================================== */

const navToggle =
    document.getElementById(
        "nav-toggle"
    );

const navMenu =
    document.getElementById(
        "nav-menu"
    );


if (navToggle && navMenu) {

    navToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "open"
            );

        }
    );

}


document.querySelectorAll(
    ".nav-link"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu?.classList.remove(
                "open"
            );

        }
    );

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (event) {

            const href =
                this.getAttribute("href");

            if (
                !href ||
                href === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    href
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                70;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        }
    );

});


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav() {

    const currentPosition =
        window.scrollY + 130;


    sections.forEach(section => {

        const top =
            section.offsetTop;

        const bottom =
            top +
            section.offsetHeight;

        const id =
            section.id;


        if (
            currentPosition >= top &&
            currentPosition < bottom
        ) {

            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) === `#${id}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);

updateActiveNav();


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElement =
    document.getElementById(
        "typing-text"
    );


const phrases = [

    "Robotics & Embedded Systems Engineer",

    "Robotics & AI (STEM) Trainer",

    "Arduino • ESP • IoT • Robotics",

    "Android Developer • Kotlin • Java",

    "STEM Education Enthusiast"

];


let phraseIndex = 0;

let charIndex = 0;

let deleting = false;


function typeText() {

    if (!typingElement) {
        return;
    }


    const phrase =
        phrases[phraseIndex];


    if (!deleting) {

        charIndex++;

        typingElement.textContent =
            phrase.substring(
                0,
                charIndex
            );


        if (
            charIndex >=
            phrase.length
        ) {

            deleting = true;

            setTimeout(
                typeText,
                1600
            );

            return;

        }

    } else {

        charIndex--;

        typingElement.textContent =
            phrase.substring(
                0,
                charIndex
            );


        if (charIndex <= 0) {

            deleting = false;

            phraseIndex =
                (
                    phraseIndex + 1
                ) %
                phrases.length;

        }

    }


    setTimeout(
        typeText,
        deleting
            ? 35
            : 65
    );

}


setTimeout(
    typeText,
    500
);


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );

            button.classList.add(
                "active"
            );


            const filter =
                button.dataset.filter;


            projectCards.forEach(
                card => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.classList.remove(
                            "hidden"
                        );

                    } else {

                        card.classList.add(
                            "hidden"
                        );

                    }

                }
            );

        }
    );

});


/* =====================================================
   COUNTERS
===================================================== */

const counters =
    document.querySelectorAll(
        ".counter"
    );

let countersStarted =
    false;


function animateCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );

        const duration =
            1100;

        const start =
            performance.now();


        function update(now) {

            const progress =
                Math.min(
                    (now - start) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            counter.textContent =
                Math.floor(
                    eased * target
                );


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            update
        );

    });

}


const statsSection =
    document.querySelector(
        ".stats-section"
    );


if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounters();

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .3
            }
        );


    observer.observe(
        statsSection
    );

} else {

    animateCounters();

}


/* =====================================================
   SCROLL TO TOP
===================================================== */

const scrollTop =
    document.getElementById(
        "scroll-top"
    );


function updateScrollTop() {

    if (!scrollTop) {
        return;
    }


    if (
        window.scrollY >
        450
    ) {

        scrollTop.classList.add(
            "show"
        );

    } else {

        scrollTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    updateScrollTop,
    {
        passive: true
    }
);


if (scrollTop) {

    scrollTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const formMessage =
    document.getElementById(
        "form-message"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            const name =
                document.getElementById(
                    "name"
                )?.value.trim();

            const email =
                document.getElementById(
                    "email"
                )?.value.trim();

            const subject =
                document.getElementById(
                    "subject"
                )?.value.trim();

            const message =
                document.getElementById(
                    "message"
                )?.value.trim();


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                event.preventDefault();

                if (formMessage) {

                    formMessage.textContent =
                        "Please fill in all fields.";

                    formMessage.style.color =
                        "#ef4444";

                }

                return;

            }


            if (
                !emailPattern.test(
                    email
                )
            ) {

                event.preventDefault();

                if (formMessage) {

                    formMessage.textContent =
                        "Please enter a valid email.";

                    formMessage.style.color =
                        "#ef4444";

                }

                return;

            }


            if (formMessage) {

                formMessage.textContent =
                    "Sending message...";

                formMessage.style.color =
                    "#635bff";

            }

        }
    );

}


/* =====================================================
   NAVBAR SHADOW
===================================================== */

const navbar =
    document.querySelector(
        ".navbar"
    );


function updateNavbar() {

    if (!navbar) {
        return;
    }


    if (
        window.scrollY > 20
    ) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(0,0,0,.10)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);

updateNavbar();


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            navMenu?.classList.remove(
                "open"
            );

        }

    }
);


/* =====================================================
   CURRENT YEAR
===================================================== */

const currentYear =
    document.getElementById(
        "current-year"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%c Neeraj Singh Portfolio ",
    "background:#635bff;color:white;padding:7px 12px;border-radius:7px;font-weight:bold;"
);

console.log(
    "Robotics • Embedded • IoT • AI • Android"
);