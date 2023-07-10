const btnLeft = document.getElementById("left")
const btnRight = document.getElementById("right")
const carousel = document.getElementById("imgs")

const img = document.querySelectorAll("#imgs img")
let countImg = 0

setInterval(moveCarousel, 3000)

function moveCarousel() {
	countImg++
	changeImg()
}

function changeImg() {
	if (countImg > img.length - 1) {
		countImg = 0
	} else if (countImg < 0) {
		countImg = img.length - 1
	}

	imgs.style.transform = `translateX(${-countImg * 500}px)`
}

function resetInterval() {
	clearInterval(interval)
	interval = setInterval(moveCarousel, 3000)
}

btnLeft.addEventListener("click", () => {
	countImg--
	changeImg()
	resetInterval()
})

btnRight.addEventListener("click", () => {
	countImg++
	changeImg()
	resetInterval()
})
