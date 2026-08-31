import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { IProducto } from '../interface/IProducto.interface';

interface Props {
  productos     : IProducto[];
  onEditar      : (producto: IProducto) => void;
  puedeEditar   : boolean;
  cargandoEditar?: boolean;
}

export const ProductoLista = ({ productos, onEditar, puedeEditar, cargandoEditar }: Props) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell>Comentario</TableCell>
            <TableCell>Estado</TableCell>
            {puedeEditar && <TableCell align="center">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto.id ?? producto.codigo} hover>
              <TableCell>{producto.codigo}</TableCell>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell align="right">{producto.precio?.toFixed(2)}</TableCell>
              <TableCell>{producto.comentario}</TableCell>
              <TableCell>
                <Tooltip title={producto.estado ? 'Activo' : 'Inactivo'}>
                  {producto.estado
                    ? <CheckCircleIcon fontSize="small" color="success" />
                    : <CancelIcon fontSize="small" color="error" />}
                </Tooltip>
              </TableCell>
              {puedeEditar && (
                <TableCell align="center">
                  <IconButton size="small" color="primary" title="Editar" disabled={cargandoEditar} onClick={() => onEditar(producto)}>
                    {cargandoEditar
                      ? <CircularProgress size={14} color="inherit" />
                      : <EditIcon fontSize="small" />}
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
