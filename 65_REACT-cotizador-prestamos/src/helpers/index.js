const fomaterarDinero = (valor) => {
	const formatter = new Intl.NumberFormat('es-US', {
		style: 'currency',
		currency: 'USD',
	})
	return formatter.format(valor)
}

export { fomaterarDinero }
