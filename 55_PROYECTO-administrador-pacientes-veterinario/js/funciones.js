import Citas from './classes/Citas.js'
import UI from './classes/Ui.js'

import {    
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from './selectores.js'

const ui = new UI()
const administrarCitas = new Citas()

let editando = false

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
export function datosCita(e){
    citaObj[e.target.name] = e.target.value
}


//valida y agraga nueva cita a la classe Citas
export function nuevaCita(e){
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

export function reiniciarObjeto(){
    citaObj.mascota = ''
    citaObj.propietario = ''
    citaObj.telefono = ''
    citaObj.fecha = ''
    citaObj.hora = ''
    citaObj.sintomas = ''
}

export function eliminarCita(id){
    //eliminat cita
    administrarCitas.eliminarCita(id)
    //mostrar mensaje
    ui.imprimirAlerta('Cita eliminada')
    //refrescar citas
    ui.imprimirCitas(administrarCitas)
}
//cargar los datos en el formulario para la edición de la cita
export function cargarEdicion(cita){
    
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