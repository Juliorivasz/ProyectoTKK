import React from 'react';
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
} from '@mui/material';

export default function LibroDiario() {
  const entradasDiario = [
    { id: 1, fecha: '2024-01-15', descripcion: 'Compra de materiales', debe: 1000, haber: 0 },
    { id: 2, fecha: '2024-01-15', descripcion: 'Pago a proveedores', debe: 0, haber: 1000 },
    { id: 3, fecha: '2024-01-20', descripcion: 'Venta de productos', debe: 1500, haber: 0 },
    { id: 4, fecha: '2024-01-20', descripcion: 'Registro de ingresos', debe: 0, haber: 1500 },
    { id: 5, fecha: '2024-01-25', descripcion: 'Pago de salarios', debe: 2000, haber: 0 },
    { id: 6, fecha: '2024-01-25', descripcion: 'Salida de efectivo', debe: 0, haber: 2000 },
  ];

  const totalDebe = entradasDiario.reduce((sum, entrada) => sum + entrada.debe, 0);
  const totalHaber = entradasDiario.reduce((sum, entrada) => sum + entrada.haber, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <Card style={{ maxWidth: '800px', margin: 'auto' }}>
        <CardHeader
          title={<Typography variant="h5" align="center">Libro Diario</Typography>}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: 'bold', width: '50px' }}>N°</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>Debe</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>Haber</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entradasDiario.map((entrada, index) => (
                  <TableRow key={entrada.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5' }}>
                    <TableCell align="center">{entrada.id}</TableCell>
                    <TableCell align="center">{entrada.fecha}</TableCell>
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