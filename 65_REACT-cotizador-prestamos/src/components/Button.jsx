//con las extensiones instaladas,
// al escribir "rfc" se escribirá la estructura basica de un componente
// y con "rfce" se escribre la estructura basica + el "export default"

function Button() {
	return (
		<button
			type="button"
			className="h-10 w-10 flex items-center justify-center font-bold text-white text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-lime-500"
			// onClick={handleClickDecremento}
		>
			-
		</button>
	)
}

export default Button
