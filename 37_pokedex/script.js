const pokemonCard = document.getElementById("poke-container")
const topPage = document.getElementById("top-page")
const pokemonCount = 151
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

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemonCount; i++) {
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
	// const type = main_types.find((type) => pokeTypes.indexOf(type) > -1)
	const primaryType = pokeTypes[0]

	const color = colorsType[primaryType]

	// pokemonEl.style.backgroundColor = color

	let pokemonInnerHTML = ""

	if (pokeTypes.length > 1) {
		const secondaryType = pokeTypes[1]
		const colorSecondary = colorsType[secondaryType]

		pokemonEl.style.background = `linear-gradient(to right, ${color}, ${colorSecondary})`

		pokemonInnerHTML = `
			<div class="img-container">
				<img
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg"
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
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg"
					alt="bulbasaur"
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
	// const pokemonInnerHTML = `
	// <div class="img-container">
	// 	<img
	// 		src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg"
	// 		alt="bulbasaur"
	// 	/>
	// </div>
	// <div class="info">
	// 	<span class="number">#${pokeID}</span>
	// 	<h3 class="name">${pokeName}</h3>
	// 	<small class="type">Type:
	// 		<p>
	// 			<span>${type}</span>
	// 			<span class="secondaryType">${type}</span>
	// 		</p>
	// 	</small>
	// </div>`

	pokemonEl.innerHTML = pokemonInnerHTML

	pokemonCard.appendChild(pokemonEl)
}

fetchPokemons()
