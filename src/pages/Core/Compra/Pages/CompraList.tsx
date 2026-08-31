import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { ICompra } from '../interface/ICompra.interface';

interface Props {
  compras      : ICompra[];
  onEditar     : (compra: ICompra) => void;
  onDetalle    : (compra: ICompra) => void;
  onVerDetalle : (compra: ICompra) => void;
  puedeEditar  : boolean;
}

export const CompraLista = ({ compras, onEditar, onDetalle, onVerDetalle, puedeEditar }: Props) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((compra) => (
            <TableRow key={compra.idCompra} hover>
              <TableCell>{compra.codigoCompra}</TableCell>
              <TableCell>{compra.descripcionProveedor}</TableCell>
              <TableCell>
                <Tooltip title={compra.estado ? 'Activo' : 'Inactivo'}>
                  {compra.estado
                    ? <CheckCircleIcon fontSize="small" color="success" />
                    : <CancelIcon     fontSize="small" color="error"   />}
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Ver detalle">
                  <IconButton size="small" color="default" onClick={() => onVerDetalle(compra)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Compras múltiples">
                  <IconButton size="small" color="info" onClick={() => onDetalle(compra)}>
                    <ListAltIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                {puedeEditar && (
                  <Tooltip title="Editar">
                    <IconButton size="small" color="primary" onClick={() => onEditar(compra)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
