const smallCups = document.querySelectorAll(".cup-small")
const liters = document.getElementById("liters")
const percentage = document.getElementById("percentage")
const remained = document.getElementById("remained")

smallCups.forEach((cup, idx) => {
	cup.addEventListener("click", () => {
		highlightCups(idx)
	})
})

function highlightCups(idx) {
	//--- Desrellenar la smallCup si hacemos click en ella (en caso de que ya esté rellenada)
	if (
		smallCups[idx].classList.contains("full") &&
		!smallCups[idx].nextElementSibling.classList.contains("full")
	) {
		idx--
	}
	//------------------------------------------------

	//------ Rellenar las smallCups ------------------
	smallCups.forEach((cup, idx2) => {
		if (idx2 <= idx) {
			cup.classList.add("full")
		} else {
			cup.classList.remove("full")
		}
	})
	//------------------------------------------------

	//------ Rellenar % de la copa grande ------------

	//------------------------------------------------
}
