//https://developer.mozilla.org/es/docs/Glossary/IIFE
(function(){
    let DB

    document.addEventListener('DOMContentLoaded', () => {
        crearDB()
    })

    //Crea base de datos de IndexDB
    function crearDB(){
        const crearDB = window.indexedDB.open('crm', 1)

        crearDB.onerror = function() {
            console.log('Error al crear BD')
        }

        crearDB.onsuccess = function() {
            DB = crearDB.result
        }

        crearDB.onupgradeneeded = function(e){
            const db = e.target.result

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true})

            objectStore.createIndex('nombre', 'nombre', { unique: false })
            objectStore.createIndex('email', 'email', { unique: true })
            objectStore.createIndex('telefono', 'telefono', { unique: false })
            objectStore.createIndex('empresa', 'empresa', { unique: false })
            objectStore.createIndex('id', 'id', { unique: true })

            console.log('DB Lista')
        }
    }
})()