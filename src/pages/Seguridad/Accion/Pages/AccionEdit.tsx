import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
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
  const [activo, setActivo] = useState(accion.activo);

  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      const actualizada = await updateAccionForm(accion.id, _prevState, queryData);
      onActualizar(actualizada);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField
        name="descripcion"
        label="Descripción"
        defaultValue={accion.descripcion}
        required
        fullWidth
        variant="outlined"
      />
      <input type="hidden" name="activo" value={activo ? 'true' : 'false'} />
      <FormControlLabel
        control={
          <Checkbox
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
            color="success"
          />
        }
        label={activo ? 'Activo' : 'Inactivo'}
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
