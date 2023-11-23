//https://developer.mozilla.org/es/docs/Glossary/IIFE
(function () {
	let DB;
	const listadoClientes = document.querySelector('#listado-clientes');

	document.addEventListener('DOMContentLoaded', () => {
		crearDB();

		if (window.indexedDB.open('crm', 1)) {
			obtenerClientes();
		}
	});

	//Crea base de datos de IndexDB
	function crearDB() {
		const crearDB = window.indexedDB.open('crm', 1);

		crearDB.onerror = function () {
			console.log('Error al crear BD');
		};

		crearDB.onsuccess = function () {
			DB = crearDB.result;
		};

		crearDB.onupgradeneeded = function (e) {
			const db = e.target.result;

			const objectStore = db.createObjectStore('crm', {
				keyPath: 'id',
				autoIncrement: true,
			});

			objectStore.createIndex('nombre', 'nombre', { unique: false });
			objectStore.createIndex('email', 'email', { unique: true });
			objectStore.createIndex('telefono', 'telefono', { unique: false });
			objectStore.createIndex('empresa', 'empresa', { unique: false });
			objectStore.createIndex('id', 'id', { unique: true });

			console.log('DB Lista');
		};
	}

	function obtenerClientes() {
		const abrirConexion = window.indexedDB.open('crm', 1);

		abrirConexion.onerror = function () {
			console.log('Hubo un error al obtener los clientes');
		};

		abrirConexion.onsuccess = function () {
			DB = abrirConexion.result;

			limpiarHTML();

			//leer contenido base de datos
			const objectStore = DB.transaction('crm').objectStore('crm');

			objectStore.openCursor().onsuccess = function (e) {
				const cursor = e.target.result;

				if (cursor) {
					const { nombre, email, telefono, empresa, id } =
						cursor.value;

					// const listadoClientes =
					// 	document.querySelector('#listado-clientes');

					/*--------------------  MI CODIGO  --------------------
					const rowCliente = document.createElement('tr');
					rowCliente.dataset.id = id;

					// SCRIPTING DE LOS ELEMENTOS...
					const dataNombre = document.createElement('td');
					dataNombre.classList.add(
						'px-6',
						'py-3',
						'border-b',
						'border-gray-200',
						'text-left',
						'text-xs',
						'leading-4',
						'font-medium',
						'text-black-600',
						'tracking-wider'
					);
					dataNombre.innerHTML = `${nombre}`;

					const dataTelefono = document.createElement('td');
					dataTelefono.classList.add(
						'px-6',
						'py-3',
						'border-b',
						'border-gray-200',
						'text-left',
						'text-xs',
						'leading-4',
						'font-medium',
						'text-black-600',
						'tracking-wider'
					);
					dataTelefono.innerHTML = `${telefono}`;

					const dataEmpresa = document.createElement('td');
					dataEmpresa.classList.add(
						'px-6',
						'py-3',
						'border-b',
						'border-gray-200',
						'text-left',
						'text-xs',
						'leading-4',
						'font-medium',
						'text-black-600',
						'tracking-wider'
					);
					dataEmpresa.innerHTML = `${empresa}`;

					const dataActions = document.createElement('td');
					dataActions.classList.add(
						'px-6',
						'py-3',
						'border-b',
						'border-gray-200',
						'text-left',
						'text-xs',
						'leading-4',
						'font-medium',
						'text-black-600',
						'tracking-wider'
					);
					dataActions.innerHTML = ' ';

					// Agregar al HTML
					rowCliente.appendChild(dataNombre);
					// rowCliente.appendChild(dataEmail);
					rowCliente.appendChild(dataTelefono);
					rowCliente.appendChild(dataEmpresa);
					rowCliente.appendChild(dataActions);

					listadoClientes.appendChild(rowCliente);
                    -------------------- FIN DE MI CODIGO   -----------------------
                    */

					listadoClientes.innerHTML += ` 
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                            </td>
                        </tr>
                    `;

					cursor.continue();
				} else {
					console.log('No hay más registros...');
				}
			};
		};
	}

	function limpiarHTML() {
		while (listadoClientes.firstChild) {
			listadoClientes.removeChild(listadoClientes.firstChild);
		}
	}
})();
