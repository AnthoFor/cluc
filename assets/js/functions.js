gsap.registerPlugin(MotionPathPlugin);

// Functions
function isScrollUp(currentOffset, lastKnownOffset) {
    return currentOffset < lastKnownOffset;
}

export function goesToSection() {
    if (window.scrollY == 0) {
        console.log("L'utilisateur est tout en haut du site.");
    } else {
        // Au moindre mouvement vers le haut, alors affiche la section suivante.
        if (isScrollUp(window.scrollY, lastKnownOffset)) {
            if (window.scrollY < (sectionHeight * 4) && window.scrollY > (sectionHeight * 3)) {
                console.log("en haut vers section 4");
            } else if (window.scrollY < (sectionHeight * 3) && window.scrollY > (sectionHeight * 2)) {
                console.log("en haut vers section 3")
            } else if (window.scrollY < (sectionHeight * 2) && window.scrollY > (sectionHeight)) {
                console.log("en haut vers section 2")
            } else if (window.scrollY < sectionHeight) {
                console.log("en haut vers section 1")
            }
        // Pareil au moindre mouvement vers le bas, affiche la section précedente.
        } else {
            if (window.scrollY > 0 && window.scrollY <= totalVh / totalSection) {
                console.log("en bas vers section 2");
            } else if (window.scrollY > sectionHeight && window.scrollY < sectionHeight * 2) {
                console.log("en bas vers section 3");
            } else if (window.scrollY > (sectionHeight * 2) && window.scrollY < sectionHeight * 3) {
                console.log("en bas vers section 4");
            } else if (window.scrollY > (sectionHeight * 3) && window.scrollY < sectionHeight * 4) {
                console.log("en bas vers section 5");
            }
        }
    }
    lastKnownOffset = window.scrollY;
}

export function recalcOnResize() {
vh = window.innerHeight;
totalSection = document.querySelectorAll('.nobsContainer').length
totalVh = vh * totalSection;
sectionHeight = totalVh / totalSection;
TxtAtelierClucWidth = document.getElementById('txtAtelierCluc').offsetWidth;
document.getElementById('txtRetouchesEtCreation').style.width = TxtAtelierClucWidth + 'px';
const rect = needleNav.getBoundingClientRect();
const distanceRight = window.innerWidth - rect.right;
kikooDiv.style.right = (distanceRight / 10) + 'px';
}

export function menuAnimation(collapse) {
    console.log(collapse);
    if (collapse) {
        needleNav.classList.remove('needleToVertical')
        needleNav.classList.add('needleToHorizontal');
        monChemin.animate({
            "stroke-dashoffset": longueurChemin
        }, 500);
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
            duration: 0.5,
        });
        countMenu = true;
        setTimeout(function() {
            svgCalque.style.opacity = "0";
        }, 500);
        needleCross.classList.remove('opacityPlus');
        needleCross.classList.add('opacityLess');
    } else {
        // Pas compris le décalage, mais besoin de décaler à partir du 2e trigger
        let translateX = countMenu ? 2 : 0;
        svgCalque.style.display = "initial";
        needleNav.classList.add('needleToVertical')
        needleNav.classList.remove('needleToHorizontal');
        monChemin.animate({
            "stroke-dashoffset": 1
        }, 500);
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
            duration: 0.5,
        });
        svgCalque.style.opacity = "100"
        needleCross.classList.add('opacityPlus');
        needleCross.classList.remove('opacityLess');
    }
}

// Var
let lastKnownOffset = window.scrollY;
let TxtAtelierClucWidth = document.getElementById('txtAtelierCluc').offsetWidth;
document.getElementById('txtRetouchesEtCreation').style.width = TxtAtelierClucWidth + 'px';
let vh = window.innerHeight;
let totalSection = document.querySelectorAll('.nobsContainer').length
let totalVh = vh * totalSection;
let sectionHeight = totalVh / totalSection;
let countMenu = false;
let svg = Snap("#svgCalque");
let monChemin = svg.select("#path");
let longueurChemin = Snap.path.getTotalLength(monChemin); // Longueur totale du chemin du "path"

monChemin.attr({
    "stroke-dasharray": longueurChemin + " " + longueurChemin,
    "stroke-dashoffset": longueurChemin
}); // Définir la longueur du chemin à 0 au début de l'animation