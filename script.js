/* ==========================================================
   PORTFOLIO V1.1.1
   Author : Syed Madanin Shoaib
   Modern Portfolio Script
========================================================== */

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const header = document.getElementById("header");
const navContainer = document.querySelector(".nav-container");
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

const themeToggle = document.getElementById("themeToggle");

const typingText = document.getElementById("typing");

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

const reveals = document.querySelectorAll(".reveal");

const yearElement = document.getElementById("year");

/* ==========================================================
   INTRO ELEMENTS
========================================================== */

const introScreen = document.getElementById("intro-screen");
const mainContent = document.getElementById("main-content");

const introTitle = document.querySelector(".intro-content h1");
const introSubtitle = document.querySelector(".intro-subtitle");
const introTyping = document.getElementById("intro-typing");
const introLine = document.querySelector(".intro-line");

const introCircle = document.querySelector(".brand-logo circle");
const introPaths = document.querySelectorAll(".brand-logo path");

/* ==========================================================
   GLOBAL VARIABLES
========================================================== */

const heroPhrases = [

    "Exploring Software Development.",

    "Building Quality Projects.",

    "Learning Every Day.",

    "Improving One Step At A Time."

];

const introWords = [

    "Learn.",

    "Build.",

    "Create.",

    "Repeat."

];

let heroPhraseIndex = 0;
let heroCharIndex = 0;
let heroDeleting = false;

let introWordIndex = 0;
let introLetterIndex = 0;

/* ==========================================================
   HERO TYPING EFFECT
========================================================== */

function typeHero(){

    if(!typingText) return;

    const current = heroPhrases[heroPhraseIndex];

    if(!heroDeleting){

        typingText.textContent =
        current.substring(0,heroCharIndex++);

        if(heroCharIndex > current.length){

            heroDeleting = true;

            setTimeout(typeHero,1500);

            return;

        }

    }else{

        typingText.textContent =
        current.substring(0,heroCharIndex--);

        if(heroCharIndex < 0){

            heroDeleting = false;

            heroPhraseIndex++;

            if(heroPhraseIndex >= heroPhrases.length){

                heroPhraseIndex = 0;

            }

        }

    }

    setTimeout(typeHero, heroDeleting ? 40 : 90);

}

/* ==========================================================
   INTRO TYPING
========================================================== */

function typeIntro(){

    if(!introTyping) return;

    const word = introWords[introWordIndex];

    introTyping.textContent =
    word.substring(0,introLetterIndex);

    introLetterIndex++;

    if(introLetterIndex <= word.length){

        setTimeout(typeIntro,110);

    }else{

        setTimeout(()=>{

            introLetterIndex = 0;

            introWordIndex++;

            if(introWordIndex >= introWords.length){

                introWordIndex = 0;

            }

            typeIntro();

        },1200);

    }

}

/* ==========================================================
   INTRO ANIMATION
========================================================== */

function playIntro(){

    if(!introScreen){

        typeHero();

        return;

    }

    introCircle.style.animation =
    "drawCircle 1.4s forwards";

    introPaths.forEach((path,index)=>{

        path.style.animation =
        `drawPath .8s forwards ${0.5 + index*.2}s`;

    });

    setTimeout(()=>{

        introLine.style.animation =
        "expandLine .8s forwards";

    },1200);

    setTimeout(()=>{

        introTitle.style.animation =
        "fadeUp .8s forwards";

    },1450);

    setTimeout(()=>{

        introSubtitle.style.animation =
        "fadeUp .8s forwards";

    },1650);

    setTimeout(()=>{

        introTyping.style.animation =
        "fadeUp .8s forwards";

        typeIntro();

    },1850);

    setTimeout(()=>{

        introScreen.classList.add("hide");

        mainContent.classList.add("show");

        typeHero();

        localStorage.setItem(
            "portfolioVisited",
            "true"
        );

    },5200);

}

/* ==========================================================
   LOAD
========================================================== */

window.addEventListener("load",()=>{

    if(!introScreen){

        typeHero();

        return;

    }

    const visited =
    localStorage.getItem("portfolioVisited");

    if(visited){

        introScreen.remove();

        if(mainContent){

            mainContent.classList.add("show");

        }

        typeHero();

    }else{

        playIntro();

    }

});

/* ==========================================================
   SCROLL MANAGER
========================================================== */

