const labels = document.querySelectorAll(".form-control label")

labels.forEach((elementInLabels) => {
	elementInLabels.innerHTML = elementInLabels.innerText
		.split("")
		//dividimos las letras del innerText en un array
		.map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
		//lo mapeamos para crear un array de la letra con un span alrededor
		.join("")
	//y luego lo volvemos a convertir en una cadena (spearado por comas)
})
