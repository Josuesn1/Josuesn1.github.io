document.addEventListener('DOMContentLoaded', () => {
    const contrasteButton = document.getElementById('modo-contraste');
    const aumentarTextoButton = document.getElementById('aumentar-texto');
    const disminuirTextoButton = document.getElementById('disminuir-texto');
    const botonesNavegacion = document.querySelectorAll('.nav-btn');
    const secciones = document.querySelectorAll('main > section');
    const selectorIdioma = document.getElementById('selector-idioma');
    const elementosTraducibles = document.querySelectorAll('[data-translate]');

    let fontSize = 100; // Tamaño base del texto en porcentaje.

    // Modo Alto Contraste
    contrasteButton.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
    });

    // Cambiar tamaño de texto
    aumentarTextoButton.addEventListener('click', () => {
        if (fontSize < 150) { // Límite máximo: 150%
            fontSize += 10;
            document.body.style.fontSize = `${fontSize}%`;
        }
    });

    disminuirTextoButton.addEventListener('click', () => {
        if (fontSize > 70) { // Límite mínimo: 70%
            fontSize -= 10;
            document.body.style.fontSize = `${fontSize}%`;
        }
    });



    // Función para alternar entre secciones
    const mostrarSeccion = (id) => {
        secciones.forEach((seccion) => {
            seccion.classList.add('seccion-oculta');
            seccion.classList.remove('seccion-activa');
        });
        const seccionSeleccionada = document.getElementById(id);
        if (seccionSeleccionada) {
            seccionSeleccionada.classList.add('seccion-activa');
            seccionSeleccionada.classList.remove('seccion-oculta');
        }
    };

    // Función para traducir contenido
    const traducirPagina = (idioma) => {
        fetch('lang.json')
            .then((response) => response.json())
            .then((data) => {
                const traducciones = data[idioma];
                elementosTraducibles.forEach((elemento) => {
                    const clave = elemento.getAttribute('data-translate');
                    if (traducciones[clave]) {
                        elemento.textContent = traducciones[clave];
                    }
                });
            })
            .catch((error) => console.error('Error al cargar las traducciones:', error));
    };

    // Eventos
    botonesNavegacion.forEach((boton) => {
        boton.addEventListener('click', () => {
            const seccionId = boton.dataset.section;
            mostrarSeccion(seccionId);
        });
    });

    selectorIdioma.addEventListener('change', (e) => {
        traducirPagina(e.target.value);
    });
});



