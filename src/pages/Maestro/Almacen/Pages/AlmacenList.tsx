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
import type { IAlmacen } from '../interface/IAlmacen.interface';

interface Props {
    almacenes      : IAlmacen[];
    onEditar       : (almacen: IAlmacen) => void;
    puedeEditar    : boolean;
    cargandoEditar?: boolean;
}

export const AlmacenLista = ({ almacenes, onEditar, puedeEditar, cargandoEditar }: Props) => {
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Ubicación</TableCell>
                        <TableCell>Estado</TableCell>
                        {puedeEditar && <TableCell align="center">Acciones</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {almacenes.map((almacen) => (
                        <TableRow key={almacen.idAlmacen ?? almacen.codigo} hover>
                            <TableCell>{almacen.codigo}</TableCell>
                            <TableCell>{almacen.descripcion}</TableCell>
                            <TableCell>{almacen.ubicacion}</TableCell>
                            <TableCell>
                                <Tooltip title={almacen.estado ? 'Activo' : 'Inactivo'}>
                                    {almacen.estado
                                        ? <CheckCircleIcon fontSize="small" color="success" />
                                        : <CancelIcon      fontSize="small" color="error"   />}
                                </Tooltip>
                            </TableCell>
                            {puedeEditar && (
                                <TableCell align="center">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        title="Editar"
                                        disabled={cargandoEditar}
                                        onClick={() => onEditar(almacen)}
                                    >
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
