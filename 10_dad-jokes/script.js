const jokeElement = document.getElementById("joke")
const jokeBtn = document.getElementById("jokeBtn")

generateJoke()

function generateJoke() {
	const config = {
		header: {
			Accept: "application/json",
		},
	}

	fetch(`https://icanhazdadjoke.com`, config)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			// jokeElement.innerHTML = data.joke
		})
}
