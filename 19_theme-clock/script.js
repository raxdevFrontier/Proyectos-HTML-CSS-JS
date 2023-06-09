const hourEl = document.querySelector(".hour")
const minuteEl = document.querySelector(".minute")
const secondEl = document.querySelector(".second")
const timeEl = document.querySelector(".time")
const dateEl = document.querySelector(".date")
const toggle = document.querySelector(".toggle")

const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

toggle.addEventListener("click", (event) => {
	// document.html.classList.toggle("dark")
	toggle.innerText = ""

	const htmlEl = document.querySelector("html")
	htmlEl.classList.toggle("dark")

	if (htmlEl.classList.contains("dark")) {
		event.target.innerText = "Light Mode"
	} else {
		event.target.innerText = "Dark Mode"
	}
})

function setTime() {
	const time = new Date(new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" }))
	const month = time.getMonth()
	const day = time.getDay()
	const hours = time.getHours()
	const hoursForClock = hours % 12
	// console.log(time)
	const minutes = time.getMinutes()
	const seconds = time.getSeconds()

	const ampm = hours >= 12 ? "PM" : "AM"

	hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
		hoursForClock,
		0,
		11,
		0,
		360
	)}deg)`
	minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
	secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`

	timeEl.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
	dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${day}</span>`
}

// Link a Stackoverflow d'on treiem la funcion "scale":
//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
	return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

setTime()

setInterval(setTime, 1000)
