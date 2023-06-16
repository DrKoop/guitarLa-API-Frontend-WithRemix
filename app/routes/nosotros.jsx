import imagenNosotros from '../../public/img/nosotros.jpg'
import stylesNosotros from '../styles/nosotros.css'

export function meta(){
  return [
    {
      title : 'GuitarLA - Sobre Nosotros',
      description : 'Venta Guitarras,blog musica'
    }
  ]
}

export function links(){
  return[
    {
      rel : 'stylesheet',
      href : stylesNosotros
    },
    {
      rel: 'preload',
      href: imagenNosotros,
      as : 'image'
    }
  ]
}


const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h1 className="heading">Nosotoros</h1>

      <div className="contenido">
          <img src={imagenNosotros} className='' alt='Imagen sobre Nosotros' />
          <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, cumque officiis eveniet omnis officia necessitatibus error nemo adipisci! Suscipit veniam voluptate eius ducimus unde perspiciatis, mollitia quos laborum? Quae tenetur vel facere excepturi sequi! Perferendis exercitationem molestiae commodi nisi maxime.</p>
          <p>Consectetur adipisicing elit. Similique, cumque officiis eveniet omnis officia necessitatibus error nemo adipisci! Suscipit veniam voluptate eius ducimus unde perspiciatis, mollitia quos laborum? Quae tenetur vel facere excepturi sequi! Perferendis exercitationem molestiae commodi nisi maxime.</p>
        </div>

      </div>



    </main>
  )
}

export default Nosotros