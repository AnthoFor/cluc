import { goesToSection, recalcOnResize, menuAnimation, miniLogoShow } from "./functions.js";
//Ecoute du scroll
document.addEventListener('scroll', () => {
    if (window.scrollY == 0) {
        miniLogoShow(1)
    }
});

// Ecouter les Touch
document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;
    // Ignore petits mouvements
    if (Math.abs(deltaY) < 25 || isScrolling) return; 
    isScrolling = true;
    recalcOnResize();
    goesToSection(deltaY)
    // Temps d'attente pour éviter déclenchement multiple
    setTimeout(() => {
        isScrolling = false;
    }, 800); 
})

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
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(0)
    }
    if (e.target.id == 'accueil') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2)
    }
    if (e.target.id == 'prestation') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section2').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2)
    }
    if (e.target.id == 'tarif') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section3').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2)
    }
    if (e.target.id == 'realisation') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section4').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2)
    }
    if (e.target.id == 'horaire') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section5').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2)
    }
    if (e.target.id == 'acces') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section6').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2)
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

AOS.init();

// Var
let collapse = true;
let startY = 0;
let isScrolling = false;