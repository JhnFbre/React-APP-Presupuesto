import {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'
const Modal = ({guardarGasto, 
        presupuesto,
        disponible,
        setModal, 
        setAnimarModal, 
        animarModal, 
        gastoEditar, 
        setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [id, setID] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setID(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[gastoEditar])

    const ocultarModal = () =>{
        setGastoEditar({})
        setModal(false)
        setAnimarModal(false)
    }

    const handleSubmit = e =>{
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 1500);
            return
        }else if(cantidad>presupuesto || cantidad>disponible){
            setMensaje('No puede exceder el presupuesto')
            setTimeout(() => {
                setMensaje('')
            }, 1500);
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
        ocultarModal()
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarBtn} 
                onClick={ocultarModal}
                alt="Cerrar modal" />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : ''}`}>
            <legend>{gastoEditar.nombre ? 'Editar ' :'Nuevo'} Gasto</legend>
            {mensaje  &&  <Mensaje tipo="error" mensaje={mensaje} />}
            <div className="campo">
                <label htmlFor="nombre"></label>
                <input 
                    id='nombre'
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                    type="text"
                    placeholder='Añade un Nombre al gasto'  />
            </div>
            <div className="campo">
                <label htmlFor="cantidad"></label>
                <input 
                    id='cantidad'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    type="number"
                    placeholder='Añade una Cantidad al gasto ej:300'  />
            </div>
            <div className="campo">
                <label htmlFor="categoria"></label>
                <select 
                    name="categoria" 
                    value={categoria}
                    onChange={e=>setCategoria(e.target.value)}
                    id="categoria">
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="varios">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value="Añadir gasto" />
        </form>
    </div>
  )
}

export default Modal