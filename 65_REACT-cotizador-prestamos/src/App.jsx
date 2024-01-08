import { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import { fomaterarDinero } from './helpers'

function App() {
	const [cantidad, setCantidad] = useState(50)
	const [meses, setMeses] = useState(6)

	const MIN = 0
	const MAX = 100
	const STEP = 10

	// setCantidad(1000) // Esto da error, pero para modificar el state deberia hacerse algo así

	function handleChange(e) {
		//Aqui recogemos toda la logica que queremos ejecutar al darse el evento "Change"
		// Y por convenio, este tipo de funciones, se nombran como "handle" + "nombre del evento"

		setCantidad(Number(e.target.value))
	}

	function handleClickDecremento() {
		const valor = cantidad - STEP
		if (valor < MIN) {
			alert('Cantidad no válida')
			return
		}
		setCantidad(valor)
	}
	function handleClickIncremento() {
		const valor = cantidad + STEP
		if (valor > MAX) {
			alert('Cantidad no válida')
			return
		}
		setCantidad(valor)
	}

	/* Codigo JavaScript*/
	return (
		/* Codigo HTML */
		<div className="my-2 max-w-lg mx-auto bg-white shadow p-10">
			<Header />

			<div className="flex justify-between my-6">
				<Button operador="-" fn={handleClickDecremento} />
				<Button operador="+" fn={handleClickIncremento} />
			</div>

			<input
				type="range"
				className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
				onChange={handleChange}
				min={MIN}
				max={MAX}
				step={STEP}
				value={cantidad}
			/>

			<p className="text-center my-10 text-5xl font-extrabold text-indigo-600">{fomaterarDinero(cantidad)}</p>

			<h2 className="text-2xl font-extrabold text-gray-500 text-center">
				Elige un <span className="text-indigo-600">Plazo</span> a pagar
			</h2>

			<select
				className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
				value={meses}
				onChange={(e) => setMeses(+e.target.value)}
			>
				<option value="6">6 Meses</option>
				<option value="12">12 Meses</option>
				<option value="24">24 Meses</option>
			</select>
		</div>
	)
}

export default App