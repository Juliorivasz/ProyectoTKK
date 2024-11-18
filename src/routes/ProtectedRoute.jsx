/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Swal from "sweetalert2";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "¡Acceso denegado!",
      text: "Debes iniciar sesión para acceder a esta página.",
      confirmButtonText: "Aceptar",
    });
    return <Navigate to="/auth/login" />;
  }

  return children;
}


