import { useActionState, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { ComboSearchField } from '../../../../shared/components/ComboSearchField';
import { getProveedoresCombo } from '../../../Seguridad/Proveedor/api/proveedorCombo.action';
import type { ICompra } from '../interface/ICompra.interface';
import { updateCompraForm } from '../api/updateCompra.action';

interface Props {
  compra      : ICompra;
  onActualizar: (compra: ICompra) => void;
  onCancel?   : () => void;
}

export const CompraEdit = ({ compra, onActualizar, onCancel }: Props) => {
  const [estado, setEstado]  = useState(compra.estado);
  const fetchProveedores     = useCallback((s: string) => getProveedoresCombo(s), []);

  const [_state, formAction, isPending] = useActionState(
    async (_prevState: unknown, queryData: FormData) => {
      const actualizada = await updateCompraForm(compra.idCompra, _prevState, queryData);
      onActualizar(actualizada);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField label="Código Compra" value={compra.codigoCompra} fullWidth disabled variant="outlined" />
      <ComboSearchField
        name="codigoProveedor"
        label="Proveedor"
        defaultValue={compra.codigoProveedor ?? ''}
        defaultLabel={compra.descripcionProveedor ?? undefined}
        fetchOptions={fetchProveedores}
        disabled={isPending}
      />
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

