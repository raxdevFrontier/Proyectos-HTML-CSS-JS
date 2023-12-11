const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.onload = () => {
	formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
	e.preventDefault()

	const terminoBusqueda = document.querySelector('#termino').value

	if (terminoBusqueda === '') {
		mostrarAlerta('Agrega palabra de busqueda')
		return
	}

	buscarImagenes(terminoBusqueda)
}

function mostrarAlerta(mensaje) {
	const existeAlerta = document.querySelector('.bg-red-100')

	if (!existeAlerta) {
		const alerta = document.createElement('p')
		alerta.classList.add(
			'bg-red-100',
			'border-red-400',
			'text-red-700',
			'px-4',
			'py-3',
			'rounded',
			'max-w-lg',
			'mx-auto',
			'mt-6',
			'text-center'
		)

		alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `

		formulario.appendChild(alerta)

		setTimeout(() => {
			alerta.remove()
		}, 3000)
	}
}

function buscarImagenes(termino) {
	const key = '41197155-baa9cbb219375781f91ae1579'
	const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=50`
	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((resultado) => mostrarImagenes(resultado.hits))
}

function mostrarImagenes(imagenes) {
	limpiarHTML(resultado)

	//iterar arreglo de imagenes y mostrar HTML
	imagenes.forEach((imagen) => {
		const { previewURL, likes, views, largeImageURL } = imagen

		resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lf:w1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">

                <div class="p-4 grid grid-cols-2">
                    <div class="text-left">
                        <p> 
                            <i class="fa-solid fa-heart"></i>
                            ${likes}
                        </p>
                    </div>
                    <div class="text-right"">
                        <p> 
                            <i class="fa-solid fa-eye"></i>
                            ${views}
                        </p>
                    </div>

                    <a 
                        class="block col-span-2 w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                            Ver Imagen
                    </a>
                </div>
            </div>
        </div>
        `
	})
}

function limpiarHTML(selector) {
	while (selector.firstChild) {
		selector.removeChild(selector.firstChild)
	}
}
