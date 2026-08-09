import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { ISubmoduloListar } from '../CasoUso/Listar/interface/ISubmoduloListar.interface';
import { updateSubmoduloForm } from '../api/updateSubmodulo.action';

interface Props {
  submodulo: ISubmoduloListar;
  onActualizar: (submodulo: ISubmoduloListar) => void;
  onCancel?: () => void;
}

export const SubmoduloEdit = ({ submodulo, onActualizar, onCancel }: Props) => {
  const [activo, setActivo] = useState(submodulo.activo);

  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      const actualizado = await updateSubmoduloForm(submodulo.id, _prevState, queryData);
      onActualizar(actualizado);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      <TextField
        name="descripcion"
        label="Descripción"
        defaultValue={submodulo.descripcion}
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
