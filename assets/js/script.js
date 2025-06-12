import { goesToSection, recalcOnResize, menuAnimation } from "./functions.js";
//Ecoute du scroll
document.addEventListener('scroll', () => {
    if (window.scrollY == 0) {
        miniLogoLeft.classList.remove('opacityPlus');
        miniLogoLeft.classList.add('opacityLess');
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
    if (e.target.id == 'miniLogoLeft' || e.target.id == 'accueil') {
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' })
    }
    if (e.target.id == 'accueil') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' })
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