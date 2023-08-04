const pokemonCard = document.getElementById("poke-container")
const filter = document.getElementById("poke-region")
const pokemonCount = 20
const regions = {
	kanto: {
		firstID: 1,
		count: 150,
	},
	jotho: {
		firstID: 152,
		count: 99,
	},
	hoenn: {
		firstID: 252,
		count: 134,
	},
	sinnoh: {
		firstID: 387,
		count: 107,
	},
	unova: {
		firstID: 495,
		count: 154,
	},
	kalos: {
		firstID: 650,
		count: 71,
	},
	alola: {
		firstID: 722,
		count: 87,
	},
	galar: {
		firstID: 810,
		count: 95,
	},
	paldea: {
		firstID: 906,
		count: 104,
	},
}
const colorsType = {
	fire: "#FFB163",
	grass: "#94D49D",
	electric: "#F9EA9F",
	water: "#85C9E3",
	ground: "#DDAB78",
	rock: "#CBC391",
	fairy: "#fceaff",
	poison: "#D58FE5",
	bug: "#BEE736",
	dragon: "#1992F4",
	psychic: "#FFA4A3",
	flying: "#B4C5EF",
	fighting: "#E27191",
	normal: "#D9DBDC",
	ice: "#B1E7E3",
	ghost: "#8A8CCC",
	dark: "#A9ABB1",
}

const main_types = Object.keys(colorsType)

/*Combinar color de tipos: https://www.campusmvp.es/recursos/post/mezclando-colores-y-creando-efectos-fotograficos-en-css-mediante-el-uso-de-blend-modes.aspx*/

const fetchPokemons = async (firstPokemon, count) => {
	for (let i = firstPokemon; i <= firstPokemon + count; i++) {
		await getPokemon(i)
	}
}

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const res = await fetch(url)
	const data = await res.json()
	createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
	const pokemonEl = document.createElement("div")
	pokemonEl.classList.add("pokemon")

	const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
	const pokeID = pokemon.id.toString().padStart(3, "0")
	const pokeTypes = pokemon.types.map((type) => type.type.name)
	const primaryType = pokeTypes[0]

	const color = colorsType[primaryType]

	let pokemonInnerHTML = ""

	if (pokeTypes.length > 1) {
		const secondaryType = pokeTypes[1]
		const colorSecondary = colorsType[secondaryType]

		pokemonEl.style.background = `linear-gradient(to right, ${color}, ${colorSecondary})`

		pokemonInnerHTML = `
			<div class="img-container">
				<img
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
					alt="${pokeName}"
				/>
			</div>
			<div class="info">
				<span class="number">#${pokeID}</span>
				<h3 class="name">${pokeName}</h3>
				<small class="type">Type: 
					<p>
						<span style="background-color: ${color}">${primaryType}</span>
						<span class="secondaryType" style="background-color:${colorSecondary}">${secondaryType}</span>
					</p>
				</small>
			</div>`
	} else {
		pokemonEl.style.backgroundColor = color

		pokemonInnerHTML = `
			<div class="img-container">
				<img
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
					alt="${pokeName}"
				/>
			</div>
			<div class="info">
				<span class="number">#${pokeID}</span>
				<h3 class="name">${pokeName}</h3>
				<small class="type">Type: 
					<p>
						<span style="background-color: ${color}">${primaryType}</span>
					</p>
				</small>
			</div>`
	}

	pokemonEl.innerHTML = pokemonInnerHTML

	pokemonCard.appendChild(pokemonEl)
}

const fetchRegions = async () => {
	for (let i = 1; i <= 10; i++) {
		addRegionsOnDropdown(await getRegion(i))
	}
}

const getRegion = async (id) => {
	const url = `https://pokeapi.co/api/v2/region/${id}`
	const res = await fetch(url)
	const data = await res.json()
	return (regionName = data.name)
}

filter.addEventListener("change", () => {
	let clavesRegion = Object.keys(regions)
	let claveRegion = clavesRegion[filter.selectedIndex - 1]
	const idFirstPokemon = regions[claveRegion].firstID
	const numPokemonRegion = regions[claveRegion].count

	pokemonCard.innerHTML = ""
	fetchPokemons(idFirstPokemon, numPokemonRegion)
})

const addRegionsOnDropdown = (region) => {
	if (region !== "hisui") {
		const option = document.createElement("option")
		option.value = region
		option.text = region
		filter.appendChild(option)
	}
}

fetchRegions()
