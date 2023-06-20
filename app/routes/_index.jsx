import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from "../models/guitarras.server"
import { getCurso } from "../models/curso.server"
import { getPosts } from "../models/post.server"
import ListadoGuitarras from "../components/listado-guitarras"

import styleGuitarras from "~/styles/guitarras.css"
import blogStyle from '~/styles/blog.css'
import styleCurso from '~/styles/curso.css'
import ListadoPost from "../components/llistado-post"
import Curso from "../components/curso"


export function meta(){

}

export function links(){
  return[
    {
      rel : 'stylesheet',
      href : styleGuitarras,
    },
    {
      rel : 'stylesheet',
      href : blogStyle,
    },
    {
      rel : 'stylesheet',
      href : styleCurso,
    }
]
}

export async function loader(){


  const [ guitarras , posts,cursoAPI] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])


  return {
    guitarras: guitarras.data,
    posts : posts.data,
    cursoAPI : cursoAPI.data
  }
}


const Index = () => {

  
  const { guitarras, posts, cursoAPI } = useLoaderData()


  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>

      <Curso
        cursoAPI={cursoAPI.attributes}
      />

      <section className="contenedor">
        <ListadoPost
          posts={posts}
        />
      </section>
    </>
  )
}

export default Index