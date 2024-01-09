const fomaterarDinero = (valor) => {
	// const formatter = new Intl.NumberFormat('es-US', {
	// 	style: 'currency',
	// 	currency: 'USD',
	// })
	const formatter = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR',
	})
	return formatter.format(valor)
}

const calcularTotalPagar = (cantidad, plazo) => {
	let total

	// a más cantidad, menor interes
	if (cantidad < 5000) {
		total = cantidad * 1.5 //interes del 50%
	} else if (cantidad >= 5000 && cantidad < 10000) {
		total = cantidad * 1.4 //interes del 40%
	} else if (cantidad >= 10000 && cantidad < 15000) {
		total = cantidad * 1.3
	} else {
		total = cantidad * 1.2
	}

	if (plazo === 6) {
		total *= 1.1
	} else if (plazo === 12) {
		total *= 1.2
	} else {
		total *= 1.3
	}
	return total
}

export { fomaterarDinero, calcularTotalPagar }
