import { useLoaderData, useOutletContext } from "@remix-run/react"
import { getUrlGuitarra } from "../models/guitarras.server"
import styles from "~/styles/guitarras.css"
import { useState } from "react"



export async function loader({params}){

  const { guitarraUrl } = params
  
  const pathGuitarra = await getUrlGuitarra(guitarraUrl)

  //Manejo de errores en rutas no encontradas
  if(pathGuitarra.data.length === 0){
    throw new Response( '',{
      status : 404,
      statusText : 'Error , Guitarra No Encontrada.'
    })
  }

  return pathGuitarra
}


export function meta({data}){

  //Manejo de Errores
  if(!data){
    return{
      title : 'Error , Guitarra No Encontrada.',
      description : `Guitarras, venta de guitarras, Guitarra no Encontrada`
      
    }
  }
  
  return[
    {
      title : `GuitarLA - ${data.data[0].attributes.nombre}`,
      description : `Guitarras, venta de guitarras, guitarra  ${data.data[0].attributes.nombre}`,
    }
  ]
  
}


export function links(){
  return[
    {
      rel : 'stylesheet',
      href : styles
    }
  ]
}



const Guitarra = () => {

  const {agregarAlCarrito} = useOutletContext()
  


  const[ cantidad, setCantidad] = useState(0)


  const rutaGuitarra = useLoaderData()

  const { nombre, descripcion, imagen, precio} = rutaGuitarra.data[0].attributes


  const handleSubmit = e => {
      e.preventDefault()

      if( +cantidad === 0 ){
        alert('debes seleccionar una cantidad')
        return
      }


      const guitarraSeleccionada = {
        id : rutaGuitarra.data[0].id,
        imagen : imagen.data.attributes.url,
        nombre,
        precio,
        cantidad
      }

      let msjSucces = document.querySelector(".contenido")
      let appendMsjSucces = document.createElement('p');
      appendMsjSucces.classList.add('alerta_agregar')
      appendMsjSucces.textContent = 'Agregaste un Producto al Carrito.'
      msjSucces.appendChild(appendMsjSucces)

      setTimeout(() => {
        msjSucces.removeChild(appendMsjSucces)
      }, 1500);


      agregarAlCarrito(guitarraSeleccionada)
  }


/*   const clickAgregar = () => {


    if( +cantidad === 0 ){
      return
    }else{

  
      setTimeout(() => {
           <p>test</p>
  
      }, 2000);
    }

  } */

  return (
    <main className="contenedor guitarra">
      <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra : ${nombre}`} />
      <div className="contenido">
        <h1>{nombre}</h1>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={ handleSubmit } className="formulario">
          <label htmlFor="cantidad">Cantidad:</label>
          <select
            onChange={ e => setCantidad(Number(e.target.value)) }
            id="cantidad"
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value="Agregar al Carrito" className="btn_agregar"  /* onClick={ clickAgregar } */ />
        </form>

      </div>
    </main>
  )
}

export default Guitarra