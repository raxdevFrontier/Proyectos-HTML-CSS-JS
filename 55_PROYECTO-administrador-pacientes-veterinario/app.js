//Variables
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas')


class Citas {
    constructor() {
        this.citas = []
    }
}

class UI {
    imprimirAlerta(mensaje, tipo){
        //crear el div
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }

        //añadir mensaje
        divMensaje.textContent = mensaje

        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje,  document.querySelector('.agregar-cita'))

        //quitar alerta
        setTimeout(() => {
            divMensaje.remove()
        }, 2000);
    }
}

const ui = new UI()
const administrarCitas = new Citas()

//Registro de eventos
eventListeners()
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita)
    propietarioInput.addEventListener('input', datosCita)
    telefonoInput.addEventListener('input', datosCita)
    fechaInput.addEventListener('input', datosCita)
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)

    formulario.addEventListener('submit', nuevaCita)
    
}

//Objeto con info de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//agrega datos al objeto de cita
function datosCita(e){
    citaObj[e.target.name] = e.target.value

    console.log(citaObj)
}

//valida y agraga nueva cita a la classe Citas
function nuevaCita(e){
    e.preventDefault()

    //extraer info de objeto CitAS
    const {mascota, propietarios, telefono, fecha, hora, sintomas} = citaObj

    //validar formulari
    if(mascota === '' || propietarios === '' || telefono === '' || fecha === '' || hora === '' || sintomas){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return
    }

    //crear nueva cita
    
}