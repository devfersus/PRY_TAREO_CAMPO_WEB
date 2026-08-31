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
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { IActividadOperario } from '../interface/IActividadOperario.interface';

interface Props {
  actividades  : IActividadOperario[];
  onEditar     : (actividad: IActividadOperario) => void;
  onEliminar   : (id: string) => void;
  puedeEditar  : boolean;
  puedeEliminar: boolean;
  cargandoEditar?: boolean;
}

export const ActividadOperarioLista = ({
  actividades,
  onEditar,
  onEliminar,
  puedeEditar,
  puedeEliminar,
  cargandoEditar,
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
          {actividades.map((actividad) => (
            <TableRow key={actividad.id} hover>
              <TableCell>{actividad.descripcion}</TableCell>
              <TableCell>
                <Tooltip title={actividad.activo ? 'Activo' : 'Inactivo'}>
                  {actividad.activo
                    ? <CheckCircleIcon fontSize="small" color="success" />
                    : <CancelIcon fontSize="small" color="error" />}
                </Tooltip>
              </TableCell>
              {(puedeEditar || puedeEliminar) && (
                <TableCell align="center">
                  {puedeEditar && (
                    <IconButton size="small" color="primary" title="Editar" disabled={cargandoEditar} onClick={() => onEditar(actividad)}>
                      {cargandoEditar
                        ? <CircularProgress size={14} color="inherit" />
                        : <EditIcon fontSize="small" />}
                    </IconButton>
                  )}
                  {puedeEliminar && (
                    <IconButton size="small" color="error" title="Eliminar" onClick={() => onEliminar(actividad.id)}>
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
