//Variables y selectores
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')


//Eventos
eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
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

}

//instanciar+
const ui = new UI()
let presupuesto 

//Funciones
// mostrar alerta para preguntar presupuesto incial, antes de cargar HTML
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cuál es su presupuesto?')

    console.log(presupuestoUsuario)

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload()
    }

    //Presupuesto valido
    //instanciamos la class Presupuesto
    presupuesto = new Presupuesto(presupuestoUsuario)
}