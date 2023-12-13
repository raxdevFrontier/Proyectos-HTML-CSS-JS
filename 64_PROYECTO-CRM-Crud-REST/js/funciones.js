export function mostrarAlerta(mensaje, tipo) {
	const alerta = document.querySelector('.alerta') //buscamos si existe una alerta

	//si no existe la alerta la crea y la muestra (en caso de que exista no hace nada)
	if (!alerta) {
		//crear alerta
		const alerta = document.createElement('p')
		alerta.classList.add(
			'alerta',
			'px-4',
			'py-3',
			'rounded',
			'max-w-lg',
			'mx-auto',
			'mt-6',
			'text-center',
			'border'
		)

		if (tipo === 'error') {
			alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
			alerta.innerHTML = `
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline"">${mensaje}</span>
                `
		} else {
			alerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
			alerta.innerHTML = `
                    <strong class="font-bold">Success!</strong>
                    <span class="block sm:inline"">${mensaje}</span>
                `
		}
		const formulario = document.querySelector('#formulario')
		formulario.appendChild(alerta)

		setTimeout(() => {
			alerta.remove()
		}, 3000)
	}
}
