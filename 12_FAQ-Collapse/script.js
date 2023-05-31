const btns = document.querySelectorAll(".faq-toggle")

btns.forEach((elementInBtns) => {
	elementInBtns.addEventListener("click", () => {
		elementInBtns.parentNode.classList.toggle("active")
	})
})
