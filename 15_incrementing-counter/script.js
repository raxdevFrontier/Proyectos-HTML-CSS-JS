const counters = document.querySelectorAll(".counter")

counters.forEach((counterInCounters) => {
	counterInCounters.innerText = "0"

	const updateCounter = () => {
		const counterTarget = +counterInCounters.getAttribute("data-target")
		const currentVal = +counterInCounters.innerText
		// con el "+" delante se convierten a tipo number para poder hacer calculos

		const increment = counterTarget / 100
		//con este se define la felocidad de incremento del contador

		if (currentVal < counterTarget) {
			counterInCounters.innerText = `${Math.ceil(currentVal + increment)}`
			setTimeout(updateCounter, 1)
		} else {
			counterInCounters.innerText = counterTarget
		}
	}

	updateCounter()
})
