import { Link } from "react-router-dom";
import tkk from "/images/TKK.svg";
import { FaShoppingCart } from "react-icons/fa";
import AuthButton from "../../components/navigation/AuthButton";
import { useUser } from "../../context/UserContext"; // Suponiendo que tienes un contexto de usuario

export default function Navbar() {
  const { user } = useUser(); // Usamos el contexto para saber si el usuario está logueado
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Obtener productos del carrito desde localStorage

  return (
    <nav className="bg-nav py-2.5 px-5 flex w-full fixed items-center gap-x-4 justify-between z-10">
      <div className="flex gap-x-4 items-center">
        <img src={tkk} alt="logo" className="w-20 h-auto" />

        {/* Envio a Direccion */}
        <div>
          <h1 className="text-white">Envío a</h1>
          <h1 className="text-white">Godoy Cruz</h1>
        </div>
      </div>

      {/* Navegación */}
      <div className="text-white flex gap-x-6">
        <Link to="/">Inicio</Link>
        <Link to="/promociones">Promociones</Link>
        <Link to="/pedidos">Pedidos</Link>
      </div>

      {/* Carrito */}
      {user && cartItems.length > 0 && ( // Solo se muestra si el usuario está logueado y tiene productos en el carrito
        <Link to="/carrito">
          <div className="text-white flex items-center gap-x-2">
            <FaShoppingCart size={24} />
            <span className="text-sm">{cartItems.length}</span> {/* Mostrar cantidad de productos en el carrito */}
          </div>
        </Link>
      )}

      {/* Avatar User */}
      <AuthButton />
    </nav>
  );
}

