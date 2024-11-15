import { useState, useEffect } from "react";

export default function GestionContable() {
  const [activeTab, setActiveTab] = useState("diario");
  const [libroDiario, setLibroDiario] = useState([]);
  const [libroMayor, setLibroMayor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Función para cargar datos según el tab activo
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      let response;
      if (activeTab === "diario") {
        response = await fetch("http://localhost:8080/administrador/libroDiario");
      } else if (activeTab === "mayor") {
        response = await fetch("http://localhost:8080/administrador/libroMayor");
      }

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();

      if (activeTab === "diario") {
        setLibroDiario(data.registros || []);
      } else if (activeTab === "mayor") {
        setLibroMayor(data.registros || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Recargar datos al cambiar de tab
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Botones de navegación */}
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

      {/* Contenedor para la lista */}
      <div className="flex-grow p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : activeTab === "diario" && libroDiario.length === 0 ? (
            <p className="text-center text-gray-600">No hay registros en el Libro Diario.</p>
          ) : activeTab === "mayor" && libroMayor.length === 0 ? (
            <p className="text-center text-gray-600">No hay registros en el Libro Mayor.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left border-b border-black">Fecha</th>
                    <th className="py-2 px-4 text-left border-b border-black">Nombre de Cuenta</th>
                    <th className="py-2 px-4 text-left border-b border-black">Debe</th>
                    <th className="py-2 px-4 text-left border-b border-black">Haber</th>
                    {activeTab === "mayor" && (
                      <th className="py-2 px-4 text-left border-b border-black">Saldo</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "diario" ? libroDiario : libroMayor).map((entrada, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 border-b border-black">{entrada.fecha}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.nombre_cuenta}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.debe}</td>
                      <td className="py-2 px-4 border-b border-black">{entrada.haber}</td>
                      {activeTab === "mayor" && (
                        <td className="py-2 px-4 border-b border-black">{entrada.saldo}</td>
                      )}
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


