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

    agregarCita(cita){
        this.citas = [...this.citas, cita]
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

    imprimirCitas({citas}){

        this.limpiarHTML()

        citas.forEach(cita => {
            const {mascota, propietarios, telefono, fecha, hora, sintomas, id} = cita

            const divCita = document.createElement('div')
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id

            //scripting de la cita
            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `
                <span class='font-weight-bolder'>Propietario: ${propietario}</span>
            `
            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `
                <span class='font-weight-bolder'>Telefono: ${telefono}</span>
            `
            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `
                <span class='font-weight-bolder'>Fecha: ${fecha}</span>
            `
            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `
                <span class='font-weight-bolder'>Hora: ${hora}</span>
            `
            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `
                <span class='font-weight-bolder'>Sintomas: ${sintomas}</span>
            `

            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)

            contenedorCitas.appendChild(divCita)
        })
    }
    
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
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

    //generar id unico por cita
    citaObj.id = Date.now()

    //crear nueva cita
    administrarCitas.agregarCita({...citaObj})
    /*con "{...citaObj}" hacemos una 'copia' del contenido de 'citaObj' antes de llamar al metodo
        si no se hiciera asi, el metodo agregaria la nueva cita, y las posible citas anteriores
        tendrian los datos de la ultima cita, dado que al metodo se le pasa la 'ultima cita' como tal
    */

    //reiniciar objeto para la validación
    reiniciarObjeto()

    formulario.reset()

    //mostrar HTML de las citas
    ui.imprimirCitas(administrarCitas)
}

function reiniciarObjeto(){
    citaObj.mascota = ''
    citaObj.propietario = ''
    citaObj.telefono = ''
    citaObj.fecha = ''
    citaObj.hora = ''
    citaObj.sintomas = ''
}