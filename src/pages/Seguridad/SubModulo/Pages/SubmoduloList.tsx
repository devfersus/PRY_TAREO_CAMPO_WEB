import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { type ISubmoduloListar } from '../CasoUso/Listar/interface/ISubmoduloListar.interface';

interface Props {
  submodulos: ISubmoduloListar[];
  onEditar: (submodulo: ISubmoduloListar) => void;
  puedeEditar: boolean;
}

export const SubmoduloLista = ({ submodulos, onEditar, puedeEditar }: Props) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Módulo ID</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Activo</TableCell>
            {puedeEditar && <TableCell align="center">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {submodulos.map((submodulo) => (
            <TableRow key={submodulo.id} hover>
              <TableCell>{submodulo.descripcion}</TableCell>
              <TableCell>{submodulo.activo ? 'Sí' : 'No'}</TableCell>
              {puedeEditar && (
                <TableCell align="center">
                  <IconButton size="small" color="primary" onClick={() => onEditar(submodulo)}>
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
