import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importamos SweetAlert2

// Importamos el contexto de usuario
import { useUser } from "../../context/UserContext";

export default function LoginAdmin() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Función para manejar el login con el backend
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/cliente/inicioDeSesionAdministrador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostrar alerta de error si las credenciales son incorrectas
        throw new Error(data.message || "Credenciales inválidas");
      }

      // Suponiendo que la respuesta tiene un mensaje de éxito
      login({ email, role: "admin" }); // Almacena el usuario en el contexto
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Has iniciado sesión como administrador.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/auth/admin/"); // Redirige a la página de administración
      });
    } catch (err) {
      // Mostrar alerta de error si ocurre algún problema
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  // Función para regresar al login
  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Administrador</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="**********"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={handleBackToLogin}
            className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Regresar al Login
          </button>
        </form>
      </div>
    </div>
  );
}
