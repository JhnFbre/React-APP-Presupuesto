import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar,eliminarGasto, gastosFiltro, arrayFiltro}) => {
  return (
    <div className='listado-gastos contenedor mt'>
        {
          gastosFiltro ? (
            <>
              <h2 className='main'>{arrayFiltro.length ? "Gastos" : "No hay Gastos aún"}</h2>
              {arrayFiltro.map(gasto =>(
              <Gasto key={gasto.id} 
                gasto={gasto} 
                setGastoEditar={setGastoEditar} 
                eliminarGasto={eliminarGasto} />
              ))}
            </>
          ) : (
            <>
              <h2 className='main'>{gastos.length ? "Gastos" : "No hay Gastos aún"}</h2>
              {gastos.map(gasto =>(
                <Gasto key={gasto.id} 
                gasto={gasto} 
                setGastoEditar={setGastoEditar} 
                eliminarGasto={eliminarGasto} />
              ))}
            </>
          )
        }
    </div>
  )
}

export default ListadoGastos