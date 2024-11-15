import { Link } from "react-router-dom";
import tkk from "/images/TKK.svg";

export default function NavbarAdmin({ handleLogout, userEmail }) {
    return (
        <nav className="bg-nav py-2.5 px-5 flex w-full fixed items-center gap-x-4 justify-between">
            <div className="flex gap-x-4 items-center">
                <img src={tkk} alt="logo" className="w-20 h-auto" />
            </div>

            {/* Navegacion */}
            <div className="text-white flex gap-x-6">
                <Link to="BannerAdmin" className="hover:text-gray-300">Inicio</Link>
                <Link to="gestioncontable" className="hover:text-gray-300">Gestión Contable</Link>
                <Link to="inventario" className="hover:text-gray-300">Inventario</Link>
            </div>

            {/* User info and logout button */}
            <div className="flex items-center gap-x-4">
                <span className="text-white">{userEmail}</span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>
    )
}