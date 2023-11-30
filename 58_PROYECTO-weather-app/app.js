const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
	formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
	e.preventDefault()

	//Validar formulario
	const ciudad = document.querySelector('#ciudad').value
	const pais = document.querySelector('#pais').value

	if (ciudad === '' || pais === '') {
		mostrarError('Ambos campos obligatorios')

		return
	}
	cosultarAPI(ciudad, pais)
}

function mostrarError(mensaje) {
	const alerta = document.querySelector('.bg-red-100')

	if (!alerta) {
		const alerta = document.createElement('div')
		alerta.classList.add(
			'bg-red-100',
			'border-red-400',
			'text-red-700',
			'px-4',
			'py-3',
			'rounded',
			'relative',
			'max-w-md',
			'mx-auto',
			'mt-6',
			'text-center'
		)

		alerta.innerHTML = `
			<strong class="font-bold">Error</strong>
			<span class="block">${mensaje}</span>
		`
		container.appendChild(alerta)

		setTimeout(() => {
			alerta.remove()
		}, 3000)
	}
}

function cosultarAPI(ciudad, pais) {
	// const apiKey = '980a70af7a2a0502817464a7ac83042f'
	const apiKey = '1c85e912b5074924d4d1b6794eaea7af'

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

	// fetch(url).then((respuesta) => respuesta.json().then((resultado) => console.log(resultado)))
	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((resultado) => {
			// console.log(resultado)
			limpiarHTML()

			if (resultado.cod === '404') {
				mostrarError('Localización no encontrada')
				return
			}

			//imprimir datos en HTML
			mostrarClima(resultado)
		})
}

function mostrarClima(datos) {
	const {
		main: { temp, temp_max, temp_min },
	} = datos

	const tempC = convertirCelsius(temp)

	const actual = document.createElement('p')
	actual.innerHTML = `${tempC} &#8451;`
	// el codigo "&#8451;" es una entidad para poner el simbolo de " ºC "
	actual.classList.add('font-bold', 'text-6xl')

	const resultadoDiv = document.createElement('div')
	actual.classList.add('text-center', 'text-white')
	resultadoDiv.appendChild(actual)
	resultado.appendChild(resultadoDiv)
}

// Funcion para pasa de grados Kelvin a Celsius
const convertirCelsius = (temperatura) => Number((temperatura - 273.15).toFixed(2))

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild)
	}
}
