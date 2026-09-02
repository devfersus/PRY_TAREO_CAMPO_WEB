import { useActionState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { IStock } from '../interface/IStock.interface';
import { updateStockForm } from '../api/updateStock.action';

interface Props {
    stock       : IStock;
    onActualizar: (stock: IStock) => void;
    onCancel?   : () => void;
}

export const StockEdit = ({ stock, onActualizar, onCancel }: Props) => {

    const [_state, formAction, isPending] = useActionState(
        async (_prevState: unknown, queryData: FormData) => {
            const actualizado = await updateStockForm(
                stock.codigoProducto,
                stock.codigoAlmacen,
                _prevState,
                queryData
            );
            onActualizar(actualizado);
        },
        null
    );

    return (
        <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
            <TextField label="Producto"     value={stock.codigoProducto}        fullWidth disabled variant="outlined" />
            <TextField label="Almacén"      value={stock.codigoAlmacen}         fullWidth disabled variant="outlined" />
            <TextField label="Stock Actual" value={stock.stockActual.toFixed(2)} fullWidth disabled variant="outlined" />
            <TextField
                name="stockMinimo"
                label="Stock Mínimo"
                type="number"
                defaultValue={stock.stockMinimo}
                fullWidth
                autoFocus
                variant="outlined"
                slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
            />
            <TextField
                name="stockMaximo"
                label="Stock Máximo"
                type="number"
                defaultValue={stock.stockMaximo}
                fullWidth
                variant="outlined"
                slotProps={{ htmlInput: { step: '0.01', min: '0' } }}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" disabled={isPending}>Guardar</Button>
                {onCancel && (
                    <Button type="button" variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>Cancelar</Button>
                )}
            </Box>
        </Box>
    );
};
