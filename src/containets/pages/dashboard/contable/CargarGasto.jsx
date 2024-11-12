import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardActions, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export default function CargarGasto() {
  const [formData, setFormData] = useState({
    fecha: '',
    valor: '',
    proveedor: '',
    descripcion: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#cde8e5] p-5 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader
          title={<Typography variant="h5" align="center">Nuevo gasto</Typography>}
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              type="date"
              label="Fecha"
              InputLabelProps={{ shrink: true }}
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              required
            />

            <TextField
              fullWidth
              type="number"
              label="Valor"
              placeholder="Ingrese el valor del gasto"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Proveedor</InputLabel>
              <Select
                value={formData.proveedor}
                onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
                label="Proveedor"
                required
              >
                <MenuItem value="materia-prima">Materia prima</MenuItem>
                <MenuItem value="mano-obra">Mano de obra</MenuItem>
                <MenuItem value="costo-indirecto">Costo indirecto</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="text"
              label="Descripción del Gasto"
              placeholder="Describa el gasto"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />

            <CardActions>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Cargar Gasto
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
