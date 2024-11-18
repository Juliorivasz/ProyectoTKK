/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import mercadoPagoLogo from "../../../assets/images/mercadoPagoLogo.svg";
import binanceLogo from "../../../assets/images/binanceLogo.svg";
import Swal from "sweetalert2";
import useAddress from "./hooks/useAddress";

export const AddressPayment = ({
  userId,
  onAddressSelected,
  onPaymentMethodSelected,
}) => {
  const { addresses, loading, error, fetchAddresses, addNewAddress } =
    useAddress(userId);
  const [newAddress, setNewAddress] = useState({
    email: userId,
    codigoPostal: "",
    calle: "",
    numero: "",
    piso: "",
    departamento: "",
    referenciasAdicionales: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showAddAddressForm, setShowAddAddressForm] = useState(false); // Nuevo estado para controlar la visibilidad del formulario

  // Cargar método de pago y dirección seleccionada al cargar el componente
  useEffect(() => {
    // Reiniciar el localStorage del método de pago seleccionado
    localStorage.removeItem("paymentMethod");
    setSelectedPaymentMethod("");
    const storedAddress = localStorage.getItem("selectedAddress");
    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }
  }, []);

  // Guardar método de pago y dirección seleccionada en localStorage
  useEffect(() => {
    localStorage.setItem("paymentMethod", selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  // Obtener direcciones al montar el componente
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const handleInputChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const validateAddress = () => {
    for (const [key, value] of Object.entries(newAddress)) {
      if (
        !value.trim() &&
        key !== "piso" &&
        key !== "departamento" &&
        key !== "referenciasAdicionales"
      ) {
        return false;
      }
    }
    return true;
  };

  const handleAddAddress = async () => {
    if (!validateAddress()) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
        confirmButtonColor: "#FFA500",
      });
      return;
    }

    try {
      await addNewAddress(newAddress);
      Swal.fire({
        icon: "success",
        title: "Dirección agregada",
        text: "La dirección se ha agregado correctamente.",
        confirmButtonColor: "#FFA500",
      });
      setNewAddress({
        email: userId,
        codigoPostal: "",
        calle: "",
        numero: "",
        piso: "",
        departamento: "",
        referenciasAdicionales: "",
      });
      setShowAddAddressForm(false); // Ocultar el formulario después de agregar la dirección
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar",
        text: "Ocurrió un error al agregar la dirección. Inténtalo nuevamente.",
        confirmButtonColor: "#FFA500",
      });
      console.error("Error al agregar la dirección:", err);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    onPaymentMethodSelected(method);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    onAddressSelected(address);
  };

  return (
    <Box sx={{ width: "100%", padding: "1rem" }}>
      {/* Sección de direcciones */}
      <Typography variant="h5">Selecciona o Agrega una Dirección</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Elige una dirección de la lista o añade una nueva.
      </Typography>

      <Box sx={{ overflowY: "scroll", maxHeight: "220px", mb: 2 }}>
        {loading ? (
          <Typography variant="body1">Cargando direcciones...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            Error: {error}
          </Typography>
        ) : addresses.length === 0 ? (
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ color: "#666" }}>
              No hay direcciones registradas.
            </Typography>
          </Box>
        ) : (
          addresses.map((address, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
                backgroundColor:
                  selectedAddress === address ? "#e0f7fa" : "white",
                padding: "1rem",
                borderRadius: ".5rem",
                border:
                  selectedAddress === address ? "2px solid #00acc1" : "none",
              }}
            >
              <Typography>{`${address.calle} ${address.numero}, ${address.codigoPostal}`}</Typography>
              <Checkbox
                checked={selectedAddress === address}
                onChange={() => handleSelectAddress(address)}
                sx={{ "&.Mui-checked": { color: "#FFA500" } }}
              />
            </Box>
          ))
        )}
      </Box>

      {/* Botón para mostrar el formulario de nueva dirección */}
      <Button
        variant="contained"
        onClick={() => setShowAddAddressForm(!showAddAddressForm)}
        sx={{ mt: 2, backgroundColor: "#FFA500", color: "white" }}
      >
        {showAddAddressForm ? "Ocultar formulario" : "Agregar Nueva Dirección"}
      </Button>

      {/* Formulario de nueva dirección */}
      {showAddAddressForm && (
        <Box sx={{ mt: 2 }}>
          {[ "codigoPostal", "calle", "numero", "piso", "departamento", "referenciasAdicionales"].map((field) => (
            <TextField
              key={field}
              label={field}
              variant="outlined"
              fullWidth
              value={newAddress[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              sx={{ mt: 2, backgroundColor: "#fff" }}
            />
          ))}
          <Button
            variant="contained"
            onClick={handleAddAddress}
            sx={{ mt: 2, backgroundColor: "#FFA500", color: "white" }}
          >
            Agregar Dirección
          </Button>
        </Box>
      )}

      {/* Sección de método de pago */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Selecciona un Método de Pago
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Puedes elegir entre Mercado Pago o Binance.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            backgroundColor:
              selectedPaymentMethod === "MercadoPago" ? "#e0f7fa" : "white",
            borderRadius: "4px",
            mb: 1,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedPaymentMethod === "MercadoPago"}
                onChange={() => handlePaymentMethodChange("MercadoPago")}
                sx={{ "&.Mui-checked": { color: "#FFA500" } }}
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={mercadoPagoLogo}
                  alt="Mercado Pago"
                  style={{ width: "50px", marginRight: "8px" }}
                />
                Mercado Pago
              </Box>
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            backgroundColor:
              selectedPaymentMethod === "Binance" ? "#e0f7fa" : "white",
            borderRadius: "4px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedPaymentMethod === "Binance"}
                onChange={() => handlePaymentMethodChange("Binance")}
                sx={{ "&.Mui-checked": { color: "#FFA500" } }}
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={binanceLogo}
                  alt="Binance"
                  style={{ width: "50px", marginRight: "8px" }}
                />
                Binance
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
