document.addEventListener('DOMContentLoaded', function() { 
    // T -> En el momento que el html se descargue se ejecuta la funcion -> iniciarApp()
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
    
}

function navegacionFija () {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival')

    const body= document.querySelector('body');
    
    // Para saber si ya hemos  dado scroll hasta ese elemento o que ya lo pase -> getBounding
    window.addEventListener('scroll', function() {
        if ( sobreFestival.getBoundingClientRect().bottom < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    // Con esta parte del código vamos a seleccionar todos los elementos en el html que tengan 
    // una clase de navegacion-principal junto con una etiqueta a 

    enlaces.forEach( enlace => {
    // La tercera línea utiliza el método "forEach" para iterar sobre cada enlace en la variable "enlaces".
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); // -> con esto prevenimos la acción por default  y todo el código del los siguientes bloques seran la nueva configuración de un nuevo comportamiento 
        // Tienes que iterar sobre cada uno de los elemento y ir asociando el eventlistener después del for each pero no antes por que tienes el query selector all 

                // const seccion = document.querySelector(e.target.attributes.href.value) -> Esta es la forma de hacerlo de forma mas directa, en la parte inferior podemos ver una forma diferente de hacerlo 
            // Target es a donde le hemos dado click 
            // Gracias a -> .target.atributtes podemos leer los atributos 

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll)
            seccion.scrollIntoView({ behavior: "smooth"});
        })
    })
}

function crearGaleria() { 
    const galeria = document.querySelector('.galeria-imagenes'); // Realmente aqui estamos seleecionando el elemento ul 
    // Iniciamos un bucle que recorrerá un rango de 1 a 12
    for(let i = 1; i <= 12; i++ ) {
        // Creamos un elemento "picture"
        const imagen = document.createElement('picture') 
        // Le asignamos un contenido HTML que incluye tres elementos "source" y un elemento "img"
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
            alt="imagen galeria">
            `;
        // Añadimos el elemento "picture" al elemento con la clase "galeria-imagenes"

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);     
    }

}
function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
        alt="imagen galeria">
    `;
    // Crea el overlay con la imagen 
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove(); 
    }
    //Boton para cerrar el modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove(); 
    }
    overlay.appendChild(cerrarModal)

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}




