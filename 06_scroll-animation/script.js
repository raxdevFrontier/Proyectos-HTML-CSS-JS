const boxes = document.querySelectorAll(".box")

/*Afegim un event per escolta quan es fa scroll en la pantalla, 
i li pasem una funció de nom "checkBox*/
window.addEventListener("scroll", checkBoxes)

checkBoxes() //cridem inicialment a la funcio per a que mostri el primeres box sense que calgui fer scroll
//si no cridem la funcio al inici, fins que no fesim scroll
//no apareixeria cap box, encara que estiguesin per sobre
// del valor "triggerBottom" que calculem

function checkBoxes() {
	const triggerBottom = (window.innerHeight / 5) * 4
	//fem un calcul per tenir un altura a la que activar la animació per fer apareixer les box

	boxes.forEach((elementInBoxes) => {
		const boxTop = elementInBoxes.getBoundingClientRect().top

		if (boxTop < triggerBottom) {
			elementInBoxes.classList.add("show")
		} else {
			elementInBoxes.classList.remove("show")
		}
	})
}
