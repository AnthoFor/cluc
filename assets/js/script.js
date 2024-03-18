import { goesToSection, recalcOnResize } from "./functions.js";
gsap.registerPlugin(MotionPathPlugin);

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
            gsap.to("#rect", {
                motionPath: {
                    path: "#path",
                    align: "#path",
                    autoRotate: true,
                    alignOrigin: [0, 0],
                    yoyo:true,
                    curviness:2,
                    start: 1,
                    end: 0
                },
                transformOrigin: "80% 0%",
                duration: 0.4,
            });
            countMenu = true;
            setTimeout(function() {
                svgCalque.style.display = "none";
            }, 400);
            
        } else {
            let translateX = countMenu ? 2 : 0;
            needleNav.classList.add('needleToVertical')
            needleNav.classList.remove('needleToHorizontal');
            monChemin.animate({
                "stroke-dashoffset": 1
            }, 400);
            gsap.to("#rect", {
                motionPath: {
                    path: "#path",
                    align: "#path",
                    autoRotate: true,
                    alignOrigin: [translateX, 0],
                    yoyo:true,
                    curviness:2,
                },
                transformOrigin: "80% 0%",
                duration: 0.4,
            });
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

let countMenu = false;