/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto de usuario
const UserContext = createContext(null);

// Crear un proveedor para el contexto de usuario
export function UserProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedTimestamp = localStorage.getItem("timestamp");

    // Si el usuario existe en localStorage y el timestamp no ha expirado
    if (storedUser && storedTimestamp) {
      const now = new Date().getTime();
      const timeElapsed = now - storedTimestamp;

      // Si han pasado más de 24 horas, elimina el usuario y el timestamp
      if (timeElapsed > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("user");
        localStorage.removeItem("timestamp");
        setUser(null); // Borra el usuario del estado
      } else {
        setUser(storedUser); // Si no ha expirado, restaura el usuario
      }
    } else {
      setUser(null); // Si no hay usuario, asegura que el estado sea null
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  const login = (userData) => {
    if (userData) {
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
