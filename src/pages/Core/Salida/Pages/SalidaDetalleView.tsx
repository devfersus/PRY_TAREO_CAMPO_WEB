import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import type { ISalida } from '../interface/ISalida.interface';
import type { ISalidaDetalleListItem } from '../interface/ISalidaDetalle.interface';
import { getSalidaDetallePorSalida } from '../api/getSalidaDetalle.action';

interface Props {
    salida   : ISalida;
    onCerrar?: () => void;
}

export const SalidaDetalleView = ({ salida, onCerrar }: Props) => {
    const [detalles, setDetalles]   = useState<ISalidaDetalleListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getSalidaDetallePorSalida(salida.codigoSalida)
            .then(setDetalles)
            .catch(() => setDetalles([]))
            .finally(() => setIsLoading(false));
    }, [salida.codigoSalida]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {isLoading && <LinearProgress sx={{ borderRadius: 1 }} />}

            {/* Cabecera */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Código Salida"
                    value={salida.codigoSalida}
                    disabled fullWidth size="small" variant="outlined"
                />
                <TextField
                    label="Motivo"
                    value={salida.motivo ?? ''}
                    disabled fullWidth size="small" variant="outlined"
                />
            </Box>

            <Divider />

            {!isLoading && detalles.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    Esta salida no tiene ítems registrados.
                </Typography>
            ) : (
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Producto</TableCell>
                                <TableCell>Almacén</TableCell>
                                <TableCell align="right">Unidad</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell>Comentario</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {detalles.map((d, i) => (
                                <TableRow key={d.idSalidaDetalle} hover>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{d.descripcionProducto ?? d.codigoProducto}</TableCell>
                                    <TableCell>{d.codigoAlmacen}</TableCell>
                                    <TableCell align="right">{d.unidad.toFixed(2)}</TableCell>
                                    <TableCell align="right">{d.cantidad.toFixed(2)}</TableCell>
                                    <TableCell>{d.comentario}</TableCell>
                                    <TableCell>
                                        <Tooltip title={d.estado ? 'Activo' : 'Inactivo'}>
                                            {d.estado
                                                ? <CheckCircleIcon fontSize="small" color="success" />
                                                : <CancelIcon      fontSize="small" color="error"   />}
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {onCerrar && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" color="inherit" onClick={onCerrar}>Cerrar</Button>
                </Box>
            )}
        </Box>
    );
};
