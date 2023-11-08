//Variable
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []


//Event Listeners
eventListeners()

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet)
}




//Funciones
function agregarTweet(e){
    e.preventDefault()

    //recogemos el texto que el usuario escribe en el textarea
    // const tweet = document.querySelector('#tweet').value
    const tweet = document.querySelector('#tweet').value

    //validación del texto
    if(tweet === ''){
        mostrarError('No se puede agregar tweets vacios')
        return
    }
}

function mostrarError(error){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    // const contenido = document.querySelector('#contenido')
    formulario.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}