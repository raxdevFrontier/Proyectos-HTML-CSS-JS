const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')

cargarEventListeners()
function cargarEventListeners() {
    //Cuando se agrega un curso, presionando el botón "Agregar al carrito" 
    listaCursos.addEventListener('click', agregarCursoBtn)
}


//FUNCIONES
//Accediendo al botón "Agregar al carrito"
function agregarCursoBtn(e) {
    //aplicamos el preventDefault porque "Agregar al carrito" es en realidad un link (con # como enlace)
    // por lo que redirige al inicio de la pagina como comportamiento predeterminado, y hay que eliminar ese comportamiento 
    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCurso(cursoSeleccionado)
    }
}

//Funcion para leer los datos del curso que se quiere agregar al carrito
function leerDatosCurso(curso) {
    
    //Creamos objeto con datos del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(infoCurso)
}