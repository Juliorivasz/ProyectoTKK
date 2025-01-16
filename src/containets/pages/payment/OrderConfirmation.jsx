/* eslint-disable react/prop-types */
import { Wallet } from "@mercadopago/sdk-react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderConfirmation = ({ products, methodPaySelect, preferenceId }) => {
  const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  const user = JSON.parse(localStorage.getItem("user")); // Obtener el usuario desde localStorage

  const total = products.reduce(
    (acc, product) => acc + product.precio * product.quantity,
    0
  );

  // Función para crear un pedido en el backend
  const handleCreateOrder = async () => {
    const orderDetails = {
      mail: user.email,
      estado: "EN_PREPARACION",
      detalles: products.map((product) => ({
        nombreProducto: product.nombreProducto,
        cantidadProducto: product.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:8080/pedido/nuevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Error al crear el pedido");
      }

      const data = await response.text();
      console.log("Pedido creado con éxito:", data);
      return data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-2xl">
        <div className="text-center text-gray-800 font-bold mb-6">
          <CheckCircleIcon
            sx={{ fontSize: 40, color: "#FF7E39", mr: 1 }}
            className="animate-bounce text-orange-600"
          />
          <h2 className="text-3xl text-orange-600">Confirmación del Pedido</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-xl text-gray-800 font-semibold mb-2">Dirección Elegida:</h3>
          {selectedAddress ? (
            <div className="text-gray-600 font-medium">
              <p>Dirección: {selectedAddress.calle}, {selectedAddress.numero}</p>
              <p>Piso: {selectedAddress.piso}, Departamento: {selectedAddress.departamento}</p>
              <p>Código Postal: {selectedAddress.codigoPostal}</p>
              <p>Referencias: {selectedAddress.referenciasAdicionales || "No hay referencias adicionales"}</p>
            </div>
          ) : (
            <p className="text-red-500">No se seleccionó una dirección.</p>
          )}
        </div>

        <div>
          <h3 className="text-xl text-gray-800 font-semibold mb-4">Productos Elegidos:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {products.map((product, index) => (
              product && product.nombreProducto && product.precio && product.quantity && (
                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg">
                  <h4 className="font-semibold text-gray-700">{product.nombreProducto}</h4>
                  <p className="text-gray-500">Cantidad: {product.quantity}</p>
                  <p className="font-bold text-orange-500">Precio Total: ${product.precio * product.quantity}</p>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="mt-4 mb-6">
          <h3 className="text-xl text-gray-800 font-semibold">Total:</h3>
          <p className="text-2xl text-orange-600">${total}</p>
        </div>

        {methodPaySelect === "MercadoPago" && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-xl text-gray-800 font-semibold">Método de Pago:</h3>
            <div
              className="flex justify-center mt-2 w-full"
              onClick={handleCreateOrder} // Evento para crear el pedido
            >
              <Wallet
                initialization={{
                  preferenceId: preferenceId,
                }}
                className="w-full max-w-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;

