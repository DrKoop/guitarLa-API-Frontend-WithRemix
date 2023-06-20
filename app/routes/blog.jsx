import { useLoaderData } from "@remix-run/react"
import { getPosts } from "../models/post.server"
import blogStyle from '~/styles/blog.css'
import ListadoPost from "../components/llistado-post"

export async function loader(){
  const postAPI = await getPosts()
  return postAPI.data
}

export function meta(){
  return [
    {
      title : 'GuitarLA - Entradas Recientes',
      description : 'Venta Guitarras,blog musica'
    }
  ]
}

export function links(){
  return[
    {
      rel : 'stylesheet',
      href : blogStyle
    }
  ]
}

const Blog = () => {

  const posts = useLoaderData()

  
  return (
    <main className="contenedor">
      <ListadoPost
        posts={posts}
      />
    </main>
  )
}

export default Blog