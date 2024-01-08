import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [cantidad, setCantidad] = useState(100)

  // setCantidad(1000) // Esto da error, pero para modificar el state deberia hacerse algo así

  function handleChange(e) {
    //Aqui recogemos toda la logica que queremos ejecutar al darse el evento "Change"
    // Y por convenio, este tipo de funciones, se nombran como "handle" + "nombre del evento"
    // console.log(+e.target.value)
    console.log(Number(e.target.value))
  }
  /* Codigo JavaScript*/
  return (
    /* Codigo HTML */
    <div className="my-2 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <input 
        type="range" 
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600" 
        onChange={handleChange}
        />
    </div>
  )
}

export default App
