function iniciarApp() {
	const selectCategorias = document.querySelector('#categorias')
	selectCategorias.addEventListener('change', seleccionarCategoria)

	const resultado = document.querySelector('#resultado')
	const modal = new bootstrap.Modal('#modal', {})

	obtenerCategorias()

	function obtenerCategorias() {
		const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => mostrarCategorias(resultado.categories))
	}

	function mostrarCategorias(categorias) {
		categorias.forEach((categoria) => {
			const { strCategory } = categoria
			const option = document.createElement('option')
			option.value = strCategory
			option.textContent = strCategory
			selectCategorias.appendChild(option)
		})
	}

	function seleccionarCategoria(e) {
		const categoria = e.target.value
		const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`

		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => mostrarRecetas(resultado.meals))
	}

	function mostrarRecetas(recetas) {
		limpiarHTML(resultado)

		const heading = document.createElement('h2')
		heading.classList.add('text-center', 'text-black', 'my-5')
		heading.textContent = recetas.length ? 'Resultados' : 'No Hay Resultados'
		resultado.appendChild(heading)

		//iterar en las diferentes recetas
		recetas.forEach((receta) => {
			const { idMeal, strMeal, strMealThumb } = receta

			const recetaContenedor = document.createElement('div')
			recetaContenedor.classList.add('col-md-4')

			const recetaCard = document.createElement('div')
			recetaCard.classList.add('card', 'mb-4')

			const recetaImg = document.createElement('img')
			recetaImg.classList.add('card-img-top')
			recetaImg.alt = `Imagen de la receta ${strMeal}`
			recetaImg.src = strMealThumb

			const recetaCardBody = document.createElement('div')
			recetaCardBody.classList.add('card-body')

			const recetaHeading = document.createElement('h3')
			recetaHeading.classList.add('card-title', 'mb-3')
			recetaHeading.textContent = strMeal

			const recetaButton = document.createElement('button')
			recetaButton.classList.add('btn', 'btn-danger', 'w-100')
			recetaButton.textContent = 'Ver Receta'
			recetaButton.dataset.bsTarget = '#modal'
			recetaButton.dataset.bsToggle = 'modal'
			recetaButton.onclick = function () {
				seleccionarReceta(idMeal)
				//llamamos asi a la funcion porque de este modo espera a que ocura el "click" para llamar a la funcion
			} //se usa 'onclick' porque inicialmente al cargar el DOM el boton 'recetaButton' no existe por lo que el eventListener no funcionaria

			//insertar recetas en HTML
			recetaCardBody.appendChild(recetaHeading)
			recetaCardBody.appendChild(recetaButton)

			recetaCard.appendChild(recetaImg)
			recetaCard.appendChild(recetaCardBody)

			recetaContenedor.appendChild(recetaCard)
			resultado.appendChild(recetaContenedor)
		})
	}

	function seleccionarReceta(id) {
		const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => mostrarRecetaModal(resultado.meals[0]))
	}

	function mostrarRecetaModal(receta) {
		const { idMeal, strInstructions, strMeal, strMealThumb } = receta

		const modalTitle = document.querySelector('.modal .modal-title')
		const modalBody = document.querySelector('.modal .modal-body')

		modalTitle.textContent = strMeal
		modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="imagen receta ${strMeal}" />
            <h3 class="my-3">Instrucciones:</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredientes:</h3>
        `

		const listGroup = document.createElement('ul')
		listGroup.classList.add('list-group')

		//mostrar ingredientes y cantidades
		for (let i = 0; i <= 20; i++) {
			if (receta[`strIngredient${i}`]) {
				const ingrediente = receta[`strIngredient${i}`]
				const cantidad = receta[`strMeasure${i}`]

				const ingredienteLi = document.createElement('li')
				ingredienteLi.classList.add('list-group-item')
				ingredienteLi.textContent = `${ingrediente} - ${cantidad}`

				listGroup.appendChild(ingredienteLi)
			}
		}

		modalBody.appendChild(listGroup)

		const modalFooter = document.querySelector('.modal-footer')

		limpiarHTML(modalFooter)

		//botones de cerrar y favorito
		const btnFavorito = document.createElement('button')
		btnFavorito.classList.add('btn', 'btn-danger', 'col') //con el 'col' hacemos que ambos botones midan lo mismo
		btnFavorito.textContent = existeStorage(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito'

		//loaclStorage
		btnFavorito.onclick = function () {
			if (existeStorage(idMeal)) {
				eliminarFavorito(idMeal)
				btnFavorito.textContent = 'Guardar Favorito'
				mostrarToast('Receta eliminada')
				return
			}
			agregarFavorito({
				id: idMeal,
				titulo: strMeal,
				imagen: strMealThumb,
			})
			btnFavorito.textContent = 'Eliminar Favorito'
			mostrarToast('Receta guardada en favoritos')
		}

		const btnCerrarModal = document.createElement('button')
		btnCerrarModal.classList.add('btn', 'btn-secondary', 'col')
		btnCerrarModal.textContent = 'Cerrar'
		btnCerrarModal.onclick = function () {
			modal.hide()
		}

		modalFooter.appendChild(btnFavorito)
		modalFooter.appendChild(btnCerrarModal)

		//mostrar el modal
		modal.show()
	}

	function agregarFavorito(receta) {
		const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? []
		//El '??' hace que si la parte iquierda de la expresion es 'null' entonces coja el valor de la derecha
		localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]))
	}

	function eliminarFavorito(id) {
		const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? []
		const nuevosFavoritos = favoritos.filter((favoritos) => favoritos.id !== id)
		localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
	}

	function existeStorage(id) {
		const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? []
		return favoritos.some((favorito) => favorito.id === id)
	}

	function mostrarToast(mensaje) {
		const toastDiv = document.querySelector('#toast')
		const toastBody = document.querySelector('.toast-body')
		const toast = new bootstrap.Toast(toastDiv)
		toastBody.textContent = mensaje
		toast.show()
	}

	function limpiarHTML(selector) {
		while (selector.firstChild) {
			selector.removeChild(selector.firstChild)
		}
	}
}

document.addEventListener('DOMContentLoaded', iniciarApp)
