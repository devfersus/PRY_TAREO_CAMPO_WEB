import { useActionState, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { ComboSearchField } from '../../../../shared/components/ComboSearchField';
import { getUsuariosCombo } from '../../Usuario/api/usuarioCombo.action';
import type { IProveedor } from '../interface/IProveedor.interface';
import { updateProveedorForm } from '../api/updateProveedor.action';

interface Props {
  proveedor   : IProveedor;
  onActualizar: (proveedor: IProveedor) => void;
  onCancel?   : () => void;
}

export const ProveedorEdit = ({ proveedor, onActualizar, onCancel }: Props) => {
  const [estado, setEstado] = useState(proveedor.estado);
  const fetchUsuarios = useCallback((s: string) => getUsuariosCombo(s), []);

  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      const actualizado = await updateProveedorForm(proveedor.codigo, _prevState, queryData);
      onActualizar(actualizado);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField label="Código" value={proveedor.codigo} fullWidth disabled variant="outlined" />
      <TextField name="descripcion" label="Descripción" defaultValue={proveedor.descripcion ?? ''} fullWidth autoFocus variant="outlined" />
      <TextField name="comentario"  label="Comentario"  defaultValue={proveedor.comentario ?? ''}  fullWidth multiline rows={2} variant="outlined" />
      <ComboSearchField name="usuarioContactoId" label="Usuario Contacto" defaultValue={proveedor.usuarioContactoId ?? ''} fetchOptions={fetchUsuarios} disabled={isPending} />
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
