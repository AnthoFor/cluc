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
    if (current == 4 ) {
        animatePancarte();
    } 
    return index;
}

export function recalcOnResize() {
TxtAtelierClucWidth = document.getElementById('txtAtelierCluc').offsetWidth;
document.getElementById('txtRetouchesEtCreation').style.width = TxtAtelierClucWidth + 'px';
const rect = needleNav.getBoundingClientRect();
// Calculer le centre de needleNav
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

// const distanceRight = window.innerWidth - rect.right;
kikooDiv.style.left = `${centerX - kikooDiv.offsetWidth / 2}px`;
// kikooDiv.style.top = `${centerY - kikooDiv.offsetHeight / 2}px`;
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
        miniTexteLogoTopLeft.style.opacity = "0";
    } else {
        // affiche le logo en haut a gauche en petit
        logoAccueil.classList.add('mini-top-left');
        setTimeout(function() {
            header.style.background = "rgba(255, 255, 255, 1)";
            miniTexteLogoTopLeft.style.opacity = "1";
        }, 800);
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

export function updateCarousel(newIndex, isAnimatingC, cards, currentIndex, dots, realisationItems) {
    let memberName = document.querySelector(".member-name");
    let memberRole = document.querySelector(".member-role");
	if (isAnimatingC) return;
	isAnimatingC = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	memberName.style.opacity = "0";
	memberRole.style.opacity = "0";

	setTimeout(() => {
		memberName.textContent = realisationItems[currentIndex].name;
		memberRole.textContent = realisationItems[currentIndex].role;
		memberName.style.opacity = "1";
		memberRole.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimatingC = false;
	}, 800);
    return currentIndex;
}

export function handleSwipe(touchStartX, touchEndX, isAnimatingC, cards, currentIndex, dots, realisationItems) {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			currentIndex = updateCarousel(currentIndex + 1, isAnimatingC, cards, currentIndex, dots, realisationItems);
		} else {
			currentIndex = updateCarousel(currentIndex - 1, isAnimatingC, cards, currentIndex, dots, realisationItems);
		}
	}
    return currentIndex;
}

// Permet l'animation du titre de chaque panel
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
// Longueur totale du chemin du "path"
let longueurChemin = Snap.path.getTotalLength(monChemin); 

// Définir la longueur du chemin à 0 au début de l'animation
monChemin.attr({
    "stroke-dasharray": longueurChemin + " " + longueurChemin,
    "stroke-dashoffset": longueurChemin
}); 