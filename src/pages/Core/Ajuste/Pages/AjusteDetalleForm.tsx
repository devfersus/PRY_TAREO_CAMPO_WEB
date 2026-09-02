import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ComboSearchField } from '../../../../shared/components/ComboSearchField';
import { getProductosCombo } from '../../../Maestro/Producto/api/productoCombo.action';
import { getAlmacenesCombo } from '../../../Maestro/Almacen/api/almacenCombo.action';
import type { IAjuste } from '../interface/IAjuste.interface';
import type { IAjusteDetalleItem, IAjusteDetalleListItem } from '../interface/IAjusteDetalle.interface';
import { createAjusteDetalleMasivo } from '../api/createAjusteDetalle.action';
import { getAjusteDetallePorAjuste } from '../api/getAjusteDetalle.action';

interface Props {
    ajuste   : IAjuste;
    onGuardar: () => void;
    onCancel?: () => void;
}

export const AjusteDetalleForm = ({ ajuste, onGuardar, onCancel }: Props) => {
    const [items, setItems]                           = useState<IAjusteDetalleItem[]>([]);
    const [detallesExistentes, setDetallesExistentes] = useState<IAjusteDetalleListItem[]>([]);
    const [isPending, setIsPending]                   = useState(false);
    const [formKey, setFormKey]                       = useState(0);
    const itemFormRef                                 = useRef<HTMLFormElement>(null);

    const fetchProductos = useCallback((s: string) => getProductosCombo(s), []);
    const fetchAlmacenes = useCallback((s: string) => getAlmacenesCombo(s), []);

    useEffect(() => {
        getAjusteDetallePorAjuste(ajuste.codigoAjuste)
            .then(setDetallesExistentes)
            .catch(() => setDetallesExistentes([]));
    }, [ajuste.codigoAjuste]);

    const agregarItem = () => {
        if (!itemFormRef.current) return;
        const fd             = new FormData(itemFormRef.current);
        const codigoProducto = (fd.get('codigoProducto_item') as string) || '';
        const codigoAlmacen  = (fd.get('codigoAlmacen_item')  as string) || '';
        if (!codigoProducto || !codigoAlmacen) return;

        setItems(prev => [...prev, {
            codigoAlmacen,
            codigoProducto,
            cantidadSistema: parseFloat(fd.get('cantidadSistema_item') as string) || 0,
            cantidadFisica : parseFloat(fd.get('cantidadFisica_item')  as string) || 0,
            comentario     : (fd.get('comentario_item') as string) || '',
            estado         : true,
        }]);
        setFormKey(k => k + 1);
    };

    const eliminarItem = (index: number) =>
        setItems(prev => prev.filter((_, i) => i !== index));

    const handleGuardar = async () => {
        if (items.length === 0) return;
        setIsPending(true);
        try {
            await createAjusteDetalleMasivo({
                codigoAjuste    : ajuste.codigoAjuste,
                items,
                usuarioRegistro : null,
                ipv4Registro    : null,
                ipv6Registro    : null,
            });
            onGuardar();
        } catch {
            // error manejado en la acción
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}

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

            {/* Ítems ya registrados */}
            {detallesExistentes.length > 0 && (
                <>
                    <Typography variant="subtitle2">Ítems registrados</Typography>
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
                                {detallesExistentes.map((d, i) => (
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
                    <Divider />
                </>
            )}

            {/* Formulario de ítem */}
            <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Nuevo ítem</Typography>
                <Box
                    key={formKey}
                    component="form"
                    ref={itemFormRef}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                    onSubmit={(e: React.FormEvent) => { e.preventDefault(); agregarItem(); }}
                >
                    <ComboSearchField
                        name="codigoProducto_item"
                        label="Producto"
                        fetchOptions={fetchProductos}
                        disabled={isPending}
                    />
                    <ComboSearchField
                        name="codigoAlmacen_item"
                        label="Almacén"
                        fetchOptions={fetchAlmacenes}
                        disabled={isPending}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            name="cantidadSistema_item"
                            label="Cantidad Sistema"
                            type="number"
                            size="small"
                            fullWidth
                            variant="outlined"
                            inputProps={{ step: '0.01', min: '0' }}
                            defaultValue="0"
                        />
                        <TextField
                            name="cantidadFisica_item"
                            label="Cantidad Física"
                            type="number"
                            size="small"
                            fullWidth
                            variant="outlined"
                            inputProps={{ step: '0.01', min: '0' }}
                            defaultValue="0"
                        />
                    </Box>
                    <TextField
                        name="comentario_item"
                        label="Comentario"
                        size="small"
                        fullWidth
                        variant="outlined"
                        inputProps={{ maxLength: 200 }}
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        size="small"
                        disabled={isPending}
                    >
                        Agregar ítem
                    </Button>
                </Box>
            </Paper>

            {/* Tabla de ítems acumulados */}
            {items.length > 0 && (
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
                                <TableCell align="center">Quitar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, i) => {
                                const diff = item.cantidadFisica - item.cantidadSistema;
                                return (
                                    <TableRow key={i} hover>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{item.codigoProducto}</TableCell>
                                        <TableCell>{item.codigoAlmacen}</TableCell>
                                        <TableCell align="right">{item.cantidadSistema.toFixed(2)}</TableCell>
                                        <TableCell align="right">{item.cantidadFisica.toFixed(2)}</TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ color: diff < 0 ? 'error.main' : diff > 0 ? 'success.main' : 'text.secondary', fontWeight: 600 }}
                                        >
                                            {diff > 0 ? '+' : ''}{diff.toFixed(2)}
                                        </TableCell>
                                        <TableCell>{item.comentario}</TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" color="error" onClick={() => eliminarItem(i)} disabled={isPending}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Acciones finales */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={handleGuardar}
                    disabled={isPending || items.length === 0}
                >
                    Guardar {items.length > 0 ? `(${items.length} ítem${items.length > 1 ? 's' : ''})` : ''}
                </Button>
                {onCancel && (
                    <Button variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>
                        Cancelar
                    </Button>
                )}
            </Box>
        </Box>
    );
};
