import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Gastos() {
  return (
    <div className="min-h-screen bg-[#cde8e5] p-5">
      <div className="mx-auto max-w-4xl space-y-6">

        <Card component={Paper}>
          <CardHeader
            title={<Typography variant="h6">Materia Prima</Typography>}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Descripción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Datos de ejemplo */}
                  <TableRow>
                    <TableCell>15/01/2024</TableCell>
                    <TableCell>$500</TableCell>
                    <TableCell>Compra de insumos</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Card component={Paper}>
          <CardHeader
            title={<Typography variant="h6">Mano de Obra</Typography>}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Descripción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Datos de ejemplo */}
                  <TableRow>
                    <TableCell>16/01/2024</TableCell>
                    <TableCell>$1000</TableCell>
                    <TableCell>Pago de salarios</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Card component={Paper}>
          <CardHeader
            title={<Typography variant="h6">Costo Indirecto</Typography>}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Descripción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Datos de ejemplo */}
                  <TableRow>
                    <TableCell>17/01/2024</TableCell>
                    <TableCell>$300</TableCell>
                    <TableCell>Servicios públicos</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
