const body = document.body
const slides = document.querySelectorAll(".slide")
const leftBtn = document.getElementById("left")
const rightBtn = document.getElementById("right")

let activeSlide = 0

setBgToBody()
setActvieSlide()

function setBgToBody() {
	body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

function setActvieSlide() {
	slides.forEach((elementInSlide) => {
		elementInSlide.classList.remove("active")
	})

	slides[activeSlide].classList.add("active")
}

leftBtn.addEventListener("click", () => {
	activeSlide--
	if (activeSlide < 0) {
		activeSlide = slides.length - 1
	}

	setBgToBody()
	setActvieSlide()
})
rightBtn.addEventListener("click", () => {
	activeSlide++

	if (activeSlide > slides.length - 1) {
		activeSlide = 0
	}

	setBgToBody()
	setActvieSlide()
})
