import { useState } from "react";
import ModificarCosto from "../../containets/pages/dashboard/contable/ModificarCosto";
import RecargarStock from "../../containets/pages/dashboard/contable/RecargarStock";

const Inventario = () => {
  const [view, setView] = useState("menu");

  const handleNavigate = (target) => setView(target);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen">
      {/* Fondo con diseño unificado */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/path-to-your-background.jpg')`, // Cambia por la ruta correcta
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)",
          opacity: 0.5,
          zIndex: -1,
        }}
      ></div>

      {view === "menu" && (
        <div className="relative bg-blue-100 bg-opacity-90 shadow-lg rounded-lg p-6 w-96 text-center z-10">
          <h1 className="text-2xl font-bold mb-4">Inventario</h1>
          <p className="mb-6">¿Qué deseas hacer?</p>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mb-4 w-full hover:bg-green-600"
            onClick={() => handleNavigate("modificarCosto")}
          >
            Modificar Precio
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            onClick={() => handleNavigate("recargarStock")}
          >
            Actualizar Stock
          </button>
        </div>
      )}

      {view === "modificarCosto" && (
        <ModificarCosto onNavigate={handleNavigate} />
      )}

      {view === "recargarStock" && (
        <RecargarStock onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default Inventario;

  