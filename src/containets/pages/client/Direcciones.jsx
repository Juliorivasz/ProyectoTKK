import { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import Layout from "../../../components/layouts/Layout";
import { useNavigate } from "react-router-dom";

const Direcciones = () => {
  const navigate = useNavigate();
  const [direcciones, setDirecciones] = useState([]);
  const [newDireccion, setNewDireccion] = useState({
    codigoPostal: "",
    calle: "",
    numero: "",
    piso: "",
    departamento: "",
    referenciasAdicionales: "",
  });
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const email = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/cliente/obtenerDirecciones",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las direcciones");
        }

        const data = await response.json();
        setDirecciones(data.direcciones || []);
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };

    fetchDirecciones();
  }, [email]);

  const handleDelete = async (id_direccion) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            "http://localhost:8080/cliente/eliminarDireccion",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, id_direccion }),
            }
          );

          if (!response.ok) {
            throw new Error("Error al eliminar la dirección");
          }

          const result = await response.text();
          Swal.fire("Dirección Eliminada", result, "success");
          setDirecciones(
            direcciones.filter((dir) => dir.id_direccion !== id_direccion)
          );
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la dirección", "error");
          console.error("Error al eliminar dirección:", error);
        }
      }
    });
  };

  const handleAdd = async () => {
    if (direcciones.length >= 3) {
      Swal.fire(
        "Límite alcanzado",
        "No puedes agregar más de 3 direcciones",
        "warning"
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/cliente/guardarDireccion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newDireccion, email }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar la dirección");
      }

      const result = await response.text();
      Swal.fire("Dirección Guardada", result, "success");
      setDirecciones([
        ...direcciones,
        { ...newDireccion, id_direccion: Date.now() },
      ]);
      setNewDireccion({
        codigoPostal: "",
        calle: "",
        numero: "",
        piso: "",
        departamento: "",
        referenciasAdicionales: "",
      });
      setIsAddFormOpen(false); // Close the form after saving
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar la dirección", "error");
      console.error("Error al guardar dirección:", error);
    }
  };

  return (
    <Layout>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Regresar al Inicio
      </button>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg min-h-[50vh] mt-24 mb-24">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Gestionar Direcciones
        </h1>

        <div className="space-y-4">
          {/* Mostrar cada dirección con el botón de eliminar al lado */}
          {direcciones.map((direccion) => (
            <div
              key={direccion.id_direccion}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  <strong>Calle:</strong> {direccion.calle}, {direccion.numero}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Piso:</strong> {direccion.piso},{" "}
                  <strong>Depto:</strong> {direccion.departamento}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>CP:</strong> {direccion.codigoPostal}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Referencias:</strong>{" "}
                  {direccion.referenciasAdicionales || "N/A"}
                </p>
              </div>

              {/* Botón de eliminar junto a los detalles de la dirección */}
              <button
                onClick={() => handleDelete(direccion.id_direccion)}
                className="text-red-600 hover:text-red-800 flex items-center space-x-2 ml-4"
              >
                <FaTrash />
                <span>Eliminar</span>
              </button>
            </div>
          ))}
        </div>

        {/* Mensaje estático cuando se alcanza el límite de direcciones */}
        {direcciones.length >= 3 && (
          <p className="mt-4 text-sm text-red-600">
            Has alcanzado el límite de direcciones permitidas (3).
          </p>
        )}

        {/* Botón para agregar una nueva dirección */}
        <div className="mt-6">
          <button
            onClick={() => setIsAddFormOpen(!isAddFormOpen)}
            className="w-full flex justify-center items-center space-x-2 bg-green-600 text-white p-2 rounded hover:bg-green-700"
            disabled={direcciones.length >= 3} // Deshabilitar botón si ya se tienen 3 direcciones
          >
            <FaPlus />
            <span>
              {isAddFormOpen ? "Cancelar" : "Agregar Nueva Dirección"}
            </span>
          </button>

          {isAddFormOpen && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Calle"
                  value={newDireccion.calle}
                  onChange={(e) =>
                    setNewDireccion({ ...newDireccion, calle: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Número"
                  value={newDireccion.numero}
                  onChange={(e) =>
                    setNewDireccion({ ...newDireccion, numero: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Piso"
                  value={newDireccion.piso}
                  onChange={(e) =>
                    setNewDireccion({ ...newDireccion, piso: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Departamento"
                  value={newDireccion.departamento}
                  onChange={(e) =>
                    setNewDireccion({
                      ...newDireccion,
                      departamento: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Código Postal"
                  value={newDireccion.codigoPostal}
                  onChange={(e) =>
                    setNewDireccion({
                      ...newDireccion,
                      codigoPostal: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Referencias Adicionales"
                  value={newDireccion.referenciasAdicionales}
                  onChange={(e) =>
                    setNewDireccion({
                      ...newDireccion,
                      referenciasAdicionales: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Guardar Dirección
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Direcciones;
