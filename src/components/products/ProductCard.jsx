/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado
import { FaShoppingCart } from 'react-icons/fa'; // Importa el ícono del carrito
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0); // Estado para manejar la cantidad seleccionada

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    // Obtener el carrito actual desde localStorage o crear uno vacío si no existe
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya existe en el carrito
    const productExists = cart.some(item => item.id === product.id);

    if (productExists) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      const updatedCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad seleccionada
      cart.push({ ...product, quantity });

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Mostrar alerta de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado al carrito!',
      text: `${product.nombreProducto} ha sido añadido a tu carrito.`,
      confirmButtonText: 'Aceptar',
    });
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
          <h3 className="text-lg font-bold text-green-500">${product.precio}</h3>

          {/* Selector de cantidad */}
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





