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
import type { IAjuste } from '../interface/IAjuste.interface';
import type { IAjusteDetalleListItem } from '../interface/IAjusteDetalle.interface';
import { getAjusteDetallePorAjuste } from '../api/getAjusteDetalle.action';

interface Props {
    ajuste   : IAjuste;
    onCerrar?: () => void;
}

export const AjusteDetalleView = ({ ajuste, onCerrar }: Props) => {
    const [detalles, setDetalles]   = useState<IAjusteDetalleListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getAjusteDetallePorAjuste(ajuste.codigoAjuste)
            .then(setDetalles)
            .catch(() => setDetalles([]))
            .finally(() => setIsLoading(false));
    }, [ajuste.codigoAjuste]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {isLoading && <LinearProgress sx={{ borderRadius: 1 }} />}

            {/* Cabecera */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Código Ajuste"
                    value={ajuste.codigoAjuste}
                    disabled fullWidth size="small" variant="outlined"
                />
                <TextField
                    label="Motivo"
                    value={ajuste.motivo ?? ''}
                    disabled fullWidth size="small" variant="outlined"
                />
            </Box>

            <Divider />

            {!isLoading && detalles.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    Este ajuste no tiene ítems registrados.
                </Typography>
            ) : (
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Producto</TableCell>
                                <TableCell>Almacén</TableCell>
                                <TableCell align="right">Cant. Sistema</TableCell>
                                <TableCell align="right">Cant. Física</TableCell>
                                <TableCell align="right">Diferencia</TableCell>
                                <TableCell>Comentario</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {detalles.map((d, i) => (
                                <TableRow key={d.idAjusteDetalle} hover>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{d.descripcionProducto ?? d.codigoProducto}</TableCell>
                                    <TableCell>{d.codigoAlmacen}</TableCell>
                                    <TableCell align="right">{d.cantidadSistema.toFixed(2)}</TableCell>
                                    <TableCell align="right">{d.cantidadFisica.toFixed(2)}</TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ color: d.diferencia < 0 ? 'error.main' : d.diferencia > 0 ? 'success.main' : 'text.secondary', fontWeight: 600 }}
                                    >
                                        {d.diferencia > 0 ? '+' : ''}{d.diferencia.toFixed(2)}
                                    </TableCell>
                                    <TableCell>{d.comentario}</TableCell>
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
