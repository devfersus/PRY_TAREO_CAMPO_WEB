import { useActionState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { IAccion } from '../interface/IAccion.interface';
import { updateAccionForm } from '../api/updateAccion.action';

interface Props {
  accion: IAccion;
  onActualizar: (accion: IAccion) => void;
  onCancel?: () => void;
}

export const AccionEdit = ({ accion, onActualizar, onCancel }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      const actualizada = await updateAccionForm(accion.id, _prevState, queryData);
      onActualizar(actualizada);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField
        name="descripcion"
        label="Descripción"
        defaultValue={accion.descripcion}
        required
        fullWidth
        variant="outlined"
      />
      <FormControlLabel
        control={<Checkbox name="activo" defaultChecked={accion.activo} />}
        label="Activo"
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isPending}>
          Guardar
        </Button>
        {onCancel && (
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
};
