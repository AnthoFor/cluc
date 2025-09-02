import { recalcOnResize, menuAnimation, miniLogoShow, goToSection2, animatePancarte, updateCarousel, handleSwipe } from "./functions.js";
// VAR
let collapse = true;
let startY = 0;
const panels = document.querySelectorAll(".panel");
// le current global de la page pour swipe entre les sections
let current = 0;
let isAnimating = false;
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
// index du caroussel de réalisations
let currentIndex = 0;
let isAnimatingC = false;
const realisationItems = [
	{ name: "Création", role: "Cul sec, gardez votre fessier au sec" },
	{ name: "Création", role: "Chouchou" },
	{ name: "Création", role: "Etiquettes à bagages personalisées" },
	{ name: "Réparation", role: "Manteau sauvé" },
	{ name: "Création", role: "Furoshiki, emballage cadeau en tissu" },
	{ name: "Création", role: "Sac à pain" }
];
let touchStartX = 0;
let touchEndX = 0;

// EVENTLISTENER 
document.addEventListener('scroll', (e) => {
    if (window.scrollY <= 0) {
        miniLogoShow(1)
    } else {
        miniLogoShow(2)
    }
});

// empeche le pull to refresh qui empechait de pouvoir remonter dans les sections
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

window.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
});

window.addEventListener("touchend", e => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;
        if (Math.abs(deltaY) > 50 && !isAnimating) {
            if (deltaY < 0) {
                current = goToSection2(current + 1, isAnimating, panels, current); // Swipe up -> section suivante
            } else {
                current = goToSection2(current - 1, isAnimating, panels, current); // Swipe down -> section précédente
            }
    }
});

window.addEventListener('wheel', (e) => {
    const delta = e.deltaY;
    if (delta > 0) {
            // lastScrollDirection = 'down';
            console.log('Scroll vers le bas');
            current = goToSection2(current + 1, isAnimating, panels, current);
    } else if (delta < 0) {
            // lastScrollDirection = 'up';
            console.log('Scroll vers le haut');
            current = goToSection2(current - 1, isAnimating, panels, current);
    }
});

window.addEventListener('resize', function(e) {
    AOS.refresh();
    recalcOnResize();
})

window.addEventListener('click', function(e){
    console.log(e.target.id);
    if (e.target.id == 'needleNav' || e.target.id == "svgCalque" || e.target.id == "needleCross") {        
        collapse = collapse ? false : true;
        menuAnimation(collapse)
    }
    if (e.target.id == 'logoAccueil' || e.target.id == 'accueil') {
        current = goToSection2(0, false, panels, current);
    }
    if (e.target.id == 'accueil') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        current = goToSection2(0, false, panels, current);
    }
    if (e.target.id == 'prestation') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        current = goToSection2(1, false, panels, current);
    }
    if (e.target.id == 'tarif') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        current = goToSection2(2, false, panels, current);
    }
    if (e.target.id == 'realisation') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        current = goToSection2(3, false, panels, current);
    }
    if (e.target.id == 'horaire') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        current = goToSection2(4, false, panels, current);
        animatePancarte();
    }
    if (e.target.id == 'acces') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        current = goToSection2(5, false, panels, current);
    }
})

document.addEventListener('keydown', function(event) { 
    if (event.key === 'Escape') {
        if (needleNav.classList.contains('needleToVertical')) {
            menuAnimation(true)
            collapse = collapse ? false : true;
        }
    }
})

document.addEventListener('DOMContentLoaded', function() {
    recalcOnResize();
});

leftArrow.addEventListener("click", () => {
	currentIndex = updateCarousel(currentIndex - 1, isAnimatingC, cards, currentIndex, dots, realisationItems);
});

rightArrow.addEventListener("click", () => {
	currentIndex = updateCarousel(currentIndex + 1, isAnimatingC, cards, currentIndex, dots, realisationItems);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		currentIndex = updateCarousel(i, isAnimatingC, cards, currentIndex, dots, realisationItems);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		currentIndex = updateCarousel(i, isAnimatingC, cards, currentIndex, dots, realisationItems);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		currentIndex = updateCarousel(currentIndex - 1, isAnimatingC, cards, currentIndex, dots, realisationItems);
	} else if (e.key === "ArrowRight") {
		currentIndex = updateCarousel(currentIndex + 1, isAnimatingC, cards, currentIndex, dots, realisationItems);
	}
});

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	currentIndex = handleSwipe(touchStartX, touchEndX, isAnimatingC, cards, currentIndex, dots, realisationItems);
});

// Permet de faire la même chose qu'AOS sans le decalage
logoAccueil.classList.add('growing');
    setTimeout(() => {
        logoAccueil.style.maxHeight = "33%";
        logoAccueil.classList.remove('growing');
    }, 800);



// Initialisation d'AOS
AOS.init();

// Pour revenir à l'accueil en cas de refresh
window.scrollTo({ top: 0, behavior: 'smooth' });

// Position initiale de chaque section
setTimeout(() => {
    panels.forEach((panel, i) => {
    gsap.set(panel, { yPercent: i * 100 });
    });
}, 10);

panels[0].style.opacity = 1



updateCarousel(0, isAnimatingC,cards, currentIndex, dots, realisationItems);
