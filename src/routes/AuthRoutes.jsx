import { Route, Routes, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Importa el contexto de usuario
import Login from "../containets/pages/Login";
import LoginAdmin from "../components/LoginAdmin/LoginAdmin";
import LayoutAdmin from "../components/layouts/LayoutAdmin";
import GestionContable from "../components/LoginAdmin/GestionContable"; // Importa el componente de gestión contable
import Inventario from "../components/LoginAdmin/Inventario"; // Importa el componente de inventario

const AuthRoutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/loginadmin" element={<LoginAdmin />} /> {/* Ruta para login admin */}
      {/* Si el usuario es admin, muestra LayoutAdmin, de lo contrario redirige a loginadmin */}
      <Route
        path="/admin/*"
        element={user && user.isAdmin ? <LayoutAdmin /> : <Navigate to="/auth/loginadmin" />}
      >
        <Route path="gestioncontable" element={<GestionContable />} /> {/* Ruta de gestión contable */}
        <Route path="inventario" element={<Inventario />} /> {/* Ruta de inventario */}
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
