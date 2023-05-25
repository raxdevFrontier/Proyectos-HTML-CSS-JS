const panels = document.querySelectorAll(".panel")

// console.log(panels[0])

panels.forEach((elementInPanels) => {
	elementInPanels.addEventListener("click", () => {
		panels.forEach((elementoInPanels) => {
			elementoInPanels.classList.remove("active")
		})
		elementInPanels.classList.add("active")
	})
})
