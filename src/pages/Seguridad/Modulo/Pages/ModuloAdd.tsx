import { useActionState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { type IModulo } from '../interface/IModulo.interface';
import { createModuloForm } from '../api/getModulos.action';

interface Props {
  onAddModulo: (modulo: IModulo) => void;
  onCancel?: () => void;
}

export const AddModuloForm = ({ onAddModulo, onCancel }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const modulo: IModulo = await createModuloForm(prevState, queryData);
      onAddModulo(modulo);
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
          Agregar Módulo
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
