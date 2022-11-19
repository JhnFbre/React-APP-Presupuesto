import {useState ,useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    presupuesto, 
    gastos, 
    disponible, 
    setDisponible,
    setGastos,
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    
    const [porcentaje, setPorcentaje] = useState(0)
    const [alerta, setAlerta] = useState(false)
    const [gastado, setGastado] = useState(0)

    useEffect(()=>{
        const totalGastado = gastos.reduce((total, gasto)=>gasto.cantidad + total, 0)
        const nuevoporcentaje = (totalGastado * 100)/presupuesto
        const totalDisponible = presupuesto-totalGastado
        const porcentajeAlerta = (presupuesto*30)/100

        setPorcentaje(nuevoporcentaje)
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        
        if(totalDisponible<porcentajeAlerta){
            setAlerta(true)
        }else{
            setAlerta(false)
        }
    },[gastos])

    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style : 'currency',
            currency: 'USD'
        })
    }
    const handleResetApp = () =>{
        const resultado = confirm('Esta seguro?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor : alerta ? '#DC2626' : '#3B82F6',
                    trailColor : '#F5F5F5',
                    textColor : alerta ? '#DC2626' : '#3B82F6'
                })}
                value={porcentaje}
                text = {`${porcentaje}% usado`}
            /> 
        </div>
        <div className="contenido-presupuesto">
            <button 
                className='reset-app' 
                type='button'
                onClick={handleResetApp}
                >
                Resetear APP
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${alerta ? 'negativo' : '' }`}>
                <span>Disponible:</span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Utilizado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto