// const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_hey=4cc8553bcfe3d7c44c0434031ba72ebf&page=1"
const API_URL =
	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_hey=4cc8553bcfe3d7c44c0434031ba72ebf&page=1&language=es-ES"

const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_URL =
	"https://api.themoviedb.org/3/search/movie?api_hey=4cc8553bcfe3d7c44c0434031ba72ebf&query='&language=es-ES"

getMovies(API_URL)

async function getMovies(url) {
	const res = await fetch(url)
	const data = await res.json()

	console.log(data.results)
}
