/*Event Bubbling - 
es un concepto en el DOM. 
Ocurre cuando un elemento recibe un evento, y ese evento burbujea 
(o se propaga) a sus elementos padre y antepasado en el árbol DOM 
hasta que llega al elemento raíz.*/

const ratings = document.querySelectorAll(".rating")
const ratingsContainer = document.querySelector(".ratings-container")
const sendBtn = document.querySelector("#send")
const panel = document.querySelector("#panel")

let selectedRating = "Satisfied"

ratingsContainer.addEventListener("click", (e) => {
	/*Condicional per identificar si fem click en el contenedor del rating (e.target.parentNode.classList.contains("rating") - el node pare del target del event conte la classe "rating")
     o en el emoji (e.target.classList.contains("rating") - el target del event conte la classe "rating") */
	if (e.target.parentNode.classList.contains("rating") || e.target.classList.contains("rating")) {
		removeActive()
		e.target.parentNode.classList.add("active")
		e.target.classList.add("active")
		selectedRating = e.target.nextElementSibling.innerHTML
	}
})

sendBtn.addEventListener("click", (e) => {
	panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <br>
    <strong>Feedback: ${selectedRating}</strong>
    <p>We'll use your feedback to improve our customer support</p>
    `
})

function removeActive() {
	// for (let i = 0; i < ratings.length; i++) {
	// 	ratings[i].classList.remove("active")
	// }

	ratings.forEach((rating) => {
		rating.classList.remove("active")
	})
}
