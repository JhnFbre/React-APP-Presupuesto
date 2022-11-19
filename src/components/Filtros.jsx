import {useState, useEffect} from 'react'

const Filtros = ({gastosFiltro, setGastosFiltro}) => {
  return (
    <div className='filtros sombra contenedor mt'>
        <form>
            <div className="campo">
                <label htmlFor="filtro">Filtrar gastos</label>
                <select name="filtro" 
                    value={gastosFiltro}
                    onChange={e=>setGastosFiltro(e.target.value)}
                    id="filtro">
                    <option value="">-- Todos --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="varios">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros