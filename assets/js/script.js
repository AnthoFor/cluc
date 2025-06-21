import { goesToSection, recalcOnResize, menuAnimation, miniLogoShow, goToSection2 } from "./functions.js";
//Ecoute du scroll
document.addEventListener('scroll', (e) => {
    if (window.scrollY <= 0) {
        miniLogoShow(1)
    } else {
        miniLogoShow(2)
    }
});

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

window.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
});

window.addEventListener("touchend", e => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;

        if (Math.abs(deltaY) > 50 && !isAnimating) {
            if (deltaY < 0) {
                console.log('section suivante ', current)
                current = goToSection2(current + 1, isAnimating, panels, current); // Swipe up -> section suivante
                console.log('section suivante ', current)
            if (current >= 1) {
                miniLogoShow(2)
            }
            } else {
                console.log('section précédente', current)
                current = goToSection2(current - 1, isAnimating, panels, current); // Swipe down -> section précédente
                console.log('section précédente', current)
                if (current == 0) {
                    miniLogoShow(1)
                }
            }   
    }
});

// Ecouter les Touch
// document.addEventListener('touchstart', (e) => {
//     startY = e.touches[0].clientY;
// });

// document.addEventListener('touchend', (e) => {
//     const endY = e.changedTouches[0].clientY;
//     const deltaY = startY - endY;
//     recalcOnResize();
//     if (Math.abs(deltaY) < 25 || isScrolling) return; 
//     isScrolling = true;
//     goesToSection(deltaY)
//     setTimeout(() => {
//         isScrolling = false;
//     }, 800); 
// })

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
    if (e.target.id == 'logoAccueil' || e.target.id == 'accueil') {
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(1)
        recalcOnResize();
    }
    if (e.target.id == 'accueil') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2)
        recalcOnResize();
    }
    if (e.target.id == 'prestation') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section2').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2);
        recalcOnResize();
    }
    if (e.target.id == 'tarif') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section3').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2);
        recalcOnResize();
    }
    if (e.target.id == 'realisation') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section4').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2);
        recalcOnResize();
    }
    if (e.target.id == 'horaire') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section5').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2);
        recalcOnResize();
    }
    if (e.target.id == 'acces') {
        collapse = collapse ? false : true;
        menuAnimation(true)
        document.querySelector('#section6').scrollIntoView({ behavior: 'smooth' })
        miniLogoShow(2);
        recalcOnResize();
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
    const bulles = document.querySelectorAll('.bulle');
    const images = ['./assets/img/bulle1.svg', './assets/img/bulle2.svg', './assets/img/bulle3.svg', './assets/img/bulle4.svg'];

    bulles.forEach(bulle => {
        const randomIndex = Math.floor(Math.random() * images.length);
        const imagePath = images[randomIndex];
        bulle.style.backgroundImage = `url("${imagePath}")`;
    });
});

AOS.init();

// Pour revenir à l'accueuil en cas de refresh
document.querySelector('#section1').scrollIntoView({ behavior: 'smooth' })
// Permet de faire la même chose qu'AOS sans le decalage
logoAccueil.classList.add('growing');
    setTimeout(() => {
        logoAccueil.style.maxHeight = "33%";
        logoAccueil.classList.remove('growing');
    }, 600);

// Var
let collapse = true;
let startY = 0;
let isScrolling = false;
const panels = document.querySelectorAll(".panel");
let current = 0;
let isAnimating = false;

  // Position initiale de chaque section
panels.forEach((panel, i) => {
    gsap.set(panel, { yPercent: i * 100 });
});