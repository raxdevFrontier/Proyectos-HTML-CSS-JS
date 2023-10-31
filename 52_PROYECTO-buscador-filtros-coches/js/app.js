//Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

//contenedor para los resultados de la busqueda
const resultado = document.querySelector('#resultado')

const maxYear = new Date().getFullYear()    // 'getFullYear()' devuelve el año actual - de este modo establecemos la fecha maxima 
const minYear = maxYear - 10                // suponemos que solo tendremos coches de los ultimos 10 años, de modo que le restamos 10 años a la fecha actual

//generar obj con la busqueda a realizar
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    //muestra lista de coches al cargar
    mostrarAutors() 

    //llena las opciones del dropdown de 'años
    llenarSelect()
})

//eventListener para los select de busqueda
marca.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
year.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
minimo.addEventListener('change', guardarBusqueda)
maximo.addEventListener('change', guardarBusqueda)
puertas.addEventListener('change', guardarBusqueda)
transmision.addEventListener('change', guardarBusqueda)
color.addEventListener('change', guardarBusqueda)


//Funciones
function mostrarAutors(){
    autos.forEach( auto => {
        
        const { marca, modelo, year, puertas, transmision, precio, color } = auto
        const autoHTML = document.createElement('p')

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `

        resultado.appendChild(autoHTML)
    })
}

//generar los años del dropdown 
function llenarSelect() {
    for(let i = maxYear; i >= minYear; i--) {
        //creamos la 'opcion' del dropdown
        const opcion = document.createElement('option')
        opcion.value = i
        opcion.textContent = i
        //agregamos la opcion al dropdown
        year.appendChild(opcion) 
    }
}

//guardar opciones seleccionada del dropdown en el obj 'datosBusqueda'
function guardarBusqueda(e){
    const selectedOptionVal = e.target.value
    const selectedOptionId = e.target.id
    datosBusqueda[selectedOptionId] = selectedOptionVal
}

//filtrar en base la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear)
    console.table(resultado)
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda
    if(marca){
        return auto.marca === marca
    }
    //en caso de NO estar filtrando, devolvemos los autos 
    return auto
}
function filtrarYear(auto){
    const {year} = datosBusqueda
    if(year){
        return auto.year === parseInt(year)
    }
    return auto
}
