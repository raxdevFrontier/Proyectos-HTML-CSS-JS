const jokeElement = document.getElementById("joke")
const jokeBtn = document.getElementById("jokeBtn")

jokeBtn.addEventListener("click", generateJoke)
// generateJoke()

async function generateJoke() {
	const url = "https://icanhazdadjoke.com"
	const config = {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	}

	try {
		const response = await fetch(url, config)
		const data = await response.json()
		// console.log(data.joke)
		jokeElement.innerHTML = data.joke
	} catch (error) {
		console.error(error)
	}
}
