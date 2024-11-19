import { useState, useEffect } from "react";
import LibroDiario from "../../containets/pages/dashboard/contable/LibroDiario";
import LibroMayor from "../../containets/pages/dashboard/contable/LibroMayor";

export default function GestionContable() {
  const [activeTab, setActiveTab] = useState("diario");
  const [filters, setFilters] = useState({
    nombreCuenta: "",
    fechaExacta: "2024-11-18", // fecha predeterminada para la búsqueda exacta
    fechaInicio: "2024-11-18",
    fechaCierre: "2024-11-18",
  });

  const [cuentas, setCuentas] = useState([]);
  const [loadingCuentas, setLoadingCuentas] = useState(false);
  const [errorCuentas, setErrorCuentas] = useState("");

  // Función para cargar las cuentas disponibles
  const fetchCuentas = async () => {
    setLoadingCuentas(true);
    setErrorCuentas("");
    try {
      const response = await fetch("http://localhost:8080/administrador/obtenerCuentas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las cuentas disponibles");
      }

      const data = await response.json();
      setCuentas(data.cuentas || []);
    } catch (err) {
      setErrorCuentas(err.message);
    } finally {
      setLoadingCuentas(false);
    }
  };

  useEffect(() => {
    fetchCuentas();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Función para manejar los cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 mt-6">
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

      {/* Filtros para el Libro Mayor */}
      {activeTab === "mayor" && (
        <div className="p-4 bg-white shadow-md rounded-lg m-4">
          <div className="flex space-x-4">
            {loadingCuentas ? (
              <p className="text-gray-500">Cargando cuentas...</p>
            ) : errorCuentas ? (
              <p className="text-red-500">Error: {errorCuentas}</p>
            ) : (
              <select
                name="nombreCuenta"
                value={filters.nombreCuenta}
                onChange={handleFilterChange}
                className="border px-4 py-2 rounded-lg"
              >
                <option value="">Seleccione una cuenta</option>
                {cuentas.map((cuenta) => (
                  <option key={cuenta.id} value={cuenta.nombreCuenta}>
                    {cuenta.nombreCuenta}
                  </option>
                ))}
              </select>
            )}
            <input
              type="date"
              name="fechaInicio"
              value={filters.fechaInicio}
              onChange={handleFilterChange}
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="date"
              name="fechaCierre"
              value={filters.fechaCierre}
              onChange={handleFilterChange}
              className="border px-4 py-2 rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Filtros para el Libro Diario */}
      {activeTab === "diario" && (
        <div className="p-4 bg-white shadow-md rounded-lg m-4">
          <div className="flex space-x-4">
            <input
              type="date"
              name="fechaExacta"
              value={filters.fechaExacta}
              onChange={handleFilterChange}
              className="border px-4 py-2 rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Contenedor para la lista */}
      <div className="flex-grow p-8">
        {activeTab === "diario" && <LibroDiario filters={filters} />}
        {activeTab === "mayor" && <LibroMayor filters={filters} />}
      </div>
    </div>
  );
}
