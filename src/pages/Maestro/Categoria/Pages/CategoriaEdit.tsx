import { useActionState, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import type { ICategoria } from '../interface/ICategoria.interface';
import { updateCategoriaForm } from '../api/updateCategoria.action';

interface Props {
  categoria   : ICategoria;
  onActualizar: (categoria: ICategoria) => void;
  onCancel?   : () => void;
}

export const CategoriaEdit = ({ categoria, onActualizar, onCancel }: Props) => {
  const [estado, setEstado] = useState(categoria.estado);

  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      const actualizada = await updateCategoriaForm(categoria.codigo, _prevState, queryData);
      onActualizar(actualizada);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField label="Código" value={categoria.codigo} fullWidth disabled variant="outlined" />
      <TextField name="descripcion" label="Descripción" defaultValue={categoria.descripcion ?? ''} fullWidth autoFocus variant="outlined" />
      <TextField name="comentario"  label="Comentario"  defaultValue={categoria.comentario ?? ''}  fullWidth multiline rows={2} variant="outlined" />
      <input type="hidden" name="estado" value={estado ? 'true' : 'false'} />
      <FormControlLabel
        control={<Checkbox checked={estado} onChange={(e) => setEstado(e.target.checked)} color="success" />}
        label={estado ? 'Activo' : 'Inactivo'}
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isPending}>Guardar</Button>
        {onCancel && (
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>Cancelar</Button>
        )}
      </Box>
    </Box>
  );
};
