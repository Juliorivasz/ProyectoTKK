/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8080/cliente";

const useAddress = (email) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch addresses
  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/obtenerDirecciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Error al obtener las direcciones");
      }
      const data = await response.json();
      setAddresses(data.direcciones || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new address
  const addNewAddress = async (newAddress) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/guardarDireccion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      });
      if (!response.ok) {
        throw new Error("Error al guardar la dirección");
      }
      const message = await response.text(); // Assuming the response is a plain string
      setAddresses((prevAddresses) => [...prevAddresses, newAddress]); // Update local state
      return message;
    } catch (err) {
      setError(err.message);
      throw err; // Rethrow error to handle it in the component
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchAddresses();
    }
  }, [email]);

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    addNewAddress,
  };
};

export default useAddress;


