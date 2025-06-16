gsap.registerPlugin(MotionPathPlugin);

export function goesToSection(deltaY, isScrolling) {
    // let totalSections = 5;
    const currentSection = Math.round(window.scrollY / sectionHeight);
    let targetSection = currentSection;

    if (deltaY > 0) {
        // swipe vers le haut → aller vers section suivante
        targetSection = Math.min(currentSection + 1, totalSection - 1);
    } else {
        // swipe vers le bas → aller vers section précédente
        targetSection = Math.max(currentSection - 1, 0);
    }

    const targetId = `section${targetSection + 1}`;
    const targetEl = document.getElementById(targetId);

    if (targetId) {
        miniLogoShow(targetSection+1);
        targetEl.scrollIntoView({ behavior: 'smooth' });
    }
}

export function recalcOnResize() {
vh = vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
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
    if (collapse) {
        needleNav.classList.remove('needleToVertical');
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

export function miniLogoShow(targetSection) {
    if (targetSection == 1) {
        // Enleve le logo
        logoAccueil.classList.remove('mini-top-left');
    } else {
        // affiche le logo
        logoAccueil.classList.add('mini-top-left');
    }
}

// Var
let TxtAtelierClucWidth = document.getElementById('txtAtelierCluc').offsetWidth;
document.getElementById('txtRetouchesEtCreation').style.width = TxtAtelierClucWidth + 'px';
let vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
let totalSection = document.querySelectorAll('.nobsContainer').length
let totalVh = vh * totalSection;
let sectionHeight = totalVh / totalSection;
let countMenu = false;
let svg = Snap("#svgCalque");
let monChemin = svg.select("#path");
let longueurChemin = Snap.path.getTotalLength(monChemin); // Longueur totale du chemin du "path"

// Définir la longueur du chemin à 0 au début de l'animation
monChemin.attr({
    "stroke-dasharray": longueurChemin + " " + longueurChemin,
    "stroke-dashoffset": longueurChemin
}); 