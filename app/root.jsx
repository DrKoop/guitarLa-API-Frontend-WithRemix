import { useEffect } from 'react'
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    Link,
    useRouteError,
    isRouteErrorResponse
} from '@remix-run/react'
import styles from './styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'
import { useState } from 'react'


export function meta(){
    return[
        {
            charset : 'UTF-8',
            title : 'GuitarLA - Remix',
            viewport : 'width=device-width, initial-scale=1.0'
        }
    ]
}



export function links(){
    return[
        {
            rel: 'stylesheet',
            href : 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel : 'preconnect',
            href : "https://fonts.googleapis.com"
        },
        {
            rel : 'preconnect',
            href : "https://fonts.gstatic.com",
            crossOrigin : 'true'
        },
        {
            rel : 'stylesheet',
            href : "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
        },
        {
            rel : 'stylesheet',
            href : styles
        },
    ]   
}


export default function App(){

    const carritoLocalStorage = typeof window !== 'undefined' ? JSON.parse( localStorage.getItem('carrito')) ?? [] : null

    const [ carrito, setCarrito ] = useState(carritoLocalStorage)

    useEffect(() => {
        localStorage.setItem('carrito' , JSON.stringify(carrito))
    }, [carrito])
    

    const agregarAlCarrito = objetoDataGuitarra => {
        if( carrito.some( guitarraState => guitarraState.id === objetoDataGuitarra.id)){
            //Iterar + identificar el elemento duplicado
            const carritoActualizado = carrito.map( arregloGuitarra => {
                //Reescribiendo / Actualizando la Cantidad
                if(arregloGuitarra.id === objetoDataGuitarra.id){
                    arregloGuitarra.cantidad = objetoDataGuitarra.cantidad
                }
                return arregloGuitarra
            })
            setCarrito(carritoActualizado)
        }else{
            //Los id son disitintos, es entonces un articulo nuevo
            setCarrito([...carrito, objetoDataGuitarra])
        }
    }

    const actualizarCantidadSelect = guitarra => {
        const carritoActualizado = carrito.map( guitarraState => {
            if( guitarraState.id === guitarra.id ){
                guitarraState.cantidad =  guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return (
        <Document>
            <Outlet
                context={{
                    agregarAlCarrito,
                    carrito,
                    actualizarCantidadSelect,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}



function Document({children}){
    return(
        <html lang="es">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
            <Header/>
            {children}
            <Footer/>
            <Scripts/>
            <LiveReload/>
        </body>
        </html>
    )
}

//Manejo de errores con Hook de Remix


export function ErrorBoundary(){

    const error = useRouteError()

    if( isRouteErrorResponse(error)){
        return(
            <Document>
                <p className="error">{error.status} {error.statusText}</p>
                <Link to='/' className='error-enlace' >Tal ves quieras Volver a la Pagina Principal.</Link>
            </Document>
        )
    }


}