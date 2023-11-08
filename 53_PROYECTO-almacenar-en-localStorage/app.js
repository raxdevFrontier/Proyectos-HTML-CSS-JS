//Variable
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []


//Event Listeners
eventListeners()

function eventListeners() {
    //cuando el usuario agrega un nuevo twwet
    formulario.addEventListener('submit', agregarTweet)

    //cuando el documento este cargado
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []
        /* Para poder llamar a la funcion 'crearHTML()' 
        y generar el html de los tweets que ya se agregaron en el pasado (y que se encuentran el el localStorage)
        se añade a la linia 16 la parte de: "|| []" para que, en caso de que la parte izquierda tenga un valor 'null'
        se asigne a 'tweets' un array vacio. 
        Porque sinó la funcion daria error en el moemnto de evaluar si el array esta vacio o no con 'length' */

        crearHTML()
    })
}




//Funciones
function agregarTweet(e){
    e.preventDefault()

    //recogemos el texto que el usuario escribe en el textarea
    // const tweet = document.querySelector('#tweet').value
    const tweet = document.querySelector('#tweet').value

    //validación del texto
    if(tweet === ''){
        mostrarError('No se puede agregar tweets vacios', e.target)
        return
    }

    //añadir a lista de Tweets
    const tweetObj = {
        id: Date.now(),
        tweet: tweet 
        // tweet
        /*recientement en JS se ha añadido que si al crear un obj 
        se usa la misma palabra para la clave y el valor de una propiedad
        la sitaxis puede pasar de ser -> "palabra: palabra"
        a ser -> "palabra" ( a secas )
        */
    }

    //añadir tweet al arreglo de tweets
    tweets = [...tweets, tweetObj]

    //agregar HTML de la lista de Tweets
    crearHTML()

    //reiniciar formulari
    formulario.reset()
}

function mostrarError(error, referencia){

    limpiarError(referencia)
    
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    // const contenido = document.querySelector('#contenido')
    formulario.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}

function limpiarError(referencia){
    const alerta = referencia.querySelector('.error')
    if(alerta){
        alerta.remove()
    }
}

//añadir HTML de los tweets que se quieren añadir
function crearHTML(){

    limpiarHTML()

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //crear el HTML
            const li = document.createElement('li')
            li.innerText = tweet.tweet
            listaTweets.appendChild(li)
        })
    }
    sincronizarStorage()
}

//agregar tweets al localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//limpiar HTML lista tweets
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}