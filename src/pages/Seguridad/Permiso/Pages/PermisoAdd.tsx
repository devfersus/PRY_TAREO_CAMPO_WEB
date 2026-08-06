import { useActionState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createPermisoForm } from '../api/getPermisos.action';

interface Props {
  onAddPermiso: () => void;
  onCancel?: () => void;
}

export const AddPermisoForm = ({ onAddPermiso, onCancel }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      await createPermisoForm(prevState, queryData);
      onAddPermiso();
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField
        label="Descripción"
        name="descripcion"
        fullWidth
        required
        autoFocus
      />

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
        >
          Agregar Permiso
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
