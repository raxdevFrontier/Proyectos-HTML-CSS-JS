const url = 'http://localhost:4000/clientes'

//Creando nuevo cliente
export const nuevoCliente = async (cliente) => {
	try {
		await fetch(url, {
			//datos de confuracion
			method: 'POST', //metodo que se realiza, en este caso enviar datos a la API
			body: JSON.stringify(cliente), //contenido de la peticion (string o object)
			headers: {
				//informacion del tipo de datos que mandamos
				'Content-Type': 'application/json', //en este caso el "content-type" es de tipo JSON
			},
		})
		window.location.href = 'index.html'
	} catch (error) {
		console.log(error)
	}
}

// Obtener clientes
export const obtenerClientes = async () => {
	try {
		const resultado = await fetch(url)
		const clientes = await resultado.json()
		return clientes
	} catch (error) {
		console.log(error)
	}
}

export const eliminarCliente = async (id) => {
	try {
		await fetch(`${url}/${id}`, {
			method: 'DELETE',
		})
	} catch (error) {
		console.log(error)
	}
}

// obtener un cliente para edicion por su ID
export const obtenerCliente = async (id) => {
	try {
		const resultado = await fetch(`${url}/${id}`)
		const cliente = await resultado.json()
		return cliente
	} catch (error) {
		console.log(error)
	}
}

//actualizar cliente
export const editarCliente = async (cliente) => {
	console.log(cliente)
	try {
		await fetch(`${url}/${cliente.id}`, {
			method: 'PUT',
			body: JSON.stringify(cliente),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		window.location.href = 'index.html'
	} catch (error) {
		console.log(error)
	}
}
