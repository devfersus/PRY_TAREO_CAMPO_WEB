import { useActionState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
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
      await new Promise((r) => setTimeout(r, 4000));
      await createPermisoForm(prevState, queryData);
      onAddPermiso();
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">Procesando...</Typography>
        </Box>
      )}
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
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
};
