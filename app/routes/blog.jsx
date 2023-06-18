import { useLoaderData } from "@remix-run/react"
import { getPosts } from "../models/post.server"
import Post from "../components/post"
import blogStyle from '~/styles/blog.css'

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
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map( blogpost => (
          <Post
            key={blogpost.id}
            blogpost={blogpost.attributes}
          />
        ))}
      </div>
    </main>
  )
}

export default Blog