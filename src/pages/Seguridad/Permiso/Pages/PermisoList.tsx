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
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { IPermiso } from '../interface/IPermiso.interface';

interface Props {
  permisos: IPermiso[];
  selectedId: string | null;
  onSeleccionar: (permiso: IPermiso) => void;
  onEditar: (permiso: IPermiso) => void;
  onEliminar: (id: string) => void;
  puedeEditar: boolean;
  puedeEliminar: boolean;
}

export const PermisoLista = ({
  permisos,
  selectedId,
  onSeleccionar,
  onEditar,
  onEliminar,
  puedeEditar,
  puedeEliminar,
}: Props) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell>Activo</TableCell>
            {(puedeEditar || puedeEliminar) && <TableCell align="center">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {permisos.map((permiso) => (
            <TableRow
              key={permiso.id}
              hover
              selected={permiso.id === selectedId}
              onClick={() => onSeleccionar(permiso)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{permiso.descripcion}</TableCell>
              <TableCell>
                <Tooltip title={permiso.activo ? 'Activo' : 'Inactivo'}>
                  {permiso.activo
                    ? <CheckCircleIcon fontSize="small" color="success" />
                    : <CancelIcon fontSize="small" color="error" />}
                </Tooltip>
              </TableCell>
              {(puedeEditar || puedeEliminar) && (
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  {puedeEditar && (
                    <IconButton size="small" color="primary" title="Editar" onClick={() => onEditar(permiso)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  {puedeEliminar && (
                    <IconButton size="small" color="error" title="Eliminar" onClick={() => onEliminar(permiso.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
