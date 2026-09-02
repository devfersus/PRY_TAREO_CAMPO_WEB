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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import type { ISalida } from '../interface/ISalida.interface';

interface Props {
    salidas     : ISalida[];
    onEditar    : (salida: ISalida) => void;
    onDetalle   : (salida: ISalida) => void;
    onVerDetalle: (salida: ISalida) => void;
    puedeEditar : boolean;
}

export const SalidaLista = ({ salidas, onEditar, onDetalle, onVerDetalle, puedeEditar }: Props) => {
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Motivo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {salidas.map((salida) => (
                        <TableRow key={salida.idSalida} hover>
                            <TableCell>{salida.codigoSalida}</TableCell>
                            <TableCell>{salida.motivo}</TableCell>
                            <TableCell>
                                <Tooltip title={salida.estado ? 'Activo' : 'Inactivo'}>
                                    {salida.estado
                                        ? <CheckCircleIcon fontSize="small" color="success" />
                                        : <CancelIcon      fontSize="small" color="error"   />}
                                </Tooltip>
                            </TableCell>
                            <TableCell align="center">
                                {puedeEditar && (
                                    <Tooltip title="Editar">
                                        <IconButton size="small" color="primary" onClick={() => onEditar(salida)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Tooltip title="Agregar ítems">
                                    <IconButton size="small" color="success" onClick={() => onDetalle(salida)}>
                                        <PlaylistAddIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Ver detalle">
                                    <IconButton size="small" color="inherit" onClick={() => onVerDetalle(salida)}>
                                        <ListAltIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
