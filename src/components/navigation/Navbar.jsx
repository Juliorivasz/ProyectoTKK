import { Link } from "react-router-dom";
import tkk from "/images/TKK.svg";
import AuthButton from "../../components/navigation/AuthButton";

export default function Navbar() {
  return (
    <nav className="bg-nav py-2.5 px-5 flex w-full fixed items-center gap-x-4 justify-between z-10">
    <div className="flex gap-x-4 items-center">
    <img src={tkk} alt="logo"
    className="w-20 h-auto"
    />

      {/* Envio a Direccion */}
      <div>
    <h1 className="text-white">
      Envio a
    </h1>
    <h1 className="text-white">
      Godoy Cruz
    </h1>
      </div>
    </div>

      {/* Navegacion */}
      <div className="text-white flex gap-x-6">
      <Link>Inicio</Link>
      <Link>Promociones</Link>
      <Link>Pedidos</Link>
      </div>

      {/* Avatar User */}
      <AuthButton/>
  </nav>
  )
}
