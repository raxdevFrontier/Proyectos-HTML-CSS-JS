const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
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
