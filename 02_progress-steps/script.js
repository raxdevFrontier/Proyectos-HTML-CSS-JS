const progress = document.getElementById("progress-line")
const preview = document.getElementById("prev")
const next = document.getElementById("next")

const steps = document.querySelectorAll(".step")
/* al treballar amb class em de posar el punt, 
a més com tenim més d'una classe igual, 
i les volem fer servir totes, cal fer servir el querySelectorAll()*/

let currentActive = 1
/* farem servir una variable tipo 'number' 
que representara el numero de steps actius, es a dir 
el progres dels steps 
(i la incialitzem a 1 perque sempre començarem en el steo 1*/

next.addEventListener("click", () => {
	currentActive++

	//delimitem el valor de 'currentActive' per a que no sobrepassi el numero de steps que tenim
	if (currentActive > steps.length) {
		currentActive = steps.length
	}

	// Codi meu equivalent al anterior
	// if (currentActive < steps.length) {
	// 	currentActive++
	// } else {
	// 	currentActive = steps.length
	// }

	updateProgressSteps()
})

preview.addEventListener("click", () => {
	currentActive--

	//delimitem el valor de 'currentActive' per a que no sobrepassi el numero de steps que tenim
	if (currentActive < 1) {
		currentActive = 1
	}

	// Codi meu equivalent al anterior
	// if (currentActive < steps.length) {
	// 	currentActive++
	// } else {
	// 	currentActive = steps.length
	// }

	console.log(currentActive)
	updateProgressSteps()
})

function updateProgressSteps() {
	steps.forEach((elementInSteps, idElement) => {
		if (idElement < currentActive) {
			elementInSteps.classList.add("active")
		} else {
			elementInSteps.classList.remove("active")
		}
	})

	const actives = document.querySelectorAll(".active")
	/*recogemos todos los elementos que tienen la classe "active" actualmente
    para poder hacer un porcentaje del progreso que llevamos y poder pintar la linea entre steps*/

	const progressLineSteps = ((actives.length - 1) / (steps.length - 1)) * 100 + "%"
	/*dividim el num. d'elements que tenen la classe "active" pel 
    num. que tenen la clase "step" (num. total de steps) per trobar
    un percentatge del progres 
    {el (-1) a cadascun es perque aquesta funcio s'executarà quan apretem un dels botons, 
    per lo que minim tindrem 2 steps, i aixi comença en el inici, no en el punt 2,
    i d'aquesta manera podem dividir el 100% en 4 (0%, 33.33%, 66.66% i 100%)} */

	progress.style.width = progressLineSteps
	// establim en el element 'progress-line el valor del progress calculat abans com a valor per l'atribut 'width'

	if (currentActive === 1) {
		preview.disabled = true
	} else if (currentActive === 4) {
		next.disabled = true
	} else {
		preview.disabled = false
		next.disabled = false
	}
}
