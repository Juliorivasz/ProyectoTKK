import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { useUser } from "../../context/UserContext";
import { handleLogin } from "../../libs/actions/client"; // Importamos el método handleLogin

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

  return (
    <Layout>
      <div className="w-full h-screen justify-center items-center flex">
        <div className="w-full max-w-xs">
          {user ? (
            <div className="text-center">
              <img src={user.thumbnail} alt="User Thumbnail" className="rounded-full w-16 h-16 mb-4 mx-auto"/>
              <h2 className="text-lg font-bold">
                Welcome, {user.mail} ({user.role})
              </h2>
              <p>{user.isAdmin ? "Administrator" : "Client"}</p>
              <button onClick={logout} className="text-red-500 mt-4">
                Logout
              </button>
            </div>
          ) : (
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={mail}
                  onChange={(e) => setmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleLoginSubmit} // Llamamos a la nueva función de login
                >
                  Entrar
                </button>
              </div>
            </form>
          )}
          <p className="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
        </div>
      </div>
    </Layout>
  );
}
