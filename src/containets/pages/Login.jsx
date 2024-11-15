import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { handleLogin } from "../../libs/actions/client"; 
import fondo from "../../../src/assets/images/theKrustyKrab.jpg";
import logo from "/images/TKK.svg";

export default function Login() {
  const { user, login, logout } = useUser();
  const [mail, setmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Revisa si el usuario está almacenado en localStorage cuando el componente se monta
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      login(JSON.parse(savedUser)); // Recupera al usuario del localStorage
      navigate("/"); // Redirige al usuario si ya está logueado
    }
  }, [login, navigate]);

  // Función de login actualizada
  const handleLoginSubmit = async () => {
    try {
      // Llamamos al método handleLogin que realiza la solicitud al backend
      const data = await handleLogin(mail, password);

      if (data) {
        login(data); // Almacena los datos del usuario en el contexto
        setError("");
        navigate("/"); // Redirige al usuario a la página principal
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
    }
  };

  const goRegister = () => {
    navigate("/register");
  };

  const goAdmin = () => {
    navigate("/auth/loginadmin");
  }

  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${fondo})`, 
          filter: 'blur(10px)',
          zIndex: -1,
        }}
      ></div>
      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 text-white bg-opacity-90">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24" />
          </div>
          {user ? (
            <div className="text-center">
              <img
                src={user.thumbnail}
                alt="User Thumbnail"
                className="rounded-full w-16 h-16 mb-4 mx-auto"
              />
              <h2 className="text-lg font-bold">
                Welcome, {user.mail} ({user.role})
              </h2>
              <p>{user.isAdmin ? "Administrator" : "Client"}</p>
              <button onClick={logout} className="text-red-500 mt-4">
                Logout
              </button>
            </div>
          ) : (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={mail}
                  onChange={(e) => setmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#" className="text-blue-400 text-xs mt-2 block">
                  ¿Has olvidado tu contraseña?
                </a>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLoginSubmit}
              >
                Iniciar Sesión
              </button>
              <div className="flex items-center justify-center mt-2">
                <button className="text-blue-400 text-sm" onClick={goAdmin}>Soy Administrador</button>
              </div>
              <div className="text-center mt-4">
                <p>
                  ¿Todavía no tienes una cuenta?{" "}
                  <a href="#" onClick={goRegister} className="text-blue-400">
                    Crea una ahora
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}