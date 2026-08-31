import { useActionState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { IActividadOperario } from '../interface/IActividadOperario.interface';
import { createActividadOperarioForm } from '../api/getActividadesOperario.action';

interface Props {
  onAddActividad: (actividad: IActividadOperario) => void;
  onCancel?     : () => void;
}

export const AddActividadOperarioForm = ({ onAddActividad, onCancel }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const actividad = await createActividadOperarioForm(prevState, queryData);
      onAddActividad(actividad);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField
        name="descripcion"
        label="Descripción"
        required
        fullWidth
        autoFocus
        variant="outlined"
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isPending}>
          Agregar
        </Button>
        {onCancel && (
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
};
