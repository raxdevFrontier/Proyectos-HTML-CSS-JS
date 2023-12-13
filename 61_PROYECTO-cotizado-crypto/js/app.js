const criptomonedasSelect = document.querySelector('#criptomonedas')
const monedaSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

const objBusqueda = {
	moneda: '',
	criptomoneda: '',
}

//crear Promise
const obtenerCriptomonedas = (criptomonedas) =>
	new Promise((resolve) => {
		resolve(criptomonedas)
	})

document.addEventListener('DOMContentLoaded', () => {
	consultarCriptos()

	formulario.addEventListener('submit', submitFormulario)

	criptomonedasSelect.addEventListener('change', leerValor)
	monedaSelect.addEventListener('change', leerValor)
})

function consultarCriptos() {
	const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`

	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((resultado) => obtenerCriptomonedas(resultado.Data))
		.then((criptomonedas) => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {
	criptomonedas.forEach((cripto) => {
		const { FullName, Name } = cripto.CoinInfo

		const option = document.createElement('option')
		option.value = Name
		option.textContent = FullName
		criptomonedasSelect.appendChild(option)
	})
}

function leerValor(e) {
	objBusqueda[e.target.name] = e.target.value
}

function submitFormulario(e) {
	e.preventDefault()

	const { moneda, criptomoneda } = objBusqueda

	if (moneda === '' || criptomoneda === '') {
		mostrarAlerta('Ambos campos obligatorios')
		return
	}

	//Consultar API para obtener resultados de cotizacion de las criptomonedas
	consultarAPI()
}

function mostrarAlerta(mensaje) {
	const existeAlerta = document.querySelector('.bg-red-200')

	if (!existeAlerta) {
		const alerta = document.createElement('p')
		alerta.classList.add(
			'bg-red-200',
			'border-red-600',
			'text-red-700',
			'px-4',
			'py-3',
			'rounded',
			'mx-auto',
			'mt-6',
			'text-center',
			'text-4xl'
		)

		alerta.textContent = mensaje

		formulario.appendChild(alerta)

		setTimeout(() => {
			alerta.remove()
		}, 3000)
	}
}

function consultarAPI() {
	const { moneda, criptomoneda } = objBusqueda

	const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

	mostrarSpinner()

	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((resultadoCotizacion) => mostrarCotizacionHTML(resultadoCotizacion.DISPLAY[criptomoneda][moneda]))
}

function mostrarCotizacionHTML(cotizacion) {
	const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion

	limpiarHTML(resultado)

	const precio = document.createElement('p')
	precio.classList.add('precio')
	precio.innerHTML = `El precio es: <span>${PRICE}</span>`

	const precioAlto = document.createElement('p')
	precioAlto.innerHTML = `Precio más alto del día: <span>${HIGHDAY}</span>`
	const precioBajo = document.createElement('p')
	precioBajo.innerHTML = `Precio más bajo del día: <span>${LOWDAY}</span>`
	const ultimasHoras = document.createElement('p')
	ultimasHoras.innerHTML = `Variación últimas 24h: <span>${CHANGEPCT24HOUR}%</span>`
	const utlimaActualizacion = document.createElement('p')
	utlimaActualizacion.innerHTML = `Última actualizacion: <span>${LASTUPDATE}</span>`

	resultado.appendChild(precio)
	resultado.appendChild(precioAlto)
	resultado.appendChild(precioBajo)
	resultado.appendChild(ultimasHoras)
	resultado.appendChild(utlimaActualizacion)
}

function limpiarHTML(selector) {
	while (selector.firstChild) {
		selector.removeChild(selector.firstChild)
	}
}

function mostrarSpinner() {
	limpiarHTML(resultado)

	const spinner = document.createElement('div')
	spinner.classList.add('spinner')

	spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `
	resultado.appendChild(spinner)
}
