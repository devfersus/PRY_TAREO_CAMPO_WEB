import { useActionState, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { ComboSearchField } from '../../../../shared/components/ComboSearchField';
import { getCategoriasCombo } from '../../Categoria/api/categoriaCombo.action';
import { getProveedoresCombo } from '../../../Seguridad/Proveedor/api/proveedorCombo.action';
import type { IProducto } from '../interface/IProducto.interface';
import { createProductoForm } from '../api/getProductos.action';

interface Props {
  onAddProducto: (producto: IProducto) => void;
  onCancel?    : () => void;
}

export const AddProductoForm = ({ onAddProducto, onCancel }: Props) => {
  const [estado, setEstado] = useState(true);

  const fetchCategorias = useCallback((s: string) => getCategoriasCombo(s), []);
  const fetchProveedores = useCallback((s: string) => getProveedoresCombo(s), []);

  const [_state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const producto = await createProductoForm(prevState, queryData);
      onAddProducto(producto);
    },
    null
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
      {isPending && <LinearProgress sx={{ borderRadius: 1 }} />}
      <TextField name="codigo" label="Código" fullWidth autoFocus variant="outlined" />
      <ComboSearchField name="idCategoria" label="Categoría"        fetchOptions={fetchCategorias} disabled={isPending} />
      <ComboSearchField name="idProveedor" label="Proveedor"        fetchOptions={fetchProveedores} disabled={isPending} />
      <TextField
        name="precio"
        label="Precio"
        type="number"
        fullWidth
        variant="outlined"
        inputProps={{ step: '0.01', min: '0' }}
        defaultValue="0"
      />
      <TextField name="descripcion"  label="Descripción" fullWidth variant="outlined" />
      <TextField name="comentario"   label="Comentario"  fullWidth multiline rows={2} variant="outlined" />
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
