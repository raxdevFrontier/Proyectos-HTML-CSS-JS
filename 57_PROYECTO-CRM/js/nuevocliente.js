//https://developer.mozilla.org/es/docs/Glossary/IIFE
;(function () {
	const formulario = document.querySelector('#formulario')

	document.addEventListener('DOMContentLoaded', () => {
		//Conectar DB
		conectarDB()

		formulario.addEventListener('submit', validarCliente)
	})

	function validarCliente(e) {
		e.preventDefault()

		//Leer inputs formulari
		const nombre = document.querySelector('#nombre').value
		const email = document.querySelector('#email').value
		const telefono = document.querySelector('#telefono').value
		const empresa = document.querySelector('#empresa').value

		if (nombre === '' || email === '' || telefono === '' || empresa === '') {
			imprimirAlerta('Todos los campos son obligatorios', 'error')
			return
		}

		// crear objeto con la info
		const cliente = {
			nombre,
			email,
			telefono,
			empresa,
			id: Date.now(),
		}

		crearNuevoCliente(cliente)
	}

	function crearNuevoCliente(cliente) {
		console.log(DB)
		const transaction = DB.transaction(['crm'], 'readwrite')

		const objectStore = transaction.objectStore('crm')

		objectStore.add(cliente)

		transaction.onerror = function () {
			imprimirAlerta('ERROR al agregar cliente', 'error')
		}
		transaction.oncomplete = function () {
			imprimirAlerta('Cliente agregado correctamente')

			setTimeout(() => {
				window.location.href = 'index.html'
			}, 3000)
		}
	}
})()
