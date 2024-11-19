/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function LibroDiario({ filters }) {
  const [libroDiario, setLibroDiario] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para cargar datos del libro diario
  const fetchLibroDiario = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:8080/administrador/libroDiario`,
        { method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({fecha: filters.fechaExacta})
         }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      console.log(data)
      setLibroDiario(data.registros || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibroDiario();
  }, [filters]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {loading ? (
        <p className="text-center text-gray-600">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : libroDiario.length === 0 ? (
        <p className="text-center text-gray-600">No hay registros en el Libro Diario.</p>
      ) : (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left border-b border-black">Asiento Contable</th>
                <th className="py-2 px-4 text-left border-b border-black">Fecha</th>
                <th className="py-2 px-4 text-left border-b border-black">Descripción</th>
                <th className="py-2 px-4 text-left border-b border-black">Nombre de Cuenta</th>
                <th className="py-2 px-4 text-left border-b border-black">Debe</th>
                <th className="py-2 px-4 text-left border-b border-black">Haber</th>
              </tr>
            </thead>
            <tbody>
              {libroDiario.map((entrada, index) => (
                <tr key={index} className={entrada.id_asiento_contable ? "bg-blue-50" : "bg-white"}>
                  <td className="py-2 px-4 border-b border-black">{entrada.id_asiento_contable}</td>
                  <td className="py-2 px-4 border-b border-black">{entrada.fecha}</td>
                  <td className="py-2 px-4 border-b border-black">{entrada.descripcion}</td>
                  <td className="py-2 px-4 border-b border-black">{entrada.nombre_cuenta}</td>
                  <td className="py-2 px-4 border-b border-black">{entrada.debe}</td>
                  <td className="py-2 px-4 border-b border-black">{entrada.haber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
