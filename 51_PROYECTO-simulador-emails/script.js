//Es buena practica registrar el evento de "DOMContentLoaded" y trabajar a partir de aqui
// validando que el DOM se carga, y en caso de que así sea, realizar las acciones que se quieran

//En este caso, se valida que se carga el formulario
document.addEventListener('DOMContentLoaded', () => {

    //Seleccion de los inputs del formulario
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')

    //Evento 'blur' que se da cuando salimos de un input
    inputEmail.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)
    //NOTA 1: si llamasemos a la funcion 'validar()' con los '()' en los eventListener,
    // esto ejecutaria la funcion directamente antes de que se diese el evento y daria un error

    //NOTA 2: cuando se usa un evento dentro de una función, al definir ésta 
    // se puede establecer como valor de entrada, y usarlo dentro de la funcion, 
    // pero no es necesario ponerlo cuando se llama a esta en el eventListener, 
    // porque cuando se de el evento, ya existirá dentro y se podrá usar sin problema 
    function validar(e){
        console.log(e.target.value)
        return e.target.value
    }
})