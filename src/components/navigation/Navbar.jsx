/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tkk from "/images/TKK.svg";
import { FaShoppingCart } from "react-icons/fa";
import AuthButton from "../../components/navigation/AuthButton";
import { useUser } from "../../context/UserContext"; // Contexto para el usuario
import { useCart } from "../../context/CartContext"; // Importa el contexto del carrito
import Swal from "sweetalert2";

export default function Navbar() {
  const { user } = useUser(); // Contexto para el usuario
  const { totalItems } = useCart(); // Usa el estado del carrito desde el contexto

  return (
    <nav className="bg-nav py-2.5 px-5 flex w-full fixed items-center gap-x-4 justify-between z-10">
      <div className="flex gap-x-4 items-center">
        <img src={tkk} alt="logo" className="w-20 h-auto" />

        {/* Envío a Dirección */}
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
      <Link
        to={"/auth/carrito"}
      >
        <div className="relative flex items-center text-white">
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </Link>

      {/* Avatar User */}
      <AuthButton />
    </nav>
  );
}
