//https://developer.mozilla.org/es/docs/Glossary/IIFE
(function () {
	let DB;
	let idCliente;

	const nombreInput = document.querySelector('#nombre');
	const emailInput = document.querySelector('#email');
	const telefonoInput = document.querySelector('#telefono');
	const empresaInput = document.querySelector('#empresa');

	const formulario = document.querySelector('#formulario');

	document.addEventListener('DOMContentLoaded', () => {
		conectarDB();

		//Actualizar el registro
		formulario.addEventListener('submit', actualizarCliente);

		//verificar ID de la URL
		const parametrosURL = new URLSearchParams(window.location.search);

		idCliente = parametrosURL.get('id');

		if (idCliente) {
			/* Ponemos un setTimeout para retrasar el lanzamiento de la función "obtenerClientes()"
            para que no de error, ya que todo el tema de las transactions, y consultar la base de datos
            tarda un cierto tiempo, por lo que si se lanza la funcion para consultar la BD puede hacerlo demasiado rapido y dar error
            
            Esto se puede solucionar con la "Programación Asincrona" */
			setTimeout(() => {
				obtenerCliente(idCliente);
			}, 1000);
		}
		// window.indexedDB.open('crm', 1)
	});

	function obtenerCliente(id) {
		const transaction = DB.transaction(['crm'], 'readwrite');
		const objectStore = transaction.objectStore('crm');

		const cliente = objectStore.openCursor();

		cliente.onsuccess = function (e) {
			const cursor = e.target.result;

			if (cursor) {
				if (cursor.value.id === Number(id)) {
					llenarFormulario(cursor.value);
				}

				cursor.continue();
			}
		};
	}

	function llenarFormulario(datosCliente) {
		const { nombre, email, telefono, empresa } = datosCliente;
		nombreInput.value = nombre;
		emailInput.value = email;
		telefonoInput.value = telefono;
		empresaInput.value = empresa;
	}

	function conectarDB() {
		const abrirConexion = window.indexedDB.open('crm', 1);
		/* el "window.indexedDB.open" actiua de manera que busca la BD especificada,
                si NO la troba la crea, 
                si la troba, estableix connexió, pemetent la lectura
            */

		abrirConexion.onerror = () => {
			console.log(`Error al abrir conexion con la BD`);
		};

		abrirConexion.onsuccess = () => {
			DB = abrirConexion.result;
		};
	}

	function actualizarCliente(e) {
		e.preventDefault();

		if (
			nombreInput.value === '' ||
			emailInput.value === '' ||
			telefonoInput.value === '' ||
			empresaInput.value === ''
		) {
			imprimirAlerta('Todos los campos son obligatorios', 'error');
			return;
		}

		const clienteActualizado = {
			nombre: nombreInput.value,
			email: emailInput.value,
			telefono: telefonoInput.value,
			empresa: empresaInput.value,
			id: Number(idCliente), //idCliente es un string, por lo que si se guarda asi, luego al buscarlo para editarlo no lo encontraria
		};

		const transaction = DB.transaction(['crm'], 'readwrite');
		const objectStore = transaction.objectStore('crm');

		objectStore.put(clienteActualizado);

		transaction.oncomplete = function () {
			imprimirAlerta('Datos de cliente actualizados');

			setTimeout(() => {
				window.location.href = 'index.html';
			}, 3000);
		};
		transaction.onerror = function () {
			imprimirAlerta('Error al actualizar', 'error');
		};
	}
})();
