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

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante()
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0 )
        this.restante = this.presupuesto - gastado
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
        }, 2000);
    }

    agregarGastoListado(gastos){

        this.limpiarGastos()

        //Iterar sobre 'gastos'
        gastos.forEach( gasto => {
            const {cantidad, nombre, id} = gasto

            //crear 'li'
            const nuevoGasto = document.createElement('li')
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
            nuevoGasto.dataset.id = id
            //nuevoGasto.setAttribute('data-id', id) //forma equivalente y mas actual a la linea de codigo anterior

            //agregar al HTML
            nuevoGasto.innerHTML = `
                ${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
            `
            //boton para borrar gasto
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.innerHTML = '&times'
            nuevoGasto.appendChild(btnBorrar)

            //agregar al HTML
            gastoListado.appendChild(nuevoGasto)
        })
    }

    limpiarGastos(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }
}

//instanciar clases
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
    const cantidad = Number(document.querySelector('#cantidad').value)

    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error')
        return
    } else if( cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error')
        return
    }

    //generar objeto con gastoi
    const gasto = {nombre, cantidad, id: Date.now()}

    //añadir nuevo gasto
    presupuesto.nuevoGasto(gasto)

    //mensaje de todo OK
    ui.imprimirAlerta('Gasto agregado')

    //Imprimir gastos
    const {gastos, restante} = presupuesto
    ui.agregarGastoListado(gastos)
    ui.actualizarRestante(restante)

    formulario.reset()
}