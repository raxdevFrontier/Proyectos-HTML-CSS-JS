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
		console.log(receta)
		for (let i = 0; i <= 20; i++) {
			console.log(receta[`strIngredient${i}`])
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

		//mostrar el modal
		modal.show()
	}

	function limpiarHTML(selector) {
		while (selector.firstChild) {
			selector.removeChild(selector.firstChild)
		}
	}
}

document.addEventListener('DOMContentLoaded', iniciarApp)

// console.log()
