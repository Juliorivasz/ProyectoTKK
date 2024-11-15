/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto de usuario
const UserContext = createContext(null);

// Crear un proveedor para el contexto de usuario
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedTimestamp = localStorage.getItem("timestamp");

    if (!storedUser) {
      setUser(null); // Asegúrate de que el valor sea null si no hay usuario
    }

    if (storedUser && storedTimestamp) {
      const now = new Date().getTime();
      const timeElapsed = now - storedTimestamp;

      // Si han pasado más de 24 horas, elimina el usuario
      if (timeElapsed > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("user");
        localStorage.removeItem("timestamp");
      } else {
        setUser(storedUser); // Si el tiempo es válido, restaura el usuario
      }
    }
  }, []);

  const login = (userData) => {
    if (userData) {
      console.log(userData)
      setUser(userData); // Almacena el usuario al hacer login
      localStorage.setItem("user", JSON.stringify(userData)); // Guarda en localStorage
      localStorage.setItem("timestamp", new Date().getTime()); // Guarda el timestamp
    } else {
      console.error("Error: userData es undefined o null");
    }
  };
  

  const logout = () => {
    setUser(null); // Borra el usuario al hacer logout
    localStorage.removeItem("user");
    localStorage.removeItem("timestamp");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto de usuario
export const useUser = () => useContext(UserContext);
