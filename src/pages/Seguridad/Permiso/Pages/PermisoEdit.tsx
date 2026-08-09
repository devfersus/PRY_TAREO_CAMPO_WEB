import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { updatePermisoForm } from '../api/updatePermiso.action';
import type { IPermiso } from '../interface/IPermiso.interface';

interface Props {
  permiso: IPermiso;
  onActualizar: () => void;
  onCancel?: () => void;
}

export const PermisoEdit = ({ permiso, onActualizar, onCancel }: Props) => {
  const [activo, setActivo] = useState(permiso.activo);

  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      await updatePermisoForm(permiso.id, _prevState, queryData);
      onActualizar();
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField
        label="Descripción"
        name="descripcion"
        defaultValue={permiso.descripcion}
        fullWidth
        required
        autoFocus
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
        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
        >
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
