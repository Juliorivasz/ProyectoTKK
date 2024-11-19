/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../../context/CartContext"; // Importa el contexto del carrito
import { useUser } from "../../context/UserContext";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Usa el hook del contexto del carrito
  const { user } = useUser(); // Verifica si el usuario está autenticado

  const handleAddToCart = () => {
    if (user?.role !== "client") {
      Swal.fire({
        icon: "warning",
        title: "¡Debes iniciar sesión!",
        text: "Por favor, inicia sesión para agregar productos al carrito.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (quantity < 1) {
      Swal.fire({
        icon: "error",
        title: "Cantidad inválida",
        text: "La cantidad debe ser al menos 1.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    addToCart(product, quantity);

    Swal.fire({
      icon: "success",
      title: "¡Producto agregado al carrito!",
      text: `${product.nombreProducto} ha sido añadido a tu carrito.`,
      confirmButtonText: "Aceptar",
    });

    setQuantity(1);
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
      <div className="relative">
        <img
          className="h-56 w-full object-contain rounded-t-2xl"
          src={product.imagen}
          alt={product.nombreProducto}
        />
      </div>

      <div className="p-4 flex flex-col justify-between">
        <h1 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-500 transition duration-200">
          {product.nombreProducto}
        </h1>
        <p className="text-sm text-gray-600 mb-4">{product.descripcion}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-green-500">
            ${product.precio}
          </h3>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-2 border border-gray-300 rounded-lg"
            />
            <button
              className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="mr-2" /> Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
