//Variables
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas')

let editando

class Citas {
    constructor() {
        this.citas = []
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita]
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
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
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

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

            //boton Eliminar cita
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn','btn-danger', 'mr-2')
            btnEliminar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            `
            btnEliminar.onclick = () => eliminarCita(id)
            
            //boton Editar cita
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn','btn-primary', 'mr-2')
            btnEditar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            `
            btnEditar.onclick = () => cargarEdicion(cita)


            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

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
}

//valida y agraga nueva cita a la classe Citas
function nuevaCita(e){
    e.preventDefault()

    //extraer info de objeto CitAS
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj

    //validar formulari
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return
    }

    if(editando){
        //imprimir alerta
        ui.imprimirAlerta('Cita editada correctamente')

        //pasar objeto de la cita
        administrarCitas.editarCita({...citaObj})

        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita'
        
        editando = false
    } else {
        //modo "Cita Nueva"

        //generar id unico por cita
        citaObj.id = Date.now()
    
        //crear nueva cita
        administrarCitas.agregarCita({...citaObj})
        /*con "{...citaObj}" hacemos una 'copia' del contenido de 'citaObj' antes de llamar al metodo
            si no se hiciera asi, el metodo agregaria la nueva cita, y las posible citas anteriores
            tendrian los datos de la ultima cita, dado que al metodo se le pasa la 'ultima cita' como tal
        */

        //imprimir alerta
        ui.imprimirAlerta('Cita agregada')
    }

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

function eliminarCita(id){
    //eliminat cita
    administrarCitas.eliminarCita(id)
    //mostrar mensaje
    ui.imprimirAlerta('Cita eliminada')
    //refrescar citas
    ui.imprimirCitas(administrarCitas)
}
//cargar los datos en el formulario para la edición de la cita
function cargarEdicion(cita){
    
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

    //llenar inputs
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    //llenar objeto global (sinó al guardar cambio el formulario detectaria que el objeto esta vacio y saltaria alerta)
    citaObj.mascota = mascota
    citaObj.propietario = propietario
    citaObj.telefono = telefono
    citaObj.fecha = fecha
    citaObj.hora = hora
    citaObj.sintomas = sintomas
    citaObj.id = id

    //cambiar texto boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios'

    editando = true
}