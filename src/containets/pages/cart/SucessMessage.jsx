import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = useNavigate();

  // Limpia el carrito del localStorage al cargar el componente
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  const handleGoBack = () => {
    navigate("/"); // Cambia '/' por la ruta de inicio o donde quieras redirigir al cliente
  };

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <Typography variant="h3" sx={{ color: "#4caf50", mb: 2 }}>
          ¡Compra exitosa! 🎉
        </Typography>
        <Typography variant="h6" sx={{ color: "#666", mb: 4 }}>
          ¡Gracias por tu compra! Nos alegra que hayas encontrado lo que buscabas.
          <br />
          ¡Prepárate para disfrutarlo!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{ backgroundColor: "#FFA500", color: "white" }}
        >
          Volver al inicio
        </Button>
      </Box>
  );
};

export default SuccessMessage;
