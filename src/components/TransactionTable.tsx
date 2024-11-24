import VentaPut from '@/api/dashboard/ventas.put';
import { allStatuses, EstadoVenta } from '@/types/venta.interface';
import { Transaction } from '@/utils/dashboard.utils';
import { toArsString } from '@/utils/toString.utils';
import { Update } from '@mui/icons-material';
import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface ITransactionTable {
  data: Transaction[];
  refetch: () => void;
}

export default function TransactionTable({ data, refetch }: ITransactionTable) {
  const [compras, ventas] = useMemo(
    () => [data.filter(({ type }) => type === 'compra'), data.filter(({ type }) => type === 'venta')],
    data
  );

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" textAlign="center">
          Compras
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: '16em' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="right">Producto</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compras.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.username || '-'}</TableCell>
                  <TableCell align="center">{row.date.format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="right">
                    <Link to={`/productos/${row.ids[0]}`}>
                      <Typography variant="button" color="primary">
                        {row.ids[0]}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{toArsString(row.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* VENTAS */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h6" textAlign="center">
          Ventas
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: '16em' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="right">Productos</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ventas.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.username || '-'}</TableCell>
                  <TableCell align="center">{row.date.format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="right">
                    {row.ids.map((id) => (
                      <p style={{ margin: 0 }}>
                        <Link key={id} to={`/productos/${id}`}>
                          <Typography variant="button" color="primary">
                            {id}
                          </Typography>
                        </Link>
                      </p>
                    ))}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{toArsString(row.amount)}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={allStatuses[row.status as EstadoVenta].value}
                      color={allStatuses[row.status as EstadoVenta].color as any}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={'Editar estado'}>
                      <IconButton
                        onClick={async () =>
                          VentaPut(row.id, { estado: allStatuses[row.status as EstadoVenta].successor }).finally(
                            refetch
                          )
                        }
                        children={<Update />}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
