const loadText = document.querySelector(".loading-text")
const bg = document.querySelector(".bg")

let load = 0

let intervalBlurring = setInterval(blurring, 30) //executem la funció "blurring" cada 30 ms

function blurring() {
	load++

	if (load > 99) {
		clearInterval(intervalBlurring)
	}

	loadText.innerText = `${load}%`
	loadText.style.opacity = scale(load, 0, 100, 1, 0) //es fa desapareixer el text de carga a mida que arriba a 100%
	bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px`
}

// Link a Stackoverflow d'on treiem la funcion "scale":
//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
	return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
