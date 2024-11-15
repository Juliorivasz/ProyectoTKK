import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { useUser } from "../../context/UserContext";

// Lista de usuarios simulada
const users = [
  {
    email: "admin@example.com",
    password: "admin123",
    thumbnail: "https://via.placeholder.com/50",
    role: "admin",
    isAdmin: true,
  },
  {
    email: "user@example.com",
    password: "user123",
    thumbnail: "https://via.placeholder.com/50",
    role: "client",
    isAdmin: false,
  },
];

export default function Login() {
  const { user, login, logout } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      login(foundUser); // Almacena el usuario en el contexto
      setError("");
      navigate("/"); // Redirige al usuario a la página principal
    } else {
      setError("Invalid email or password.");
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
                Welcome, {user.email} ({user.role})
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
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
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <Link
                  to="/auth/loginadmin"
                  className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-blue-800"
                >
                  Admin Login
                </Link>
              </div>
            </form>
          )}
          <p className="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
        </div>
      </div>
    </Layout>
  );
}