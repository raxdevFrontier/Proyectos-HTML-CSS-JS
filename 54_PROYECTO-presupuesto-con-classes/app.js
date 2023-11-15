//Variables y selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')


//Eventos
eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)

    formulario.addEventListener('submit', agregarGasto)
}


//Classes
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
    }
}
class UI {
    insertarPresupuesto(cantidad){
        //extraer valores del objeto 'Presupuesto' 
        const { presupuesto, restante } = cantidad

        //agregar al HTML
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
    }

    imprimirAlerta(mensaje, tipo){
        //crear el div
        const divAlerta = document.createElement('div')
        divAlerta.classList.add('text-center', 'alert')

        if(tipo === 'error'){
            divAlerta.classList.add('alert-danger')
        } else {
            divAlerta.classList.add('alert-success')
        }

        //añadir mensaje
        divAlerta.textContent = mensaje

        //insertar en el HTML
        document.querySelector('.primario').insertBefore(divAlerta, formulario)

        //quitar alerta
        setTimeout(() => {
            divAlerta.remove()
        }, 3000);
    }
}

//instanciar+
const ui = new UI()
let presupuesto 

//Funciones
// mostrar alerta para preguntar presupuesto incial, antes de cargar HTML
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cuál es su presupuesto?')

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload()
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario)

    ui.insertarPresupuesto(presupuesto)
}

//añade gastos
function agregarGasto(e){
    e.preventDefault()

    //leer formulario
    const nombre = document.querySelector('#gasto').value
    const cantidad = document.querySelector('#cantidad').value

    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error')
        return
    } else if( cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error')
        return
    }
}