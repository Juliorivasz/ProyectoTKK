import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { handleRegisterClient } from "../../libs/actions/client";
import { useNavigate } from "react-router-dom";
import fondo from "../../../src/assets/images/theKrustyKrab.jpg";
import logo from "/images/TKK.svg";

export const RegisterUser = () => {
  const { login } = useUser();
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
    e.preventDefault();
    setError("");

    if (
      !nombre ||
      !apellido ||
      !email ||
      !telefono ||
      !password ||
      !confirmPassword
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const newUser = await handleRegisterClient(
        nombre,
        apellido,
        email,
        telefono,
        password
      );
      if (!newUser) throw new Error("Fallo el registro");

      login(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
    } catch (error) {
      setError(
        error.message === "Email ya registrado"
          ? "El email ya está registrado. Intenta con otro."
          : "Error en el registro. Inténtalo de nuevo."
      );
      localStorage.setItem("user", JSON.stringify(null));
      login(null);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${fondo})`,
          filter: "blur(10px)",
          zIndex: -1,
        }}
      ></div>
      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 text-white bg-opacity-90">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24" />
          </div>
          <form onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Registro de Usuario
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Apellido</label>
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Teléfono</label>
              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              />
              <div
                className="absolute top-[50%] right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={30} color="black" />
                ) : (
                  <AiFillEye size={30} color="black" />
                )}
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
              />
              <div
                className="absolute top-[50%] right-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible size={30} color="black" />
                ) : (
                  <AiFillEye size={30} color="black" />
                )}
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-xs italic mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
