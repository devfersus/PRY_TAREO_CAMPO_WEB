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
import type { IUsuario } from '../interface/IUsuario.interface';

interface Props {
    usuarios      : IUsuario[];
    onEditar      : (usuario: IUsuario) => void;
    onEliminar    : (id: string) => void;
    puedeEditar   : boolean;
    puedeEliminar : boolean;
    cargandoEditar?: boolean;
}

export const UsuarioLista = ({
    usuarios,
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
                        <TableCell>Código</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Ap. Paterno</TableCell>
                        <TableCell>Ap. Materno</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Activo</TableCell>
                        {(puedeEditar || puedeEliminar) && (
                            <TableCell align="center">Acciones</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.id} hover>
                            <TableCell>{usuario.codigo}</TableCell>
                            <TableCell>{usuario.nombre}</TableCell>
                            <TableCell>{usuario.apellidoPaterno}</TableCell>
                            <TableCell>{usuario.apellidoMaterno}</TableCell>
                            <TableCell>{usuario.email}</TableCell>
                            <TableCell>
                                <Tooltip title={usuario.activo ? 'Activo' : 'Inactivo'}>
                                    {usuario.activo
                                        ? <CheckCircleIcon fontSize="small" color="success" />
                                        : <CancelIcon     fontSize="small" color="error"   />}
                                </Tooltip>
                            </TableCell>
                            {(puedeEditar || puedeEliminar) && (
                                <TableCell align="center">
                                    {puedeEditar && (
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            title="Editar"
                                            disabled={cargandoEditar}
                                            onClick={() => onEditar(usuario)}
                                        >
                                            {cargandoEditar
                                                ? <CircularProgress size={14} color="inherit" />
                                                : <EditIcon fontSize="small" />}
                                        </IconButton>
                                    )}
                                    {puedeEliminar && (
                                        <IconButton
                                            size="small"
                                            color="error"
                                            title="Eliminar"
                                            onClick={() => onEliminar(usuario.id)}
                                        >
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
