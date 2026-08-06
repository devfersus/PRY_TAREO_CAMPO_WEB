import { useActionState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { type IAccion } from '../interface/IAccion.interface';
import { createAccionForm } from '../api/getAccions.action';

interface Props {
  onAddAccion: (accion: IAccion) => void;
  onCancel?: () => void;
}

export const AddAccionForm = ({ onAddAccion, onCancel }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const accion: IAccion = await createAccionForm(prevState, queryData);
      onAddAccion(accion);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField
        name="descripcion"
        label="Descripción"
        required
        fullWidth
        variant="outlined"
      />
      <FormControlLabel
        control={<Checkbox name="activo" defaultChecked />}
        label="Activo"
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isPending}>
          Agregar Acción
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
