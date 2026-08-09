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
import { type ISubmoduloListar } from '../CasoUso/Listar/interface/ISubmoduloListar.interface';

interface Props {
  submodulos: ISubmoduloListar[];
  onEditar: (submodulo: ISubmoduloListar) => void;
  puedeEditar: boolean;
  cargandoEditar?: boolean;
}

export const SubmoduloLista = ({ submodulos, onEditar, puedeEditar, cargandoEditar }: Props) => {
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
          {submodulos.map((submodulo) => (
            <TableRow key={submodulo.id} hover>
              <TableCell>{submodulo.descripcion}</TableCell>
              <TableCell>
                <Tooltip title={submodulo.activo ? 'Activo' : 'Inactivo'}>
                  {submodulo.activo
                    ? <CheckCircleIcon fontSize="small" color="success" />
                    : <CancelIcon fontSize="small" color="error" />}
                </Tooltip>
              </TableCell>
              {puedeEditar && (
                <TableCell align="center">
                  <IconButton size="small" color="primary" disabled={cargandoEditar} onClick={() => onEditar(submodulo)}>
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
