import { useState } from "react";
import Swal from "sweetalert2";
import fondo from "../../../../assets/images/theKrustyKrab.jpg"; // Asegúrate de que esta ruta sea correcta

export default function ModificarCosto({ onNavigate }) {
    const [selectedItem, setSelectedItem] = useState("");
    const [newCost, setNewCost] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleItemChange = (e) => setSelectedItem(e.target.value);
    const handleCostChange = (e) => setNewCost(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            nombreMateriaPrima: selectedItem,
            nuevoCosto: parseFloat(newCost),
        };

        try {
            const response = await fetch("http://localhost:8080/materiaPrima/modificarCosto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.text();
            Swal.fire({
                icon: "success",
                title: "Costo actualizado",
                text: `El costo de ${selectedItem} se actualizó correctamente.`,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `No se pudo actualizar el costo: ${err.message}`,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const materiasPrimas = [
        "Medallon de carne", "Tomate", "Queso cheddar", "Papa", "Lechuga", "Pan", "Bacon",
        "Huevo", "Cebolla", "Cocacola", "Sprite", "Fanta", "Agua saborizada", "Agua con gas",
        "Agua sin gas", "Masa Pizza", "Salsa de tomate", "Queso Mozzarela", "Empanada de carne",
        "Doritos", "Papas lays", "Conitos 3D", "Pote Helado 1kg", "Pote Helado 1/2kg"
    ];

    return (
        <div className="relative flex justify-center items-center h-screen">
            {/* Fondo con imagen y opacidad */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${fondo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(5px)",
                    opacity: 0.5,
                    zIndex: -1,
                }}
            ></div>

            {/* Botón para navegar en la esquina superior derecha */}
            <div className="absolute top-4 right-4">
                <button
                    type="button"
                    onClick={() => onNavigate("recargarStock")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow"
                >
                    Ir a Actualizar Stock
                </button>
            </div>

            {/* Formulario en el frente */}
            <form
                className="relative bg-blue-100 bg-opacity-90 shadow-md rounded p-6 w-80 z-10"
                onSubmit={handleSubmit}
            >
                <h2 className="text-xl font-bold mb-4">Modificar Precio</h2>

                <select
                    className="border p-2 mb-4 w-full"
                    value={selectedItem}
                    onChange={handleItemChange}
                    required
                >
                    <option value="" disabled>Seleccione una materia prima</option>
                    {materiasPrimas.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Precio nuevo"
                    className="border p-2 mb-4 w-full"
                    value={newCost}
                    onChange={handleCostChange}
                    required
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600 mb-4"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Guardando..." : "Confirmar"}
                </button>
            </form>
        </div>
    );
}


