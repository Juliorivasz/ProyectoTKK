import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [editingField, setEditingField] = useState("");
  const [nuevoTelefono, setNuevoTelefono] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const defaultImage = "https://via.placeholder.com/150?text=No+Image";

  // Obtener email del localStorage
  const emailUsuario = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/cliente/obtenerDatos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailUsuario }),
        });
        const data = await response.json();
        setPerfil(data);
        setNuevoTelefono(data.telefono || "");
        setNuevaImagen(data.imagen || "");
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        Swal.fire("Error", "No se pudo cargar el perfil.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    obtenerPerfil();
  }, [emailUsuario]);

  const guardarPerfil = async () => {
    try {
      const response = await fetch("http://localhost:8080/cliente/editarPerfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailUsuario,
          telefono: nuevoTelefono,
          imagen: nuevaImagen,
          password,
        }),
      });

      const message = await response.text();
      Swal.fire("Éxito", message, "success");
      setEditingField(""); // Cierra el modo de edición
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      Swal.fire("Error", "Ocurrió un error al guardar los cambios.", "error");
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleCancel = () => {
    setEditingField("");
  };

  return (
    <Layout>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
        >
          Regresar al Inicio
        </button>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 -mt-24 -mb-24">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Perfil</h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loader" />
          </div>
        ) : perfil ? (
          <div className="space-y-6">
            {/* Imagen de perfil */}
            <div className="flex flex-col items-center">
              <img
                src={perfil.imagen || defaultImage}
                alt="Perfil"
                className="w-32 h-32 rounded-full object-cover object-top border-4 border-indigo-500"
              />
              <button
                className="mt-2 text-gray-600 hover:text-indigo-600"
                onClick={() => handleEdit("imagen")}
              >
                <FaPencilAlt />
              </button>
            </div>
            {editingField === "imagen" && (
              <div>
                <input
                  type="text"
                  value={nuevaImagen}
                  onChange={(e) => setNuevaImagen(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="URL de la imagen"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={guardarPerfil}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Nombre y apellido */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{perfil.nombre} {perfil.apellido}</h2>
              <p className="text-gray-600">{perfil.email}</p>
            </div>

            {/* Teléfono */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Teléfono:</span>
              <span className="text-gray-800">{perfil.telefono}</span>
              <button
                className="ml-2 text-gray-600 hover:text-indigo-600"
                onClick={() => handleEdit("telefono")}
              >
                <FaPencilAlt />
              </button>
            </div>
            {editingField === "telefono" && (
              <div>
                <input
                  type="text"
                  value={nuevoTelefono}
                  onChange={(e) => setNuevoTelefono(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Nuevo teléfono"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={guardarPerfil}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Contraseña */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Contraseña:</span>
              <span className="text-gray-800">******</span>
              <button
                className="ml-2 text-gray-600 hover:text-indigo-600"
                onClick={() => handleEdit("password")}
              >
                <FaPencilAlt />
              </button>
            </div>
            {editingField === "password" && (
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Nueva contraseña"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={guardarPerfil}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">No se pudo cargar el perfil.</p>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default Perfil;
