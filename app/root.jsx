import {
    Meta
} from '@remix-run/react'


export function meta(){
    return[
        {
            charset : 'UTF-8',
            title : 'GuitarLA - Remix',
            viewport : 'width=device-width, initial-scale=1.0'
        }
    ]
}


export default function App(){
    return (
        <Document>
            <h1>Hola Mundo</h1>
        </Document>
    )
}


function Document({children}){
    return(
        <html lang="es">
        <head>
            <Meta/>
        </head>
        <body>
            {children}
        </body>
        </html>
    )
}