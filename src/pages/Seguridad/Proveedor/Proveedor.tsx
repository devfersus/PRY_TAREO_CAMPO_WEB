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
import type { IProveedor } from './interface/IProveedor.interface';
import { useProveedores } from './hooks/useProveedores';
import { ProveedorLista } from './Pages/ProveedorList';
import { AddProveedorForm } from './Pages/ProveedorAdd';
import { ProveedorEdit } from './Pages/ProveedorEdit';

interface Props {
  getProveedor: Promise<IProveedor[]>;
  permisos: {
    agregar: boolean;
    editar : boolean;
  };
}

const Proveedores: FC<Props> = ({ getProveedor, permisos }) => {
  const { lista, popupAgregar, popupEditar } = useProveedores(getProveedor);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>PROVEEDOR</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={popupAgregar.abrir}
          sx={{ mb: 2 }}
        >
          Nuevo Proveedor
        </Button>
      )}

      {/* ── Dialog: Nuevo proveedor ── */}
      {permisos.agregar && (
        <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Nuevo Proveedor</DialogTitle>
          <DialogContent>
            <AddProveedorForm onAddProveedor={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
          </DialogContent>
        </Dialog>
      )}

      {/* ── Dialog: Editar proveedor ── */}
      {permisos.editar && (
        <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Proveedor</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionado && (
              <ProveedorEdit
                proveedor={popupEditar.seleccionado}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* ── Grilla ── */}
      <ProveedorLista
        proveedores={lista.proveedores}
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

export default Proveedores;
