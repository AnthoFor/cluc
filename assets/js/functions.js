// Functions
function isScrollUp(currentOffset, lastKnownOffset) {
    return currentOffset < lastKnownOffset;
}

export function goesToSection() {
    if (window.scrollY == 0) {
        console.log("L'utilisateur est tout en haut du site.");
        // Remet le logo d'origine, supprime la navbar
    } else {
        // le logo se transforme dans la nav bar
        // ---
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

export function toggleScrollListener(enableScroll) {
    if (enableScroll) {
        // Activer l'écoute du défilement
        window.addEventListener('scroll', handleScroll);
    } else {
        // Désactiver l'écoute du défilement
        window.removeEventListener('scroll', handleScroll);
    }
}

function handleScroll(event) {
    event.preventDefault();
}

// Variables/Constantes
let lastKnownOffset = window.scrollY;
let vh = window.innerHeight;
let totalSection = document.querySelectorAll('.nobsContainer').length
let totalVh = vh * totalSection;
let sectionHeight = totalVh / totalSection;