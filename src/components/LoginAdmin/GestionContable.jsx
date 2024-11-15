import { useState } from "react";

export default function GestionContable() {
  const [activeTab, setActiveTab] = useState("diario");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Datos simulados para las tablas
  const libroDiario = [
    { fecha: "2024-11-01", cuenta: "101", debe: "500", haber: "0" },
    { fecha: "2024-11-02", cuenta: "202", debe: "0", haber: "200" },
    { fecha: "2024-11-03", cuenta: "301", debe: "300", haber: "0" },
  ];

  const libroMayor = [
    { fecha: "2024-11-01", cuenta: "101", debe: "500", haber: "0", saldo: "500" },
    { fecha: "2024-11-02", cuenta: "202", debe: "0", haber: "200", saldo: "300" },
    { fecha: "2024-11-03", cuenta: "301", debe: "300", haber: "0", saldo: "600" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Botones de navegación ocupando el ancho completo */}
      <div className="flex w-full bg-white shadow-md">
        <button
          onClick={() => handleTabChange("diario")}
          className={`w-1/2 py-4 font-semibold text-center ${
            activeTab === "diario" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          Libro Diario
        </button>
        <button
          onClick={() => handleTabChange("mayor")}
          className={`w-1/2 py-4 font-semibold text-center ${
            activeTab === "mayor" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          Libro Mayor
        </button>
      </div>

      {/* Contenedor para la lista que se llenará con datos */}
      <div className="flex-grow p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === "diario" && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left border-b border-black">Fecha</th>
                    <th className="py-2 px-4 text-left border-b border-black">Nombre de Cuenta</th>
                    <th className="py-2 px-4 text-left border-b border-black">Debe</th>
                    <th className="py-2 px-4 text-left border-b border-black">Haber</th>
                  </tr>
                </thead>
                <tbody>
                  {libroDiario.map((entrada, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 border-b border-black">{entrada.fecha}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.cuenta}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.debe}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.haber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "mayor" && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left border-b border-black">Fecha</th>
                    <th className="py-2 px-4 text-left border-b border-black">Nombre de Cuenta</th>
                    <th className="py-2 px-4 text-left border-b border-black">Debe</th>
                    <th className="py-2 px-4 text-left border-b border-black">Haber</th>
                    <th className="py-2 px-4 text-left border-b border-black">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {libroMayor.map((entrada, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 border-b border-black">{entrada.fecha}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.cuenta}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.debe}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.haber}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.saldo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
