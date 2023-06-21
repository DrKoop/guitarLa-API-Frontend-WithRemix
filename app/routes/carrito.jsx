import carritoStyles from '~/styles/carrito.css'


export function links(){
    return[
        {
            rel : 'stylesheet',
            href : carritoStyles
        }
    ]
}

export function meta(){
    return[
        {
            title : 'GuitarLA - Carrito de Compras',
            description : ' Venta de Guitarras, música,blog, carrito de compras, tienda'
        }
    ]
}


const Carrito = () => {
  return (
    <main className="contenedor">
        <h1 className="heading">Carrito De Compras</h1>
        <div className="contenido">

            <div className="carrito">
                <h2>Articulos</h2>
            </div>
            <aside className="resumen">
                <h4>Resumen del Pedido</h4>
                <p>Total a Pagar:</p>
            </aside>
        </div>


        
    </main>
  )
}

export default Carrito