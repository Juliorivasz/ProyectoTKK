import { useCart } from "../../../context/CartContext";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto m-12 min-h-[50vh]">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-600">
        Carrito de Compras
      </h2>
      {cart.length === 0 ? (
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500">Agrega productos para empezar a comprar.</p>
        </div>
      ) : (
        <div>
          <div className="overflow-y-scroll max-h-[450px] space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
              >
                {/* Imagen del producto */}
                <img
                  src={item.imagen}
                  alt={item.nombreProducto}
                  className="w-28 h-28 object-cover rounded-lg mr-6 border-2 border-indigo-300"
                />
                {/* Detalles del producto */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.nombreProducto}
                  </h3>
                  <p className="text-gray-500 mb-2">{item.descripcion}</p>
                  <p className="text-indigo-600 font-bold mb-1">
                    Precio: ${item.precio}
                  </p>
                  <p className="text-gray-800">Cantidad: {item.quantity}</p>
                </div>
                {/* Controles */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.nombreProducto, -1)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 shadow"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQuantity(item.nombreProducto, 1)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 shadow"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.nombreProducto)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Total */}
          <div className="mt-6 text-right">
            <h3 className="text-3xl font-bold text-gray-800">
              Total: $
              {cart.reduce(
                (total, item) => total + item.precio * item.quantity,
                0
              )}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};





