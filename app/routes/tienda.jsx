import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from "~/models/guitarras.server"
import ListadoGuitarras from "../components/listado-guitarras"
import guitarrasStyle from '~/styles/guitarras.css'

export function meta(){
  return[
    {
      title : 'GuitarLA - Tienda de Guitarras',
      description : 'GuitarLA - Nuestra Coleccion de Guitarras'
    }
  ]
}

export function links(){
  return[
    {
      rel : 'stylesheet',
      href : guitarrasStyle
    }
  ]
}


export async function loader(){
  const guitarras = await getGuitarras()
  return guitarras.data
}


const Tienda = () => {

  const guitarras = useLoaderData()

  return (
    <main className="contenedor">
      <ListadoGuitarras

          guitarras={guitarras}
          
      />
    </main>
  )
}

export default Tienda