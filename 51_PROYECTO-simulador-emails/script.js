//Es buena practica registrar el evento de "DOMContentLoaded" y trabajar a partir de aqui
// validando que el DOM se carga, y en caso de que así sea, realizar las acciones que se quieran

//En este caso, se valida que se carga el formulario
document.addEventListener('DOMContentLoaded', () => {

    //Seleccion de los inputs del formulario
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')

    //Evento 'blur' que se da cuando salimos de un input
    inputEmail.addEventListener('blur', function(e) {

    })
})