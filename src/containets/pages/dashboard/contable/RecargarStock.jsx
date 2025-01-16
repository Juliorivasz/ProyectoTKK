/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";

const materiasPrimas = [
  { nombre: "Medallon de carne", tipo: "kg" },
  { nombre: "Tomate", tipo: "kg" },
  { nombre: "Queso cheddar", tipo: "kg" },
  { nombre: "Papa", tipo: "kg" },
  { nombre: "Lechuga", tipo: "kg" },
  { nombre: "Pan", tipo: "unidades" },
  { nombre: "Bacon", tipo: "kg" },
  { nombre: "Huevo", tipo: "unidades" },
  { nombre: "Cebolla", tipo: "kg" },
  { nombre: "Cocacola", tipo: "unidades" },
  { nombre: "Sprite", tipo: "unidades" },
  { nombre: "Fanta", tipo: "unidades" },
  { nombre: "Agua saborizada", tipo: "unidades" },
  { nombre: "Agua con gas", tipo: "unidades" },
  { nombre: "Agua sin gas", tipo: "unidades" },
  { nombre: "Masa Pizza", tipo: "kg" },
  { nombre: "Salsa de tomate", tipo: "kg" },
  { nombre: "Queso Mozzarela", tipo: "kg" },
  { nombre: "Empanada de carne", tipo: "unidades" },
  { nombre: "Doritos", tipo: "unidades" },
  { nombre: "Papas lays", tipo: "unidades" },
  { nombre: "Conitos 3D", tipo: "unidades" },
  { nombre: "Pote Helado 1kg", tipo: "unidades" },
  { nombre: "Pote Helado 1/2kg", tipo: "unidades" },
];

export default function RecargarStock({ onNavigate }) {
  const [stockItems, setStockItems] = useState([{ nombreMateriaPrima: "", cantidad: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...stockItems];
    updatedItems[index][field] = value;
    setStockItems(updatedItems);
  };

  const addItem = () => {
    setStockItems([...stockItems, { nombreMateriaPrima: "", cantidad: "" }]);
  };

  const removeItem = (index) => {
    const updatedItems = stockItems.filter((_, i) => i !== index);
    setStockItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      carga: stockItems.map((item) => ({
        nombreMateriaPrima: item.nombreMateriaPrima,
        cantidad: parseFloat(item.cantidad),
      })),
    };

    try {
      const response = await fetch("http://localhost:8080/materiaPrima/recargarStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.text();
      Swal.fire({
        icon: "success",
        title: "Stock actualizado",
        text: `Carga realizada exitosamente: ${data}`,
      });
      setStockItems([{ nombreMateriaPrima: "", cantidad: "" }]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: `No se pudo cargar el stock: ${err.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = (nombreMateriaPrima) => {
    const materia = materiasPrimas.find((mat) => mat.nombre === nombreMateriaPrima);
    return materia?.tipo === "unidades" ? "Cantidad en unidades" : "Cantidad en Kg";
  };

  return (
    <div className="relative flex justify-center items-center h-screen mt-32">
      <div className="absolute top-[15%] right-4 z-10">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onNavigate("modificarCosto")}
          sx={{ boxShadow: 3 }}
        >
          Ir a Modificar Precio
        </Button>
      </div>

      <form
        className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10 min-h-[40%]"
        onSubmit={handleSubmit}
        style={{ backdropFilter: "blur(10px)" }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Actualizar Stock</h2>

        {/* Contenedor con scroll */}
        <div className="overflow-y-auto max-h-96">
          {stockItems.map((item, index) => (
            <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-sm mb-4">
              <h3 className="font-semibold text-lg">Materia Prima {index + 1}</h3>

              <FormControl fullWidth margin="normal">
                <InputLabel id={`materia-${index}-label`}>Seleccione una materia prima</InputLabel>
                <Select
                  labelId={`materia-${index}-label`}
                  value={item.nombreMateriaPrima}
                  onChange={(e) => handleItemChange(index, "nombreMateriaPrima", e.target.value)}
                  label="Seleccione una materia prima"
                  required
                >
                  <MenuItem value="">Seleccione...</MenuItem>
                  {materiasPrimas.map((materia) => (
                    <MenuItem key={materia.nombre} value={materia.nombre}>
                      {materia.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label={getPlaceholder(item.nombreMateriaPrima)}
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={item.cantidad}
                onChange={(e) => handleItemChange(index, "cantidad", e.target.value)}
                required
              />

              {index > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeItem(index)}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button variant="contained" color="primary" onClick={addItem} fullWidth sx={{ mt: 2 }}>
          Agregar otra materia prima
        </Button>

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
