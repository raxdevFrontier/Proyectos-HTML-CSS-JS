const criptomonedasSelect = document.querySelector('#criptomonedas')

//crear Promise
const obtenerCriptomonedas = (criptomonedas) =>
	new Promise((resolve) => {
		resolve(criptomonedas)
	})

document.addEventListener('DOMContentLoaded', () => {
	consultarCriptos()
})

function consultarCriptos() {
	const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
	// const url = `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR`

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
