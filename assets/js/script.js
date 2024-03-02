// Ecouter les scroll (touch) vers le haut
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const vh = window.innerHeight;
    const threshold = 0.05; // Marge de tolérance pour prendre en compte les petites différences

    if (scrollPosition <= vh * threshold) {
        console.log("L'utilisateur est tout en haut du site.");
    } else {
        console.log("L'utilisateur n'est pas tout en haut du site.");
    }
});

// Au moindre mouvement vers le haut, alors affiche la section suivante.

// Pareil au moindre mouvement vers le bas, affiche la section précedente.