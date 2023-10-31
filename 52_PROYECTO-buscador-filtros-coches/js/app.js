//Variables
const resultado = document.querySelector('#resultado')
const year = document.querySelector('#year')

const maxYear = new Date().getFullYear()    // 'getFullYear()' devuelve el año actual - de este modo establecemos la fecha maxima 
const minYear = maxYear - 10                // suponemos que solo tendremos coches de los ultimos 10 años, de modo que le restamos 10 años a la fecha actual


//Eventos
document.addEventListener('DOMContentLoaded', () => {
    //muestra lista de coches al cargar
    mostrarAutors() 

    //llena las opciones del dropdown de 'años
    llenarSelect()
})


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