import { useActionState, useCallback } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ComboSearchField } from '../../../../shared/components/ComboSearchField';
import { getProveedoresCombo } from '../../../Seguridad/Proveedor/api/proveedorCombo.action';
import type { ICompra } from '../interface/ICompra.interface';
import { createCompraForm } from '../api/getCompras.action';

interface Props {
  onAddCompra: (compra: ICompra) => void;
  onCancel?  : () => void;
}

export const AddCompraForm = ({ onAddCompra, onCancel }: Props) => {
  const fetchProveedores = useCallback((s: string) => getProveedoresCombo(s), []);

  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const compra = await createCompraForm(prevState, queryData);
      onAddCompra(compra);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField name="codigoCompra" label="Código Compra" fullWidth autoFocus variant="outlined" inputProps={{ maxLength: 10 }} />
      <ComboSearchField name="codigoProveedor" label="Proveedor" fetchOptions={fetchProveedores} disabled={isPending} />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" disabled={isPending}>Agregar</Button>
        {onCancel && (
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel} disabled={isPending}>Cancelar</Button>
        )}
      </Box>
    </Box>
  );
};
