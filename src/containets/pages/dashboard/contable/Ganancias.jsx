import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Ganancias() {
  return (
    <div className="min-h-screen bg-[#cde8e5] p-5">
      <Card component={Paper} className="mx-auto max-w-4xl">
        <CardHeader
          title={<Typography variant="h6" align="center">Ganancias</Typography>}
        />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre del plato</TableCell>
                  <TableCell>Unidades</TableCell>
                  <TableCell>Materia prima</TableCell>
                  <TableCell>Mano de obra</TableCell>
                  <TableCell>Costos indirectos</TableCell>
                  <TableCell>Costo total</TableCell>
                  <TableCell>Costo unitario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Datos de ejemplo */}
                <TableRow>
                  <TableCell>Plato 1</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>$500</TableCell>
                  <TableCell>$300</TableCell>
                  <TableCell>$200</TableCell>
                  <TableCell>$1000</TableCell>
                  <TableCell>$10</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
