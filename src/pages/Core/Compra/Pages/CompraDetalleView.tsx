import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import type { ICompra } from '../interface/ICompra.interface';
import type { ICompraDetalleListItem } from '../interface/ICompraDetalle.interface';
import { getCompraDetallePorCompra } from '../api/getCompraDetalle.action';

interface Props {
  compra   : ICompra;
  onCerrar?: () => void;
}

export const CompraDetalleView = ({ compra, onCerrar }: Props) => {
  const [detalles, setDetalles]   = useState<ICompraDetalleListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCompraDetallePorCompra(compra.codigoCompra, compra.codigoProveedor)
      .then(setDetalles)
      .catch(() => setDetalles([]))
      .finally(() => setIsLoading(false));
  }, [compra.codigoCompra]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isLoading && <LinearProgress sx={{ borderRadius: 1 }} />}

      {/* Cabecera */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Código Compra"
          value={compra.codigoCompra}
          disabled fullWidth size="small" variant="outlined"
        />
        <TextField
          label="Proveedor"
          value={compra.descripcionProveedor ?? compra.codigoProveedor}
          disabled fullWidth size="small" variant="outlined"
        />
      </Box>

      <Divider />

      {/* Tabla de detalles */}
      {!isLoading && detalles.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          Esta compra no tiene ítems registrados.
        </Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Unidad</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell>Comentario</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detalles.map((d, i) => (
                <TableRow key={d.idCompraDetalle} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{d.descripcionProducto ?? d.codigoProducto}</TableCell>
                  <TableCell align="right">{d.unidad.toFixed(2)}</TableCell>
                  <TableCell align="right">{d.cantidad.toFixed(2)}</TableCell>
                  <TableCell>{d.comentario}</TableCell>
                  <TableCell>
                    <Tooltip title={d.estado ? 'Activo' : 'Inactivo'}>
                      {d.estado
                        ? <CheckCircleIcon fontSize="small" color="success" />
                        : <CancelIcon     fontSize="small" color="error"   />}
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {onCerrar && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="inherit" onClick={onCerrar}>Cerrar</Button>
        </Box>
      )}
    </Box>
  );
};
