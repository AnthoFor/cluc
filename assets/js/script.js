import { recalcOnResize, menuAnimation, miniLogoShow, goToSection2, animatePancarte } from "./functions.js";
//Ecoute du scroll
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
                console.log('section suivante ', current)
                current = goToSection2(current + 1, isAnimating, panels, current); // Swipe up -> section suivante
                console.log('section suivante ', current)
            } else {
                console.log('section précédente', current)
                current = goToSection2(current - 1, isAnimating, panels, current); // Swipe down -> section précédente
                console.log('section précédente', current)
            }
            if (current == 4 ) {
                animatePancarte();
            }   
    }
});

window.addEventListener('resize', function(e) {
    AOS.refresh();
    console.log('aos refreshed');
    recalcOnResize();
    console.log('section height updated');
})

window.addEventListener('click', function(e){
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

// Permet de faire la même chose qu'AOS sans le decalage
logoAccueil.classList.add('growing');
    setTimeout(() => {
        logoAccueil.style.maxHeight = "33%";
        logoAccueil.classList.remove('growing');
    }, 800);

// Var
let collapse = true;
let startY = 0;
const panels = document.querySelectorAll(".panel");
let current = 0;
let isAnimating = false;


// Initialisation d'AOS
AOS.init();

// Pour revenir à l'accueil en cas de refresh
window.scrollTo({ top: 0, behavior: 'smooth' });

// Position initiale de chaque section
setTimeout(() => {
    panels.forEach((panel, i) => {
    gsap.set(panel, { yPercent: i * 100 });
    });
    // current = goToSection2(0, false, panels, current);
}, 10);

panels[0].style.opacity = 1
