import type { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import type { IProducto } from './interface/IProducto.interface';
import { useProductos } from './hooks/useProductos';
import { ProductoLista } from './Pages/ProductoList';
import { AddProductoForm } from './Pages/ProductoAdd';
import { ProductoEdit } from './Pages/ProductoEdit';

interface Props {
  getProducto: Promise<IProducto[]>;
  permisos: {
    agregar: boolean;
    editar : boolean;
  };
}

const Productos: FC<Props> = ({ getProducto, permisos }) => {
  const { lista, popupAgregar, popupEditar } = useProductos(getProducto);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>PRODUCTO</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir} sx={{ mb: 2 }}>
          Nuevo Producto
        </Button>
      )}

      {permisos.agregar && (
        <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Nuevo Producto</DialogTitle>
          <DialogContent>
            <AddProductoForm onAddProducto={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
          </DialogContent>
        </Dialog>
      )}

      {permisos.editar && (
        <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionado && (
              <ProductoEdit
                producto={popupEditar.seleccionado}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <ProductoLista
        productos={lista.productos}
        onEditar={popupEditar.abrir}
        puedeEditar={permisos.editar}
        cargandoEditar={popupEditar.cargando}
      />

      <Snackbar
        open={popupEditar.error !== null}
        autoHideDuration={3000}
        onClose={popupEditar.cerrarError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" onClose={popupEditar.cerrarError}>
          {popupEditar.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Productos;
