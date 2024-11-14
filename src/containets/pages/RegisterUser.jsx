import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Layout from "../../components/layouts/Layout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { handleRegisterClient } from "../../libs/actions/client"; // Importa tu función de API
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
  const { login } = useUser(); // Método login del contexto
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();  // Evita que el formulario se recargue
    setError("");  // Resetea el error antes de hacer la llamada API
  
    // Validación básica
    if (!nombre || !apellido || !email || !telefono || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const newUser = await handleRegisterClient(nombre, apellido, email, telefono, password);

      if(!newUser) {
        throw new Error("Fallo el registro");
      }
  
      // Si el registro es exitoso, logueamos al usuario y lo redirigimos al home
      login(newUser);  // Asegúrate de que newUser contiene los datos correctos
      localStorage.setItem("user", JSON.stringify(newUser));  // Guarda al usuario en localStorage
      navigate("/");
    } catch (error) {
      // Si ocurre un error, manejamos el mensaje de error
      setError(
        error.message === "Email ya registrado"
          ? "El email ya está registrado. Intenta con otro."
          : "Error en el registro. Inténtalo de nuevo."
      );
      console.error(error);
  
      // Si el registro falla, eliminamos el usuario de localStorage
      localStorage.setItem("user", JSON.stringify(null));  // Guarda null en lugar de undefined
      login(null);  // Asegura que el usuario no quede registrado
    }
  };
  

  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-xs">
          <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Campos para nombre, apellido, email, telefono, contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                Teléfono
              </label>
              <input
                id="telefono"
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                className="absolute top-[57%] right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                className="absolute top-[57%] right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>
            <p className="text-red-500 text-xs italic">{error}</p>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};






