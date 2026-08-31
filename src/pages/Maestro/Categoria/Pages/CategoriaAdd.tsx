import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { ICategoria } from '../interface/ICategoria.interface';
import { createCategoriaForm } from '../api/getCategorias.action';

interface Props {
  onAddCategoria: (categoria: ICategoria) => void;
  onCancel?     : () => void;
}

export const AddCategoriaForm = ({ onAddCategoria, onCancel }: Props) => {
  const [estado, setEstado] = useState(true);

  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const categoria = await createCategoriaForm(prevState, queryData);
      onAddCategoria(categoria);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField name="codigo"      label="Código"      fullWidth autoFocus variant="outlined" />
      <TextField name="descripcion" label="Descripción" fullWidth variant="outlined" />
      <TextField name="comentario"  label="Comentario"  fullWidth multiline rows={2} variant="outlined" />
      <input type="hidden" name="estado" value={estado ? 'true' : 'false'} />
      <FormControlLabel
        control={<Checkbox checked={estado} onChange={(e) => setEstado(e.target.checked)} color="success" />}
        label={estado ? 'Activo' : 'Inactivo'}
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isPending}>Agregar</Button>
        {onCancel && (
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>Cancelar</Button>
        )}
      </Box>
    </Box>
  );
};
