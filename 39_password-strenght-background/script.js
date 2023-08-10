const bg = document.getElementById("background")
const passInput = document.getElementById("password")

passInput.addEventListener("input", () => {
	const passLength = passInput.value.length
	const blurValue = 20 - passLength
	bg.style.filter = `blur(${blurValue}px)`
})

// ---- Forma del curs -------
// passInput.addEventListener("input", (e) => {
// 	const passValue = e.target.value
// 	const passLength = passValue.length
// 	const blurValue = 20 - passLength
// 	bg.style.filter = `blur(${blurValue}px)`
// })
