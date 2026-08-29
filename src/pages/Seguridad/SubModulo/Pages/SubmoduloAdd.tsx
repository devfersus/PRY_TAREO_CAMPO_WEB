import { useActionState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { type ISubmoduloListar } from '../CasoUso/Listar/interface/ISubmoduloListar.interface';
import { createSubmoduloForm } from '../api/getSubmodulos.action';

interface Props {
  onAddSubmodulo: (submodulo: ISubmoduloListar) => void;
  onCancel?: () => void;
}

export const AddSubmoduloForm = ({ onAddSubmodulo, onCancel }: Props) => {
  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const submodulo: ISubmoduloListar = await createSubmoduloForm(prevState, queryData);
      onAddSubmodulo(submodulo);
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
        variant="outlined"
      />
      <FormControlLabel
        control={<Checkbox name="activo" defaultChecked />}
        label="Activo"
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isPending}>
          Agregar SubMódulo
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
