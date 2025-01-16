/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import { Button, Select, MenuItem, InputLabel, FormControl, TextField, CircularProgress } from '@mui/material';

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
        <div className="relative flex justify-center items-center h-screen mt-32">
            {/* Botón para navegar en la esquina superior derecha */}
            <div className="absolute top-[20%] right-4 z-10">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onNavigate("recargarStock")}
                    sx={{ boxShadow: 3 }}
                >
                    Ir a Actualizar Stock
                </Button>
            </div>

            {/* Formulario en el frente */}
            <form
                className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10"
                onSubmit={handleSubmit}
                style={{ backdropFilter: "blur(10px)" }}
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">Modificar Costo</h2>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="materia-prima-label">Seleccione una materia prima</InputLabel>
                    <Select
                        labelId="materia-prima-label"
                        value={selectedItem}
                        onChange={handleItemChange}
                        label="Seleccione una materia prima"
                        required
                    >
                        {materiasPrimas.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Nuevo Costo"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newCost}
                    onChange={handleCostChange}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ mt: 4 }}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : "Confirmar"}
                </Button>
            </form>
        </div>
    );
}
