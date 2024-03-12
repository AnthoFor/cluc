import { goesToSection, toggleScrollListener } from "./functions.js";

// Ecouter les scroll (touch) vers le haut
window.addEventListener('scroll', function(e) {
    goesToSection();
});