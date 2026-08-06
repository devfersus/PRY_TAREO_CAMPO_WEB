import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { type IAccion } from '../interface/IAccion.interface';

interface Props {
  acciones: IAccion[];
  onEditar: (accion: IAccion) => void;
  puedeEditar: boolean;
}

export const AccionLista = ({ acciones, onEditar, puedeEditar }: Props) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell>Activo</TableCell>
            {puedeEditar && <TableCell align="center">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {acciones.map((accion) => (
            <TableRow key={accion.id} hover>
              <TableCell>{accion.descripcion}</TableCell>
              <TableCell>{accion.activo ? 'Sí' : 'No'}</TableCell>
              {puedeEditar && (
                <TableCell align="center">
                  <IconButton size="small" color="primary" onClick={() => onEditar(accion)}>
                    <EditIcon fontSize="small" />
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
