import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
