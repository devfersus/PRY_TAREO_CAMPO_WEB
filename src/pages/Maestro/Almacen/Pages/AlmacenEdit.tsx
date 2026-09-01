import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { IAlmacen } from '../interface/IAlmacen.interface';
import { updateAlmacenForm } from '../api/updateAlmacen.action';

interface Props {
    almacen     : IAlmacen;
    onActualizar: (almacen: IAlmacen) => void;
    onCancel?   : () => void;
}

export const AlmacenEdit = ({ almacen, onActualizar, onCancel }: Props) => {
    const [estado, setEstado] = useState(almacen.estado);

    const [_state, formAction, isPending] = useActionState(
        async (_prevState: unknown, queryData: FormData) => {
            const actualizado = await updateAlmacenForm(almacen.codigo, _prevState, queryData);
            onActualizar(actualizado);
        },
        null
    );

    return (
        <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
            <TextField label="Código" value={almacen.codigo} fullWidth disabled variant="outlined" />
            <TextField name="descripcion" label="Descripción" defaultValue={almacen.descripcion ?? ''} fullWidth autoFocus variant="outlined" />
            <TextField name="ubicacion"   label="Ubicación"   defaultValue={almacen.ubicacion   ?? ''} fullWidth variant="outlined" />
            <input type="hidden" name="estado" value={estado ? 'true' : 'false'} />
            <FormControlLabel
                control={<Checkbox checked={estado} onChange={(e) => setEstado(e.target.checked)} color="success" />}
                label={estado ? 'Activo' : 'Inactivo'}
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
