const canvas = document.getElementById("canvas")
const incBtn = document.getElementById("increase")
const decBtn = document.getElementById("decrease")
const sizeEl = document.getElementById("size")
const colorEl = document.getElementById("color")
const clearEl = document.getElementById("clear")

const ctx = canvas.getContext("2d")

let size = 10
let isPressed = false
let color = "black"
let x
let y

canvas.addEventListener("mousedown", (event) => {
	isPressed = true

	x = event.offsetX
	y = event.offsetY

	drawCircle(x, y)
})

canvas.addEventListener("mouseup", (event) => {
	isPressed = false

	x = undefined
	y = undefined
})

canvas.addEventListener("mousemove", (event) => {
	if (isPressed) {
		const x2 = event.offsetX
		const y2 = event.offsetY

		drawCircle(x2, y2)
		drawLine(x, y, x2, y2)

		x = x2
		y = y2
	}
})

incBtn.addEventListener("click", (event) => {
	// size += 5

	if (size >= 50) {
		size = 50
	} else {
		if (size < 5) {
			size += 4
		} else {
			size += 5
		}
	}

	updateSizeOnScreen()
})

decBtn.addEventListener("click", (event) => {
	size -= 5

	if (size < 5) {
		size = 1
	}

	updateSizeOnScreen()
})

colorEl.addEventListener("change", (event) => {
	color = event.target.value
})

clearEl.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height))

function drawCircle(x, y) {
	ctx.beginPath()
	ctx.arc(x, y, size, 0, Math.PI * 2)
	ctx.fillStyle = color
	ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.strokeStyle = color
	ctx.lineWidth = size * 2
	ctx.stroke()
}

function updateSizeOnScreen() {
	sizeEl.innerText = size
}
// drawCircle(100, 100)
// drawLine(200, 200, 400, 200)
