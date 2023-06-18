import { useLoaderData } from "@remix-run/react"
import { getUrlPosts } from "../models/post.server"
import { formatearFecha } from "../utils/helpers"
import blogStyle from '~/styles/blog.css'

export function links(){
  return[
    {
      rel : 'stylesheet',
      href : blogStyle
    }
  ]
}

export function meta({data}){

  //Manejo de Errores
  if(!data){
    return{
      title : 'Entrada No Encontrada.',
      description : `Guitarras, venta de guitarras, Entrada no Encontrada`
      
    }
  }
  
  return[
    {
      title : `GuitarLA - ${data.data[0].attributes.titulo}`,
      description : `Guitarras, venta de guitarras, entrada  ${data.data[0].attributes.titulo}`,
    }
  ]
  
}


export async function loader({params}){
  const { postUrl } = params
  const pathURLposts = await getUrlPosts(postUrl)

  if( pathURLposts.data.length === 0){
    throw new Response('', {
      status : 404,
      statusText : 'Entrada No Encontrada.'
    })
  }

  return pathURLposts
}


export default function Post() {

  const postRuta = useLoaderData()

  const { titulo, contenido,imagen, publishedAt } = postRuta.data[0].attributes

  return (
    <article className="contenedor post mt-3">
        <img src={imagen.data.attributes.url} alt={`imagen blog ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">Publicado el: {formatearFecha(publishedAt)}</p>
            <p className="texto">{contenido}</p>
        </div>
    </article>
  )
}
