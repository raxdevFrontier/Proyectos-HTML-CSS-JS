const sounds = ["applause", "boo", "gasp", "tada", "victory", "wrong"]

sounds.forEach((elementInSounds) => {
	const btn = document.createElement("button")
	btn.classList.add("btn")

	btn.innerText = elementInSounds

	btn.addEventListener("click", () => {
		stopSongs()
		document.getElementById(elementInSounds).play()
	})

	document.getElementById("buttons").appendChild(btn)
})

function stopSongs() {
	sounds.forEach((elementInSounds) => {
		const song = document.getElementById(elementInSounds)

		song.pause()
		song.currentTime = 0
	})
}
