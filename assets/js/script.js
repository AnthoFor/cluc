import { goesToSection, recalcOnResize, menuAnimation } from "./functions.js";

// Ecouter les Touch
document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;
    if (Math.abs(deltaY) < 40) return; // Ignore petits mouvements
    isScrolling = true;
    goesToSection(deltaY)
    setTimeout(() => {
        isScrolling = false;
    }, 800); // Temps d'attente pour éviter déclenchement multiple
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