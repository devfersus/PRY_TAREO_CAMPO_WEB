import { useActionState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { IModulo } from '../interface/IModulo.interface';
import { updateModuloForm } from '../api/updateModulo.action';

interface Props {
  modulo: IModulo;
  onActualizar: (modulo: IModulo) => void;
  onCancel?: () => void;
}

export const ModuloEdit = ({ modulo, onActualizar, onCancel }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      const actualizado = await updateModuloForm(modulo.id, _prevState, queryData);
      onActualizar(actualizado);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField
        name="descripcion"
        label="Descripción"
        defaultValue={modulo.descripcion}
        required
        fullWidth
        variant="outlined"
      />
      <FormControlLabel
        control={<Checkbox name="activo" defaultChecked={modulo.activo} />}
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
