/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { SiBinance } from "react-icons/si";
import { calculateTotalCrypto } from "../../../libs/actions/cart/payment";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCart } from "../../../context/CartContext";  // Importa el hook del contexto
import { useNavigate } from "react-router-dom";

const BinancePayment = () => {
  const { cart, clearCart } = useCart();  // Obtén el carrito y la función clearCart
  const [totalPesos, setTotalPesos] = useState(0);
  const [totalBTC, setTotalBTC] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletError, setWalletError] = useState(false);
  const navigate = useNavigate();  // Hook de navegación para redirigir

  // Función para obtener el correo del usuario desde localStorage
  const getUserEmail = () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    return userData.email || "Correo no disponible";
  };

  // Función para obtener el total del carrito en pesos desde localStorage
  const getCartTotalInPesos = () => {
    return cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  };

  // Función para obtener los detalles del carrito
  const getCartDetails = () => {
    return cart.map((item) => ({
      nombreProducto: item.nombreProducto,
      cantidadProducto: item.quantity,
    }));
  };

  // Efecto para calcular total en pesos y convertirlo a BTC
  useEffect(() => {
    const fetchConversion = async () => {
      const totalInPesos = getCartTotalInPesos();
      setTotalPesos(totalInPesos);

      try {
        const conversion = await calculateTotalCrypto(totalInPesos);
        setTotalBTC(conversion.totalCrypto);
      } catch (error) {
        console.error("Error al calcular la conversión a BTC:", error);
      }
    };

    fetchConversion();
  }, [cart]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!walletAddress || walletAddress.trim() === "") {
      setWalletError(true);
      return;
    }

    setWalletError(false);

    if (totalBTC) {
      const confirmResult = await Swal.fire({
        title: "Confirmación de Pago",
        text: `¿Confirmas el pago de ${totalBTC.toFixed(
          6
        )} BTC a la dirección ${walletAddress}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FFB703",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
      });

      if (confirmResult.isConfirmed) {
        try {
          // Datos a enviar al backend
          const orderData = {
            mail: getUserEmail(),
            estado: "EN_PREPARACION",
            detalles: getCartDetails(),
          };

          // Petición al backend
          const response = await fetch("http://localhost:8080/pedido/nuevo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          const responseText = await response.text();

          if (response.ok) {
            Swal.fire({
              title: "Pago Procesado",
              text: `Pedido creado con éxito: ${responseText}`,
              icon: "success",
              confirmButtonColor: "#FFB703",
            });

            // Limpiar carrito tanto del contexto como del localStorage
            clearCart();  // Limpiar el carrito del contexto
            localStorage.removeItem("cart");  // Eliminar del localStorage

            // Redirigir al usuario a la URL "/auth/eureka"
            navigate("/auth/eureka");
          } else {
            throw new Error(responseText);
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `Error al crear el pedido: ${error.message}`,
            icon: "error",
            confirmButtonColor: "#FF5733",
          });
        }
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener el precio de BTC. Intente nuevamente.",
        icon: "error",
        confirmButtonColor: "#FF5733",
      });
    }
  };

  return (
    <div className="min-h-[70vh] bg-gray-900 flex items-center justify-center">
      <Box
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-xl max-w-md mx-auto text-white"
        sx={{ transition: "all 0.3s ease-in-out", ":hover": { boxShadow: 12 } }}
      >
        <Box className="flex items-center justify-between mb-6">
          <Typography variant="h5" className="font-semibold">
            Pago con Binance
          </Typography>
          <SiBinance className="text-yellow-400 text-4xl animate-pulse" />
        </Box>
        <Box className="space-y-6">
          <Box className="bg-gray-700 p-4 rounded-lg shadow-md">
            <Typography variant="h6" className="text-gray-300">
              Total en Pesos (ARS):
              <span className="font-bold text-yellow-400 ml-2">
                ${totalPesos}
              </span>
            </Typography>
          </Box>
          <Box className="bg-gray-700 p-4 rounded-lg shadow-md">
            <Typography variant="h6" className="text-gray-300">
              Equivalente en BTC:
              <span className="font-bold text-yellow-400 ml-2">
                {totalBTC ? totalBTC.toFixed(6) : "Cargando..."} BTC
              </span>
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Dirección de Wallet"
            variant="outlined"
            placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            error={walletError}
            helperText={
              walletError && "Por favor, introduce una dirección de wallet válida."
            }
            sx={{
              backgroundColor: "#FFF",
              input: { color: "#000" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: walletError ? "#FF5733" : "#DDD",
                },
                "&:hover fieldset": {
                  borderColor: "#FBBF24",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handlePayment}
            className="w-full font-bold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
            sx={{
              backgroundColor: "#FBBF24",
              color: "#000",
              ":hover": {
                backgroundColor: "#F59E0B",
              },
            }}
          >
            Confirmar Pago
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default BinancePayment;
