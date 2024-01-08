import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [cantidad, setCantidad] = useState(50)

  const MIN = 0
  const MAX = 100
  const STEP = 10

  // setCantidad(1000) // Esto da error, pero para modificar el state deberia hacerse algo así

  function handleChange(e) {
    //Aqui recogemos toda la logica que queremos ejecutar al darse el evento "Change"
    // Y por convenio, este tipo de funciones, se nombran como "handle" + "nombre del evento"
    
    setCantidad(Number(e.target.value))
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
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
        />

        <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>{cantidad}</p>
    </div>
  )
}

export default App
