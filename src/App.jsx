import { useState, useEffect } from 'react'

import Header from './components/Header'
import NuevoPresupuesto from './components/NuevoPresupuesto'
import ControlPresupuesto from './components/ControlPresupuesto'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'

import {generarId} from './functions/function'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))  ?? 0
  )
  const [disponible, setDisponible] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] =useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastosFiltro, setGastosFiltro] =useState('')
  const [arrayFiltro, setArrayFiltro] =useState([])

  const [gastoEditar, setGastoEditar] =useState({})

  useEffect(()=>{
    const presLS = Number(localStorage.getItem('presupuesto'))  ?? 0
    if(presLS>0){
      setIsValidPresupuesto(true)
    }
  },[])
  
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(()=>{
    if(gastosFiltro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === gastosFiltro)
      setArrayFiltro(gastosFiltrados)
    }
  },[gastosFiltro])
  
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 250);
    }
  },[gastoEditar])

  const handleNuevoGasto = () =>{
    setGastoEditar({})
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 250);
  }

  const guardarGasto = gasto =>{
    if(gasto.id){
      const gastosActualizados = gastos.map(state => state.id === gasto.id ? gasto : state)
      setGastos(gastosActualizados)
    }else{
      gasto.id = generarId()
      gasto.fecha = new Date()
      setGastos([...gastos, gasto])
    }
  }

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(state => state.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header />
      {
        isValidPresupuesto ? 
        (
          <>
            <ControlPresupuesto 
              presupuesto = {presupuesto}
              gastos={gastos}
              disponible={disponible}
              setDisponible={setDisponible}
              setGastos={setGastos}
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
            />
            <div className="nuevo-gasto">
                <img src={IconoNuevoGasto} 
                onClick={handleNuevoGasto}
                alt="IconoNuevoGasto" />
            </div>   
            <Filtros
              gastosFiltro = {gastosFiltro}
              setGastosFiltro={setGastosFiltro}
            />
            <ListadoGastos 
              gastos={gastos} 
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltro ={gastosFiltro}
              arrayFiltro= {arrayFiltro}
              />
              {modal && 
              <Modal 
                presupuesto = {presupuesto}
                setModal={setModal}
                guardarGasto={guardarGasto}
                setAnimarModal={setAnimarModal}
                animarModal={animarModal}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                disponible={disponible}
              />
            }
          </>
        ) : 
        (
        <NuevoPresupuesto 
            presupuesto = {presupuesto}
              setPresupuesto = {setPresupuesto}
              setIsValidPresupuesto = {setIsValidPresupuesto}
          />
        )
      }
    </div>
  )
}

export default App