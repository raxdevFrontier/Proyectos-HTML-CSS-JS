const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')

cargarEventListeners()
function cargarEventListeners() {
    //Cuando se agrega un curso, presionando el botón "Agregar al carrito" 
    listaCursos.addEventListener('click', agregarCurso)
}


//Funciones
function agregarCurso(e) {
    //aplicamos el preventDefault porque "Agregar al carrito" es en realidad un link (con # como enlace)
    // por lo que redirige al inicio de la pagina como comportamiento predeterminado, y hay que eliminar ese comportamiento 
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        console.log('Agregaste al carrito')
    }
}