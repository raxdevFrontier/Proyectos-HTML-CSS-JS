const buttons = document.querySelectorAll(".ripple")

buttons.forEach((button) => {
	button.addEventListener("click", function (e) {
		const x = e.clientX
		const y = e.clientY

		const buttonTop = event.target.offsetTop
		const buttonLeft = event.target.offsetLeft

		const xInside = x - buttonLeft
		const yInside = y - buttonTop

		const circle = document.createElement("span")
		circle.classList.add("circle")
		circle.style.top = yInside + "px"
		circle.style.left = xInside + "px"

		this.appendChild(circle)

		/* Posem un setTimeout() per a que quan passin 0.5s 
        s'elimini el "span" amb la classe "circle" creat anteriorment
        ja que sinó cada cop que es pitges el botó creariem un cercle 
        acumulant-se per sempre*/
		setTimeout(() => circle.remove(), 500)
	})
})
