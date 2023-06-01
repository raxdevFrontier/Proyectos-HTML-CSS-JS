const tagsEl = document.getElementById("tags")
const textarea = document.getElementById("textarea")

textarea.focus()

textarea.addEventListener("keyup", (event) => {
	createTags(event.target.value)
	// .target - devuelve el elemento en el que escuchamos el evento (en este caso el "textarea")
	// .value - devuelve el valor que tiene el elemento (en este caso el contenido del textarea)

	// .trim() quita espacio en blanco en ambos extremos de una cadena y deviuelve una nueva cadena (sin modificar la original)

	if (event.key === "Enter") {
		setTimeout(() => {
			event.target.value = ""
		}, 10)

		randomSelect()
	}
})

function createTags(input) {
	const tagsArray = input
		.split(",")
		.filter((tagInArray) => tagInArray.trim() !== "")
		.map((tagInArray) => tagInArray.trim())

	tagsEl.innerHTML = ""

	tagsArray.forEach((tagInArray) => {
		const tagElement = document.createElement("span")
		tagElement.classList.add("tag")
		tagElement.innerHTML = tagInArray
		tagsEl.appendChild(tagElement)
	})
}

function randomSelect() {
	const times = 30
	//vvvvvvvv Parpadear entre las diferentes etiquetas vvvvvv
	const interval = setInterval(() => {
		const randomTag = pickRandomTag()

		highlightTag(randomTag)
		setTimeout(() => {
			unHighlightTag(randomTag)
		}, 100)
	}, 100)
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	//vvvvvvvv Parar el parpadeo y seleccionar un   vvvvvv
	setTimeout(() => {
		clearInterval(interval)

		setTimeout(() => {
			const randomTag = pickRandomTag()

			highlightTag(randomTag)
		}, 100)
	}, times * 100)
}

function pickRandomTag() {
	const tags = document.querySelectorAll(".tag")
	return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
	tag.classList.add("highlight")
}
function unHighlightTag(tag) {
	tag.classList.remove("highlight")
}
