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

window.addEventListener('click', function(e){
    if (e.target.id == 'needleNav' || e.target.id == "svgCalque") {
        svgCalque.style.display = "initial";
        if (needleNav.classList.contains('needleToVertical')) {
            needleNav.classList.remove('needleToVertical')
            needleNav.classList.add('needleToHorizontal');
            monChemin.animate({
                "stroke-dashoffset": longueurChemin
            }, 400);
        } else {
            needleNav.classList.add('needleToVertical')
            needleNav.classList.remove('needleToHorizontal');
            monChemin.animate({
                "stroke-dashoffset": 1
            }, 400);
        }
    }
})

AOS.init();

var svg = Snap("#svgCalque");
var monChemin = svg.select("#path");

// Longueur totale du chemin du "path"
var longueurChemin = Snap.path.getTotalLength(monChemin);

// Définir la longueur du chemin à 0 au début de l'animation
monChemin.attr({
    "stroke-dasharray": longueurChemin + " " + longueurChemin,
    "stroke-dashoffset": longueurChemin
});