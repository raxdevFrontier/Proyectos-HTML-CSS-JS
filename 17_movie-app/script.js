// const API_URL =
// 	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_hey=4cc8553bcfe3d7c44c0434031ba72ebf&page=1"
const API_URL =
	"https://api.themoviedb.org/3/discover/movie?language=es-ES&page=1&sort_by=popularity.desc"

const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
// const SEARCH_URL =
// 	"https://api.themoviedb.org/3/search/movie?api_hey=4cc8553bcfe3d7c44c0434031ba72ebf&query='&language=es-ES"
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?language=es-ES&query='"

const urlAuthentication = "https://api.themoviedb.org/3/authentication"

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")

getMovies(API_URL)

async function getMovies(url) {
	// const res = await fetch(url)
	// const data = await res.json()

	// console.log(data.results)

	const config = {
		method: "GET",
		headers: {
			Authorization:
				"Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2M4NTUzYmNmZTNkN2M0NGMwNDM0MDMxYmE3MmViZiIsInN1YiI6IjY0N2VlZGEyY2FlZjJkMDBmY2U3MWUzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-RY4eBR-6bYR5xzwAUfFk_ej2-OMWpWL90itYS0Ox4w",
			Accept: "application/json",
		},
	}

	try {
		const response = await fetch(url, config)
		const data = await response.json()

		// console.log(data.results)
		showMovies(data.results)
	} catch (error) {
		console.error(error)
	}
}

function showMovies(movies) {
	main.innerHTML = ""

	movies.forEach((elementInMovies) => {
		const { title, poster_path, vote_average, overview } = elementInMovies

		const movieEl = document.createElement("div")
		movieEl.classList.add("movie")
		movieEl.innerHTML = `
		<img
			src="${IMG_PATH + poster_path}"
			alt="${title}"
		/>
		<div class="movie-info">
			<h3>${title}</h3>
			<span class="${getClassByRate(vote_average)}">${vote_average}</span>
		</div>
		<div class="overview">
			<h3>Overview</h3>
			${overview}
		</div>
		`
		main.appendChild(movieEl)
	})
}

function getClassByRate(vote) {
	if (vote >= 8) {
		return "green"
	} else if (vote >= 5) {
		return "orange"
	} else {
		return "red"
	}
}

form.addEventListener("submit", (event) => {
	event.preventDefault()

	const searchTerm = search.value

	if (searchTerm && searchTerm !== "") {
		getMovies(SEARCH_URL + searchTerm)

		search.value = ""
	} else {
		window.location.reload()
	}
})