function updateScrollProgress(){

    if(!progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;

}

/* ==========================================================
   HEADER
========================================================== */

function updateHeader(){

    if(!header || !navContainer) return;

    if(window.scrollY > 60){

        header.classList.add("scrolled");

        navContainer.style.padding = "14px 0";

        header.style.boxShadow =
        "0 10px 35px rgba(0,0,0,.18)";

    }else{

        header.classList.remove("scrolled");

        navContainer.style.padding = "20px 0";

        header.style.boxShadow = "none";

    }

}

/* ==========================================================
   BACK TO TOP
========================================================== */

function updateBackToTop(){

    if(!backToTop) return;

    if(window.scrollY > 450){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

}

if(backToTop){

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function updateActiveNavigation(){

    let currentSection = "";

    sections.forEach(section=>{

        const sectionTop =
        section.offsetTop - 150;

        if(window.scrollY >= sectionTop){

            currentSection =
            section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") ===
        "#" + currentSection){

            link.classList.add("active");

        }

    });

}

/* ==========================================================
   SINGLE SCROLL LISTENER
========================================================== */

window.addEventListener("scroll",()=>{

    updateScrollProgress();

    updateHeader();

    updateBackToTop();

    updateActiveNavigation();

});

/* ==========================================================
   THEME MANAGER
========================================================== */

function initializeTheme(){

    if(!themeToggle) return;

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "light"){

        document.body.classList.add("light");

        themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }else{

        themeToggle.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

}

if(themeToggle){

    themeToggle.addEventListener("click",()=>{

        document.body.classList.toggle("light");

        const lightMode =
        document.body.classList.contains("light");

        localStorage.setItem(
            "theme",
            lightMode ? "light" : "dark"
        );

        themeToggle.innerHTML = lightMode
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    });

}

/* ==========================================================
   MOBILE MENU
========================================================== */

function closeMenu(){

    if(!navLinks || !menuBtn) return;

    navLinks.classList.remove("active");

    const icon = menuBtn.querySelector("i");

    if(icon){

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

}

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if(!icon) return;

        if(navLinks.classList.contains("active")){

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }else{

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}

navItems.forEach(link=>{

    link.addEventListener("click",closeMenu);

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeMenu();

    }

});

/* ==========================================================
   PREMIUM SCROLL REVEAL
========================================================== */

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        }

    });

},

{

    threshold:0.15,

    rootMargin:"0px 0px -60px 0px"

}

);

reveals.forEach((element,index)=>{

    element.style.transitionDelay =
    `${index*80}ms`;

    revealObserver.observe(element);

});

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(!target) return;

        e.preventDefault();

        window.scrollTo({

            top:target.offsetTop-85,

            behavior:"smooth"

        });

    });

});

/* ==========================================================
   CURRENT YEAR
========================================================== */

if(yearElement){

    yearElement.textContent =
    new Date().getFullYear();

}
/* ==========================================================
   PERFORMANCE MANAGER
========================================================== */

let ticking = false;

function handleScroll() {

    updateScrollProgress();

    updateHeader();

    updateBackToTop();

    updateActiveNavigation();

    ticking = false;

}

window.addEventListener("scroll", () => {

    if (!ticking) {

        requestAnimationFrame(handleScroll);

        ticking = true;

    }

});

/* ==========================================================
   DESKTOP CURSOR GLOW
========================================================== */

if (window.innerWidth > 992) {

    const cursorGlow = document.createElement("div");

    cursorGlow.className = "cursor-glow";

    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", (e) => {

        cursorGlow.style.left = e.clientX + "px";

        cursorGlow.style.top = e.clientY + "px";

    });

}

/* ==========================================================
   WINDOW RESIZE
========================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        closeMenu();

    }

});

/* ==========================================================
   INITIALIZATION
========================================================== */

function initializePortfolio() {

    initializeTheme();

    updateScrollProgress();

    updateHeader();

    updateBackToTop();

    updateActiveNavigation();

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

}

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePortfolio();

});

/* ==========================================================
   PORTFOLIO LOADED
========================================================== */

console.log(

`%c
███████╗██╗  ██╗ ██████╗  █████╗ ██╗██████╗
██╔════╝██║  ██║██╔═══██╗██╔══██╗██║██╔══██╗
███████╗███████║██║   ██║███████║██║██████╔╝
╚════██║██╔══██║██║   ██║██╔══██║██║██╔══██╗
███████║██║  ██║╚██████╔╝██║  ██║██║██████╔╝
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝
`,

"color:#4F8CFF;font-size:11px;font-weight:bold;"

);

console.log(

"%cPortfolio v1.1.1 Loaded Successfully 🚀",

"color:#22C55E;font-size:14px;font-weight:bold;"

);

console.log(

"%cDesigned & Developed by Syed Madanin Shoaib",

"color:#FFFFFF;font-size:13px;"

);

/* ==========================================================
   END
========================================================== */