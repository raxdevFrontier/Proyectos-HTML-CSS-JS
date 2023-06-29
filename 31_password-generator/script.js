/* CHALLENGE
	Con el codigo actual, la contraseña siempre mantendrá el patron establecido en "randomFunc"
	es decir, la contraseña generada siempre tendra el formato: 
	(lowerCase)(uppercase)(number)(symbol) - por ejemplo: aB6% o hP1/

	en funcion claro de si esta marcada la checkbox correspondiente

	como CHALLENGE se puede hacer que este patron sea aleatorio cada vez 
*/

const resultEl = document.getElementById("result")
const lengthEl = document.getElementById("length")
const uppercaseEl = document.getElementById("uppercase")
const lowercaseEl = document.getElementById("lowercase")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const generateEl = document.getElementById("generate")
const clipboardEl = document.getElementById("clipboard")

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
}

clipboardEl.addEventListener("click", () => {
	// const textarea = document.createElement("textarea")
	// const password = resultEl.innerText

	// if (!password) {
	// 	return
	// }

	// textarea.value = password
	// document.body.appendChild(textarea)
	// textarea.select()
	// document.execCommand("copy")
	// textarea.remove()
	// alert("Password copied to clipboard!")

	const password = resultEl.innerText

	if (!password) {
		return
	}
	navigator.clipboard
		.writeText(password)
		.then(alert("Password copied to clipboard!"))
		.catch(alert("Error copying password"))
})

generateEl.addEventListener("click", () => {
	//amb el "+" davant 'parsegem' el valor de lengthEl.value (es a dir el valor del input de la logitud de la password)
	const howLength = +lengthEl.value
	const hasLower = lowercaseEl.checked
	const hasUpper = uppercaseEl.checked
	const hasNumber = numbersEl.checked
	const hasSymbol = symbolsEl.checked

	resultEl.innerText = generatePass(hasLower, hasUpper, hasNumber, hasSymbol, howLength)
})

function generatePass(lower, upper, number, symbol, length) {
	let generatedPass = ""
	const typesCount = lower + upper + number + symbol
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		(item) => Object.values(item)[0]
	)

	if (typesCount === 0) {
		return ""
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach((type) => {
			const functName = Object.keys(type)[0]
			generatedPass += randomFunc[functName]()
		})
	}

	const finalPass = generatedPass.slice(0, length)
	return finalPass
}
function getRandomLower() {
	/* Math.random() * (max - min) + min; 
    el codigo anterior devuelve un número aleatorio situado entre dos valores específicos. 
    (El valor devuelto será mayor o igual que 'min' y menor que 'max')
    que usado con Math.floor() nos devuelve en formato int
     */
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
	/*usaremo el String.fromCharCode() para obtener un caracter de la tabla ASCII
    en el caso de las minusculas (97 - 122)*/
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
	const symbols = "!@#$%^&*(){}[]=<>/,."
	return symbols[Math.floor(Math.random() * symbols.length)]
}
