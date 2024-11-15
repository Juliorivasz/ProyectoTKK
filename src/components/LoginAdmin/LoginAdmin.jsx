import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useUser } from "../../context/UserContext";

// Lista de usuarios administradores simulada
const adminUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    thumbnail: "https://via.placeholder.com/50",
    role: "admin",
    isAdmin: true,
  },
];

export default function LoginAdmin() {
  const { user, login, logout } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí es donde deberás colocar el endpoint del administrador
    // Por ahora, usaremos la lista simulada
    const foundUser = adminUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      login(foundUser); // Almacena el usuario en el contexto
      setError("");
      navigate("/auth/admin"); // Redirige al usuario a la página de administración
    } else {
      setError("Invalid admin credentials.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (user && user.isAdmin) {
    return (
      <Layout>
        <div className="w-full h-screen justify-center items-center flex">
          <div className="w-full max-w-xs text-center">
            <img src={user.thumbnail} alt="Admin Thumbnail" className="rounded-full w-16 h-16 mb-4 mx-auto"/>
            <h2 className="text-lg font-bold">
              Welcome, Admin {user.email}
            </h2>
            <p>Administrator Dashboard</p>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
              Logout
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
      <div className="w-full h-screen justify-center items-center flex bg-cyan-50">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Admin Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Admin Password
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
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Admin Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}