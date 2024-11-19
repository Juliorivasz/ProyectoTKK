/* eslint-disable react/prop-types */
import { useUser } from "../../context/UserContext";
import { useNavigate, Outlet } from "react-router-dom";
import NavbarAdmin from "../LoginAdmin/NavbarAdmin";

export default function LayoutAdmin({ children }) {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/loginadmin"); // Redirige a la página de inicio (login)
  };

  // Verifica si el usuario no está logueado o si no es un admin
  if (!user || user.role !== "admin") {
    navigate("/auth/loginadmin"); // Redirige al login si no está logueado o no es admin
    return null; // No renderiza el layout si no es admin
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#cde8e5]">
      <NavbarAdmin handleLogout={handleLogout} userEmail={user.email} />
      <main className="min-w-screen flex-grow pt-16">
        <div className="container mx-auto p-8">
          {children}
          <Outlet /> {/* Este es el lugar donde se renderizarán los componentes anidados */}
        </div>
      </main>
    </div>
  );
}
