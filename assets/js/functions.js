gsap.registerPlugin(MotionPathPlugin);

export function goToSection2(index, isAnimating, panels, current) {
    if (index < 0) {
        index = 0;
    }
    if(index > panels.length - 1) {
        index = panels.length - 1;
    }
    if (isAnimating || index < 0 || index >= panels.length) return;
    isAnimating = true;
    
    panels.forEach((panel, i) => {
        if (i === index) {
            gsap.to(panel, { opacity: 1 });
        }
    });

    gsap.to(panels, {
      yPercent: i => (i - index) * 100,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => 
        isAnimating = false
    });

    miniLogoShow(index === 0 ? 1 : 2);
    current = index;
    if (index > 0) {
        animateActiveSection(panels[index]);
    }
    return index;
}

export function recalcOnResize() {
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
        svgCalque.style.opacity = "1"
        needleCross.classList.add('opacityPlus');
        needleCross.classList.remove('opacityLess');
    }
}

export function miniLogoShow(targetSection) {
    if (targetSection == 1) {
        // Remet le logo en gros au milieu
        header.style.background = "transparent";
        logoAccueil.classList.remove('mini-top-left');
        console.log("grossis le logo")
        miniTexteLogoTopLeft.style.opacity = "0";
    } else {
        // affiche le logo en haut a gauche en petit
        logoAccueil.classList.add('mini-top-left');
        setTimeout(function() {
            header.style.background = "rgba(255, 255, 255, 1)";
            miniTexteLogoTopLeft.style.opacity = "1";
        }, 800);
        console.log("rapetisse le logo")
    }
}

export function animatePancarte() {
    gsap.to("#svgWrapperHoraire img", {  
        keyframes: [
        { rotation: 15, duration: 0 },
        { rotation: -12, duration: 1 },
        { rotation: 9, duration: 1 },
        { rotation: -6, duration: 1 },
        { rotation: 3, duration: 1 },
        { rotation: 0, duration: 1 },
        ],
        ease: "power2.out"
        });
}

function animateActiveSection(panel) {
    gsap.fromTo(panel.querySelector('.sectionTitleLogo'), 
        { opacity: 0, x: -2500 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay:0.2 }
    );
}

// Var
let TxtAtelierClucWidth = document.getElementById('txtAtelierCluc').offsetWidth;
document.getElementById('txtRetouchesEtCreation').style.width = TxtAtelierClucWidth + 'px';
let countMenu = false;
let svg = Snap("#svgCalque");
let monChemin = svg.select("#path");
let longueurChemin = Snap.path.getTotalLength(monChemin); // Longueur totale du chemin du "path"

// Définir la longueur du chemin à 0 au début de l'animation
monChemin.attr({
    "stroke-dasharray": longueurChemin + " " + longueurChemin,
    "stroke-dashoffset": longueurChemin
}); 