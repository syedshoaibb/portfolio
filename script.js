/* ==========================================================
   PORTFOLIO V1.0
   Author : Syed Madanin Shoaib
========================================================== */

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");
const typingText = document.getElementById("typing");

/* ==========================================================
   TYPING EFFECT
========================================================== */

const phrases = [

    "Exploring Software Development.",

    "Building Projects.",

    "Learning Every Day.",

    "Improving One Step At A Time."

];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const current = phrases[phraseIndex];

    if (!deleting) {

        typingText.textContent =
            current.substring(0, charIndex++);

        if (charIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typingText.textContent =
            current.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            phraseIndex++;

            if (phraseIndex >= phrases.length) {

                phraseIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 40 : 90);

}

typeEffect();

/* ==========================================================
   SCROLL PROGRESS
========================================================== */

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ==========================================================
   HEADER
========================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.padding = "0";

        header.style.boxShadow =
            "0 8px 30px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "none";

    }

});

/* ==========================================================
   BACK TO TOP
========================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
/* ==========================================================
   MOBILE MENU
========================================================== */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});

/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});

/* Close menu with ESC */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});

/* ==========================================================
   THEME TOGGLE
========================================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

},

{

    threshold:0.15

}

);

reveals.forEach(section => {

    revealObserver.observe(section);

});

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(!target) return;

        e.preventDefault();

        window.scrollTo({

            top: target.offsetTop - 85,

            behavior: "smooth"

        });

    });

});

/* ==========================================================
   CURRENT YEAR
========================================================== */

const yearElement = document.getElementById("year");

if(yearElement){

    yearElement.textContent = new Date().getFullYear();

}

/* ==========================================================
   END
========================================================== */

console.log(

"%cPortfolio Loaded Successfully 🚀",

"color:#4F8CFF;font-size:16px;font-weight:bold;"

);