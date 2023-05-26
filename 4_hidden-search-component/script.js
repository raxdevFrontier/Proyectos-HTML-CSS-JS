const search = document.querySelector(".search-box")
const btn = document.querySelector(".btn-search")
const input = document.querySelector(".input")

let isFocus = false

btn.addEventListener("click", () => {
	//---------Expandir ---------------
	search.classList.toggle("active")
	//----------------------------------

	//------- Focus Input --------------
	isFocus = !isFocus

	console.log(isFocus)
	if (isFocus == true) {
		input.focus()
	} else {
		input.blur()
	}
})
