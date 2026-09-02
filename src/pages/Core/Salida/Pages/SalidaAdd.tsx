import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { ISalida } from '../interface/ISalida.interface';
import { createSalidaForm } from '../api/getSalidas.action';

interface Props {
    onAddSalida: (salida: ISalida) => void;
    onCancel?  : () => void;
}

export const AddSalidaForm = ({ onAddSalida, onCancel }: Props) => {
    const [estado, setEstado] = useState(true);

    const [_state, formAction, isPending] = useActionState(
        async (prevState: unknown, queryData: FormData) => {
            const salida = await createSalidaForm(prevState, queryData);
            onAddSalida(salida);
        },
        null
    );

    return (
        <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
            <TextField name="codigoSalida" label="Código de Salida" fullWidth autoFocus variant="outlined" />
            <TextField name="motivo"       label="Motivo"            fullWidth multiline rows={2} variant="outlined" />
            <input type="hidden" name="estado" value={estado ? 'true' : 'false'} />
            <FormControlLabel
                control={<Checkbox checked={estado} onChange={(e) => setEstado(e.target.checked)} color="success" />}
                label={estado ? 'Activo' : 'Inactivo'}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" disabled={isPending}>Agregar</Button>
                {onCancel && (
                    <Button type="button" variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>Cancelar</Button>
                )}
            </Box>
        </Box>
    );
};
