import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { IAjuste } from '../interface/IAjuste.interface';
import { updateAjusteForm } from '../api/updateAjuste.action';

interface Props {
    ajuste      : IAjuste;
    onActualizar: (ajuste: IAjuste) => void;
    onCancel?   : () => void;
}

export const AjusteEdit = ({ ajuste, onActualizar, onCancel }: Props) => {
    const [estado, setEstado] = useState(ajuste.estado);

    const [_state, formAction, isPending] = useActionState(
        async (_prevState: unknown, queryData: FormData) => {
            const actualizado = await updateAjusteForm(ajuste.idAjuste, _prevState, queryData);
            onActualizar(actualizado);
        },
        null
    );

    return (
        <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
            <TextField label="Código de Ajuste" value={ajuste.codigoAjuste} fullWidth disabled variant="outlined" />
            <TextField name="motivo" label="Motivo" defaultValue={ajuste.motivo ?? ''} fullWidth autoFocus multiline rows={2} variant="outlined" />
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
