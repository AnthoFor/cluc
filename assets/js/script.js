import { goesToSection, recalcOnResize } from "./functions.js";

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

AOS.init();