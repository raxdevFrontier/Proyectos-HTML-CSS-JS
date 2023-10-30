//Es buena practica registrar el evento de "DOMContentLoaded" y trabajar a partir de aqui
// validando que el DOM se carga, y en caso de que así sea, realizar las acciones que se quieran

//En este caso, se valida que se carga el formulario
document.addEventListener('DOMContentLoaded', () => {

    //Se crea objeto donde guardaremos contenido de los diferentes campos del formulario
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccion de los inputs del formulario
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')

    //Evento 'blur' que se da cuando salimos de un input
    // inputEmail.addEventListener('blur', validar)
    // inputAsunto.addEventListener('blur', validar)
    // inputMensaje.addEventListener('blur', validar)
    //Para una experiencia i validacion más en "tiempo real" al momento, 
    // se puede usar el evento 'input' en los eventListener:
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    //NOTA 1: si llamasemos a la funcion 'validar()' con los '()' en los eventListener,
    // esto ejecutaria la funcion directamente antes de que se diese el evento y daria un error

    //NOTA 2: cuando se usa un evento dentro de una función, al definir ésta 
    // se puede establecer como valor de entrada, y usarlo dentro de la funcion, 
    // pero no es necesario ponerlo cuando se llama a esta en el eventListener, 
    // porque cuando se de el evento, ya existirá dentro y se podrá usar sin problema 
    function validar(e){
        const inputVal = e.target.value
        const inputId = e.target.id
        //Se valida si el valor de input esta vacío
        // con 'trim()' eliminamos los espacios en blanco antes y después de del value
        // y en caso de que se escriban solo espacios en blanco, los eliminará,
        // dando como resultado que el campo esta vació
        if(inputVal.trim() === ''){
            mostrarAlerta(`El campo ${inputId} es obligatorio`, e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        if(inputId === 'email' && !validarEmail(inputVal)){
            mostrarAlerta('El email no es valido', e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }

        limpiarAlerta(e.target.parentElement)

        //Asignar valor del input al obejto 'email' creado al principio
        // una vez se haya pasado la validacion previa
        // para ello consultamos la propieda 'name' (mediante "e.target.name") 
        // de cada input para almacenar correctamente los valores
        email[e.target.name] = inputVal.trim().toLowerCase()

        //comporbamos Email
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia){
        
        limpiarAlerta(referencia)

        //Generar alerta en HTML
        const error = document.createElement('p')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        //Comprobar si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove()
        }
    }

    function validarEmail(email){
        //Expresion regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email) //evaluamos la expresion regular, 
        //y devolvera 'true' o 'false' en funcion si se cumlple dicha exp. regular
    }

    function comprobarEmail(){
        //Con 'Object.values(email)' se nos devuelve un array con los valores del obj 'email'
        // y con ".includes('')" evaluamos si alguno de los elementos del array devuelto esta vacío
        // devolciendo 'true' en cuando esto suceda, y por el contrario devolviendo 'false' 
        // cuando todos los campos esten rellenados
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return
        } 
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false
    }
})