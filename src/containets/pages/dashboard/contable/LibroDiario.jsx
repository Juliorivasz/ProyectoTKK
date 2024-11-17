import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material';

export default function LibroDiario() {
  const [entradasDiario, setEntradasDiario] = useState([
    { id: 1, fecha: '2024-01-15', descripcion: 'Banco xx\n   a mercadería', debe: 10000, haber: 10000 },
    { id: 2, fecha: '2024-01-15', descripcion: 'Banco xx\n   a Mercadería', debe: 20000, haber: 20000 },
    { id: 3, fecha: '2024-01-20', descripcion: 'Mercadería\n   a banco xx', debe: 15000, haber: 15000 },
    { id: 4, fecha: '2024-01-20', descripcion: 'Banco\n   a caja', debe: 15000, haber: 15000 },
  ]);

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [entradasFiltradas, setEntradasFiltradas] = useState(entradasDiario);

  const aplicarFiltro = () => {
    const filtradas = entradasDiario.filter(entrada => {
      const fechaEntrada = new Date(entrada.fecha);
      const inicio = fechaInicio ? new Date(fechaInicio) : new Date(0);
      const fin = fechaFin ? new Date(fechaFin) : new Date();
      return fechaEntrada >= inicio && fechaEntrada <= fin;
    });
    setEntradasFiltradas(filtradas);
  };

  const borrarFiltro = () => {
    setFechaInicio('');
    setFechaFin('');
    setEntradasFiltradas(entradasDiario);
  };

  const totalDebe = entradasFiltradas.reduce((sum, entrada) => sum + entrada.debe, 0);
  const totalHaber = entradasFiltradas.reduce((sum, entrada) => sum + entrada.haber, 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', p: 2 }}>
      <Card sx={{ maxWidth: '800px', margin: 'auto' }}>
        <CardHeader
          title={<Typography variant="h5" align="center">Libro Diario</Typography>}
        />
        <CardContent>
          <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <TextField
              label="Fecha Inicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Fecha Fin"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" color="primary" onClick={aplicarFiltro}>
              Aplicar Filtro
            </Button>
            <Button variant="outlined" onClick={borrarFiltro}>
              Borrar Filtro
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">N°</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center">Debe</TableCell>
                  <TableCell align="center">Haber</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entradasFiltradas.map((entrada, index) => (
                  <TableRow key={entrada.id} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell align="center">{entrada.id}</TableCell>
                    <TableCell align="center">{entrada.fecha}</TableCell>
                    <TableCell style={{ whiteSpace: 'pre-line' }}>{entrada.descripcion}</TableCell>
                    <TableCell align="right">
                      {entrada.debe > 0 ? `$${entrada.debe.toLocaleString()}` : ''}
                    </TableCell>
                    <TableCell align="right">
                      {entrada.haber > 0 ? `$${entrada.haber.toLocaleString()}` : ''}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
                  <TableCell align="right"><strong>${totalDebe.toLocaleString()}</strong></TableCell>
                  <TableCell align="right"><strong>${totalHaber.toLocaleString()}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

/*
export default function LibroDiario() {
  // Datos de ejemplo para el libro diario
  const entradasDiario = [
    { id: 1, fecha: '2024-01-15', descripcion: 'Compra de materiales', debe: 1000, haber: 0 },
    { id: 2, fecha: '2024-01-15', descripcion: 'Pago a proveedores', debe: 0, haber: 1000 },
    { id: 3, fecha: '2024-01-20', descripcion: 'Venta de productos', debe: 1500, haber: 0 },
    { id: 4, fecha: '2024-01-20', descripcion: 'Registro de ingresos', debe: 0, haber: 1500 },
    { id: 5, fecha: '2024-01-25', descripcion: 'Pago de salarios', debe: 2000, haber: 0 },
    { id: 6, fecha: '2024-01-25', descripcion: 'Salida de efectivo', debe: 0, haber: 2000 },
  ];

  // Calcular totales
  const totalDebe = entradasDiario.reduce((sum, entrada) => sum + entrada.debe, 0);
  const totalHaber = entradasDiario.reduce((sum, entrada) => sum + entrada.haber, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#cde8e5', padding: '20px' }}>
      <Card style={{ maxWidth: '800px', margin: 'auto' }}>
        <CardHeader
          title={<Typography variant="h5" align="center">Libro Diario</Typography>}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: '50px', fontWeight: 'bold' }}>N°</TableCell>
                  <TableCell align="left" style={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell align="left" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Debe</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Haber</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entradasDiario.map((entrada, index) => (
                  <TableRow key={entrada.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{entrada.fecha}</TableCell>
                    <TableCell>{entrada.descripcion}</TableCell>
                    <TableCell align="right">{entrada.debe > 0 ? `$${entrada.debe.toFixed(2)}` : ''}</TableCell>
                    <TableCell align="right">{entrada.haber > 0 ? `$${entrada.haber.toFixed(2)}` : ''}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right" style={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>${totalDebe.toFixed(2)}</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>${totalHaber.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
*/