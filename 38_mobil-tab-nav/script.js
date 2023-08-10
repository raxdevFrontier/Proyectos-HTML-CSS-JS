const contents = document.querySelectorAll(".content")
const listItems = document.querySelectorAll("nav ul li")

listItems.forEach((li, idx) => {
	li.addEventListener("click", () => {
		hideAllContents()
		hideAllItemss()
		li.classList.add("active")
		contents[idx].classList.add("show")
	})
})

function hideAllContents() {
	contents.forEach((content) => content.classList.remove("show"))
}

function hideAllItemss() {
	listItems.forEach((li) => li.classList.remove("active"))
}
