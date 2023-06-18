import { useLoaderData } from "@remix-run/react"
import { getUrlGuitarra } from "../models/guitarras.server"
import styles from "~/styles/guitarras.css"



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

  const rutaGuitarra = useLoaderData()

  const { nombre, descripcion, imagen, precio} = rutaGuitarra.data[0].attributes

  return (
    <main className="contenedor guitarra">
      <img src={imagen.data.attributes.url} alt={`Imagen de la guitarra : ${nombre}`} />
      <div className="contenido">
        <h1>{nombre}</h1>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
      </div>
    </main>
  )
}

export default Guitarra