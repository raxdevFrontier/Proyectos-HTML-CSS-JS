//https://developer.mozilla.org/es/docs/Glossary/IIFE
(function () {
	let DB;
	const formulario = document.querySelector('#formulario');

	document.addEventListener('DOMContentLoaded', () => {
		//Conectar DB
		conectarDB();

		formulario.addEventListener('submit', validarCliente);
	});

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

	function validarCliente(e) {
		e.preventDefault();

		//Leer inputs formulari
		const nombre = document.querySelector('#nombre').value;
		const email = document.querySelector('#email').value;
		const telefono = document.querySelector('#telefono').value;
		const empresa = document.querySelector('#empresa').value;

		if (
			nombre === '' ||
			email === '' ||
			telefono === '' ||
			empresa === ''
		) {
			imprimirAlerta('Todos los campos son obligatorios', 'error');
			return;
		}
	}

	function imprimirAlerta(mensaje, tipo) {
		const alerta = document.querySelector('.alerta'); //buscamos si existe una alerta

		//si no existe la alerta la crea y la muestra (en caso de que exista no hace nada)
		if (!alerta) {
			//crear alerta
			const divMensaje = document.createElement('div');
			divMensaje.classList.add(
				'alerta',
				'px-4',
				'py-3',
				'rounded',
				'max-w-lg',
				'mx-auto',
				'mt-6',
				'text-center',
				'border'
			);

			if (tipo === 'error') {
				divMensaje.classList.add(
					'bg-red-100',
					'border-red-400',
					'text-red-700'
				);
			} else {
				divMensaje.classList.add(
					'bg-green-100',
					'border-green-400',
					'text-green-700'
				);
			}
			divMensaje.textContent = mensaje;

			formulario.appendChild(divMensaje);

			setTimeout(() => {
				divMensaje.remove();
			}, 3000);
		}
	}
})();
