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
    mostrarAutos(autos) 

    //llena las opciones del dropdown de 'años
    llenarSelect()
})

//eventListener para los select de busqueda
marca.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
year.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
minimo.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
maximo.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
puertas.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
transmision.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})
color.addEventListener('change', e => {guardarBusqueda(e), filtrarAuto()})


//Funciones
function mostrarAutos(autos){
    //dado que usamos 'appendChild() en el forEach()
    // éste solo añade HTML debajo, no eliminar el html añadido anteriormente
    limpiarHTML()

    autos.forEach( auto => {
        
        const { marca, modelo, year, puertas, transmision, precio, color } = auto
        const autoHTML = document.createElement('p')

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `

        resultado.appendChild(autoHTML)
    })
}

//limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
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
    const resultado = autos
                        .filter(filtrarMarca)
                        .filter(filtrarYear)
                        .filter(filtrarMinimo)
                        .filter(filtrarMaximo)
                        .filter(filtrarPuertas)
                        .filter(filtrarTransmision)
                        .filter(filtrarColor)
    
    //evaluar si hay algun resultado de la busqueda
    if(resultado.length){
        //en caso afirmativo, mostramos el listado html del resultado de autos
        mostrarAutos(resultado)
    } else {
        //en caso contrario, mostramos mensaje de 'no results'
        noResultados()
    }
}

function noResultados(){

    limpiarHTML()

    const noResultados = document.createElement('div')
    noResultados.classList.add('alerta', 'error')
    noResultados.textContent = 'No se han encontrado resultados' 
    resultado.appendChild(noResultados)
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
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda
    if(minimo){
        return auto.precio >= minimo
    }
    return auto
}
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda
    if(maximo){
        return auto.precio <= maximo
    }
    return auto
}
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda
    if(puertas){
        return auto.puertas === parseInt(puertas)
    }
    return auto
}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda
    if(transmision){
        return auto.transmision === transmision
    }
    //en caso de NO estar filtrando, devolvemos los autos 
    return auto
}
function filtrarColor(auto){
    const {color} = datosBusqueda
    if(color){
        return auto.color === color
    }
    //en caso de NO estar filtrando, devolvemos los autos 
    return auto
}