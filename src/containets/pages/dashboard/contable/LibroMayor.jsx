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

export default function LibroMayor() {
  const cuentas = [
    { 
      nombre: 'Caja',
      entradas: [
        { debe: 5000, haber: null },
        { debe: null, haber: 2000 },
      ]
    },
    { 
      nombre: 'Banco',
      entradas: [
        { debe: 10000, haber: null },
        { debe: 20000, haber: null },
        { debe: null, haber: 15000 },
      ]
    },
    { 
      nombre: 'Mercadería',
      entradas: [
        { debe: 15000, haber: null },
        { debe: null, haber: 5000 },
      ]
    },
    { 
      nombre: 'Proveedores',
      entradas: [
        { debe: 3000, haber: null },
        { debe: null, haber: 8000 },
      ]
    },
  ];

  const calcularTotal = (cuenta) => {
    const totalDebe = cuenta.entradas.reduce((sum, entrada) => sum + (entrada.debe || 0), 0);
    const totalHaber = cuenta.entradas.reduce((sum, entrada) => sum + (entrada.haber || 0), 0);
    return { debe: totalDebe, haber: totalHaber, saldo: Math.abs(totalDebe - totalHaber) };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-4xl space-y-6">
        {cuentas.map((cuenta, index) => {
          const total = calcularTotal(cuenta);
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b p-4">
                <h2 className="text-center text-lg font-medium">{cuenta.nombre}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="divide-x divide-gray-200">
                      <th className="text-center font-medium p-2 bg-gray-50 w-1/2">Debe</th>
                      <th className="text-center font-medium p-2 bg-gray-50 w-1/2">Haber</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cuenta.entradas.map((entrada, entradaIndex) => (
                      <tr key={entradaIndex} className="divide-x divide-gray-200">
                        <td className="text-right p-2">
                          {entrada.debe ? `$${entrada.debe.toLocaleString()}` : ""}
                        </td>
                        <td className="text-right p-2">
                          {entrada.haber ? `$${entrada.haber.toLocaleString()}` : ""}
                        </td>
                      </tr>
                    ))}
                    <tr className="divide-x divide-gray-200 bg-gray-100 font-semibold">
                      <td className="text-right p-2">${total.debe.toLocaleString()}</td>
                      <td className="text-right p-2">${total.haber.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-gray-200 font-semibold">
                      <td colSpan={2} className="text-right p-2">
                        Saldo: ${total.saldo.toLocaleString()} {total.debe > total.haber ? 'Deudor' : 'Acreedor'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
/*
import { Card, 
  CardContent,
  CardHeader, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper } from '@mui/material';

export default function LibroMayor() {
  const cuentas = [
    { nombre: 'Caja', entradas: [{ debe: 1000, haber: 500 }] },
    { nombre: 'Banco', entradas: [{ debe: 2000, haber: 1000 }] },
    { nombre: 'Proveedores', entradas: [{ debe: 500, haber: 1500 }] },
    { nombre: 'Mercadería', entradas: [{ debe: 3000, haber: 1000 }] },
  ];

  return (
    <div className="min-h-screen bg-[#cde8e5] p-5">
      <div className="mx-auto max-w-4xl space-y-6">
        {cuentas.map((cuenta) => (
          <Card component={Paper} key={cuenta.nombre}>
            <CardHeader
              title={<Typography variant="h6">{cuenta.nombre}</Typography>}
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Debe</TableCell>
                      <TableCell>Haber</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cuenta.entradas.map((entrada, index) => (
                      <TableRow key={index}>
                        <TableCell>${entrada.debe}</TableCell>
                        <TableCell>${entrada.haber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
*/