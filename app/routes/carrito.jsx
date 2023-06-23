import { useOutletContext } from '@remix-run/react'
import { useState, useEffect } from 'react'
import { ClientOnly } from 'remix-utils'
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

    const[ total, setTotal ] = useState(0)

    const { carrito, actualizarCantidadSelect,eliminarGuitarra } = useOutletContext()

    useEffect(() => {
        const calculoTotal = carrito.reduce( (acumulado, producto) => acumulado + ( producto.cantidad * producto.precio), 0)
        setTotal(calculoTotal)
    }, [carrito])

  return (
    <ClientOnly fallback={'Cargando..'}>
        { () => (
        <main className="contenedor">
            <h1 className="heading">Carrito De Compras</h1>
            <div className="contenido">

                <div className="carrito">
                    <h2>Articulos</h2>
                    { carrito?.length === 0 ? ' Carrito Vacío ' : (
                        carrito?.map( dataProducto => (
                            <div key={dataProducto.id} className='producto' >
                                <div>
                                    <img src={dataProducto.imagen} alt={`Imagen del Producto ${dataProducto.nombre}`} />
                                </div>
                                <div>
                                    <p className="nombre">{dataProducto.nombre}</p>
                                    <p>Cantidad :</p>
                                    <select 
                                        value={dataProducto.cantidad}
                                        className='selectCarrito'
                                        onChange={ e => actualizarCantidadSelect({
                                            cantidad : Number(e.target.value),
                                            id : dataProducto.id
                                        })}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <p className="precio">$ <span>{dataProducto.precio}</span></p>
                                    <p className="subtotal">Subtotal: $ <span>{dataProducto.cantidad * dataProducto.precio}</span></p>
                                    <button
                                        type="button"
                                        className='btn_eliminar'
                                        onClick={() => eliminarGuitarra(dataProducto.id)}
                                    >X</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <aside className="resumen">
                    <marquee behavior="" direction="">20% de Descuento + Envío Gratis en Compras Mayores a 1000 USD</marquee>
                    <h4>Resumen del Pedido</h4>
                    <p>Total a Pagar: {total}</p>
                </aside>
            </div>
        </main>
        )}
    </ClientOnly>
  )
}

export default Carrito