document.addEventListener('DOMContentLoaded', () => {
    const contrasteButton = document.getElementById('modo-contraste');
    const aumentarTextoButton = document.getElementById('aumentar-texto');
    const disminuirTextoButton = document.getElementById('disminuir-texto');
    const selectorIdioma = document.getElementById('selector-idioma');
    const contenidoDinamico = document.getElementById('contenido-dinamico');

    // High Contrast Mode Toggle
    contrasteButton.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
    });

    // Increase Text Size
    aumentarTextoButton.addEventListener('click', () => {
        const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = `${currentSize + 2}px`;
    });

    // Decrease Text Size
    disminuirTextoButton.addEventListener('click', () => {
        const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = `${Math.max(currentSize - 2, 12)}px`; // Prevent text size smaller than 12px
    });

    // Language Selector
    selectorIdioma.addEventListener('change', (e) => {
        const idioma = e.target.value;
        fetch('lang.json')
            .then((response) => response.json())
            .then((data) => {
                const traducciones = data[idioma];
                contenidoDinamico.querySelector('h2').textContent = traducciones.titulo;
                contenidoDinamico.querySelector('p').textContent = traducciones.mensaje;
            })
            .catch((error) => console.error('Error al cargar las traducciones:', error));
    });
});