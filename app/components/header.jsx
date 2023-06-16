import { Link } from "@remix-run/react"
import logoheader from '../../public/img/logo.svg'
import Navegacion from "./navegacion"


const Header = () => {

  return (
    <header className="header">
        <div className="contenedor barra">
            <Link to="/" >
                <img className="logo" src={logoheader} alt="Imagen Logo Header" />
            </Link>

            <Navegacion/>
        </div>
    </header>
  )
}

export default Header