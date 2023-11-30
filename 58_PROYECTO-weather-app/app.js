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

	spinner() //mostrar spinner de carga

	setTimeout(() => {
		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => {
				limpiarHTML()

				if (resultado.cod === '404') {
					mostrarError('Localización no encontrada')
					return
				}

				//imprimir datos en HTML
				mostrarClima(resultado)
			})
	}, 500)
}

function mostrarClima(datos) {
	const {
		name,
		main: { temp, temp_max, temp_min },
		weather,
	} = datos

	const tempC = convertirCelsius(temp)
	const max = convertirCelsius(temp_max)
	const min = convertirCelsius(temp_min)

	const icono = document.createElement('div')
	icono.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"
	alt="weather icon" />`

	const nombreCiudad = document.createElement('p')
	nombreCiudad.textContent = `${name.charAt(0).toUpperCase() + name.slice(1)}`
	nombreCiudad.classList.add('font-bold', 'text-4xl')

	const actual = document.createElement('p')
	actual.innerHTML = `${tempC} &#8451;`
	// el codigo "&#8451;" es una entidad para poner el simbolo de " ºC "
	actual.classList.add('font-bold', 'text-6xl')

	const temperaturaMax = document.createElement('p')
	temperaturaMax.innerHTML = `Max: ${max} &#8451;`
	temperaturaMax.classList.add('text-xl')

	const temperaturaMin = document.createElement('p')
	temperaturaMin.innerHTML = `Min: ${min} &#8451;`
	temperaturaMin.classList.add('text-xl')

	const resultadoDiv = document.createElement('div')
	resultadoDiv.classList.add('text-center', 'text-white')
	resultadoDiv.appendChild(icono)
	resultadoDiv.appendChild(nombreCiudad)
	resultadoDiv.appendChild(actual)
	resultadoDiv.appendChild(temperaturaMax)
	resultadoDiv.appendChild(temperaturaMin)
	resultado.appendChild(resultadoDiv)
}

// Funcion para pasa de grados Kelvin a Celsius
const convertirCelsius = (temperatura) => Number((temperatura - 273.15).toFixed(2))

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild)
	}
}

function spinner() {
	limpiarHTML()

	const divSpinner = document.createElement('div')
	divSpinner.classList.add('sk-fading-circle')
	divSpinner.innerHTML = `
		<div class="sk-circle1 sk-circle"></div>
		<div class="sk-circle2 sk-circle"></div>
		<div class="sk-circle3 sk-circle"></div>
		<div class="sk-circle4 sk-circle"></div>
		<div class="sk-circle5 sk-circle"></div>
		<div class="sk-circle6 sk-circle"></div>
		<div class="sk-circle7 sk-circle"></div>
		<div class="sk-circle8 sk-circle"></div>
		<div class="sk-circle9 sk-circle"></div>
		<div class="sk-circle10 sk-circle"></div>
		<div class="sk-circle11 sk-circle"></div>
		<div class="sk-circle12 sk-circle"></div>
	`

	resultado.appendChild(divSpinner)
}
