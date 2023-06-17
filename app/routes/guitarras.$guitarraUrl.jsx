import { useLoaderData } from "@remix-run/react"
import { getUrlGuitarra } from "../models/guitarras.server"
import styles from "~/styles/guitarras.css"


export function meta({data}){
  
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

export async function loader({params}){

  const { guitarraUrl } = params
  
  const pathGuitarra = await getUrlGuitarra(guitarraUrl)

  return pathGuitarra
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