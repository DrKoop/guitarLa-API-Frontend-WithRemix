import { Link } from "@remix-run/react"
import { formatearFecha } from "../utils/helpers"


const Post = ({blogpost}) => {

    const {titulo, contenido, imagen, url, publishedAt } = blogpost

   
  return (
    <article className="post">
        <img src={imagen.data.attributes.formats.small.url} alt={`imagen blog ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">Publicado el: {formatearFecha(publishedAt)}</p>
            <p className="resumen">{contenido}</p>
            <Link to={`/posts/${url}`} className="enlace">Leer Post</Link>
        </div>
    </article>
  )
}

export default Post