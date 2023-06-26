// const images = document.querySelectorAll(".loveMe")

// images.forEach((img) => {
// 	img.addEventListener("click", function (e) {
// 		const x = e.clientX
// 		const y = e.clientY

// 		const imgTop = e.target.offsetTop
// 		const imgLeft = e.target.offsetLeft

// 		const xInside = x - imgLeft
// 		const yInside = y - imgTop

// 		const heartIcon = document.createElement("i")
// 		heartIcon.classList.add("fas", "fa-heart")
// 		heartIcon.style.top = yInside + "px"
// 		heartIcon.style.left = xInside + "px"

// 		this.appendChild(heartIcon)

/* Posem un setTimeout() per a que quan passin 0.5s 
        s'elimini el "span" amb la classe "circle" creat anteriorment
        ja que sinó cada cop que es pitges el botó creariem un cercle 
        acumulant-se per sempre*/
// 	setTimeout(() => heartIcon.remove(), 500)
// 	})
// })

//vvvvvvvvvvvvvvvvvvv Versio curs 50 projects vvvvvvvvvvvvvvvvvvv

const loveMe = document.querySelector(".loveMe")
const times = document.querySelector("#times")

let clickTime = 0
let timesClicked = 0

loveMe.addEventListener("click", (e) => {
	if (clickTime === 0) {
		clickTime = new Date().getTime()
	} else {
		if (new Date().getTime() - clickTime < 800) {
			createHeart(e)
			clickTime = 0
		} else {
			clickTime = new Date().getTime()
		}
	}
})

const createHeart = (eventVal) => {
	const heart = document.createElement("i")
	heart.classList.add("fas", "fa-heart")

	const x = eventVal.clientX
	const y = eventVal.clientY

	const heartTop = eventVal.target.offsetTop
	const heartLeft = eventVal.target.offsetLeft

	const xInside = x - heartLeft
	const yInside = y - heartTop

	heart.style.top = `${yInside}px`
	heart.style.left = `${xInside}px`

	loveMe.appendChild(heart)

	times.innerHTML = ++timesClicked

	setTimeout(() => heart.remove(), 500)
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
