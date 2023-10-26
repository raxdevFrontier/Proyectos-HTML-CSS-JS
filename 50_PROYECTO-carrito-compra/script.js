const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')

let articulosCarrito = []

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

    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe) {
        //Si el curso agregado ya estaba en el carrito -> actualizamos la propiedad "cantidad" 
        const cursos = articulosCarrito.map( curso => {
            //Con el .map() iteramos el array de objetos, y nos devuelve un nuevo array
            if(curso.id === infoCurso.id){
                /*Si identificamos que el curso que se quiere agregar (infoCurso), 
                 * coincide con el curso iterado (curso), es decir que ya se encontraba 
                 * en el array del carrito 'articulosCarrito', entonces:
                 * se incrementa la propiedad 'cantidad' en 1 del curso que ya se encontraba en el carrito
                 * y se devuelve el curso con el valor actualizado
                 */
                curso.cantidad++
                return curso
            } else {
                /*Por el contrario, el curso que se quiere agregar (infoCurso), 
                 * NO coincide con el curso iterado (curso)d el array del carrito, entonces:
                 * se devuelve el curso, para poder ser agregado
                 */
                return curso
            }
        })
        articulosCarrito = [...cursos]
    } else {
        //Si el curso agregado No estaba en el carrito -> lo agregamos al carrito 
        //Agregamos info del curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }


    carritoHTML()
}

//Funciona para generar el HTML con los datos del curso en el cuadro del carrito de compras
function carritoHTML() {
    //Previamente, antes de crear y añadir el nuevo HTML, limpiaremos éste vaciando el carrito
    /*Porque al usar más adelante .appendChil() éste lo agrega al tbody, pero si agregamos otro curso
     * el carrito tendrá dos cursos, por lo que añadirá esos dos cursos, manteniendo, y por ende duplicando,
     * el primer curso agregado previamente
     */
    limpiarHTML()

    //recorremos el carrito y generamos el html
    articulosCarrito.forEach( curso => {

        //hay que crear una fila por cada curso en el tbody del html
        const row = document.createElement('tr')

        // row.innerHTML = `
        //     <td><img src="${curso.imagen}" width="100"></td>
        //     <td>${curso.titulo}</td>
        //     <td>${curso.precio}</td>
        //     <td>${curso.cantidad}</td>
        //     <td>
        //         <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
        //     </td>`

        //Es recomendable que una vez el codigo funcione, se intenter aplica 'Destructuring'
        // de este modo quedará un codigo más limpio
        const {imagen, titulo, precio, cantidad, id} = curso
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>`

        //Agregar el HTML creado em el tbody del carrito
        contenedorCarrito.appendChild(row)
    })
}

//Eliminar cursos del tbody del carrito
function limpiarHTML() {
    //Forma lenta de "limpiar"
    // contenedorCarrito.innerHTML = ''

    //Forma más optima para la performance
    /*El codigo de a continuación, evaluará si el elemento 'contendorCarrito' tiene un primer elemento hijo,
     * en caso de que así sea, eliminará el primer elemento hijo que haya. 
     * Y así hasta que 'contendorCarrito' no tenga más elementos hijos
     */
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}