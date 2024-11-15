import { useUser } from "../../context/UserContext";
import { useNavigate, Outlet } from "react-router-dom";
import NavbarAdmin from "../LoginAdmin/NavbarAdmin";

export default function LayoutAdmin({ children }) {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user || !user.isAdmin) {
    navigate("/auth/login");
    return null;
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
