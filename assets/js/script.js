import { goesToSection, recalcOnResize, menuAnimation } from "./functions.js";

// Ecouter les scroll (touch) vers le haut
window.addEventListener('scroll', function(e) {
    goesToSection();
});

window.addEventListener('resize', function(e) {
    AOS.refresh();
    console.log('aos refreshed');
    recalcOnResize();
    console.log('section height updated');
})

window.addEventListener('click', function(e){
    if (e.target.id == 'needleNav' || e.target.id == "svgCalque" || e.target.id == "needleCross") {        
        if (collapse) {
            collapse = false;
        } else {
            collapse = true;
        }
        menuAnimation(collapse)
    }
})

AOS.init();

document.addEventListener('DOMContentLoaded', function() {
    recalcOnResize();
});

let collapse = true;