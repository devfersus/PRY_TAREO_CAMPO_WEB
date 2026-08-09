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
import EditNoteIcon from '@mui/icons-material/EditNote';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import type { IPermiso } from './interface/IPermiso.interface';
import { usePermisos } from './hooks/usePermisos';
import { PermisoLista } from './Pages/PermisoList';
import { AddPermisoForm } from './Pages/PermisoAdd';
import { PermisoEdit } from './Pages/PermisoEdit';
import { PermisoDetalleAdd } from './Pages/PermisoDetalleAdd';
import { PermisoDetalleEdit } from './Pages/PermisoDetalleEdit';

interface Props {
  getPermiso: Promise<IPermiso[]>;
  permisos: {
    agregar: boolean;
    editar: boolean;
    eliminar: boolean;
  };
}

const Permisos: FC<Props> = ({ getPermiso, permisos }) => {
  const {
    lista,
    popupAgregar,
    popupEditar,
    popupDetalle,
    popupDetalleEditar,
    onEliminar,
  } = usePermisos(getPermiso);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>PERMISO</Typography>
      <Divider sx={{ mb: 2 }} />

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {permisos.agregar && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir}>
            Nuevo Permiso
          </Button>
        )}

        <Button
          variant="outlined"
          startIcon={<EditNoteIcon />}
          onClick={popupDetalle.abrir}
          disabled={!popupDetalle.haySeleccionada}
        >
          Detalle
        </Button>

        <Button
          variant="outlined"
          color="warning"
          startIcon={<DriveFileRenameOutlineIcon />}
          onClick={popupDetalleEditar.abrir}
          disabled={!popupDetalleEditar.haySeleccionada}
        >
          Editar Detalle
        </Button>
      </div>

      {/* ── Dialog: Nuevo permiso ── */}
      {permisos.agregar && (
        <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Nuevo Permiso</DialogTitle>
          <DialogContent>
            <AddPermisoForm onAddPermiso={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
          </DialogContent>
        </Dialog>
      )}

      {/* ── Dialog: Editar permiso ── */}
      {permisos.editar && (
        <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Permiso</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionado && (
              <PermisoEdit
                permiso={popupEditar.seleccionado}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* ── Dialog: Agregar detalle ── */}
      <Dialog open={popupDetalle.visible} onClose={popupDetalle.cerrar} maxWidth="md" fullWidth>
        <DialogTitle>Agregar Detalle</DialogTitle>
        <DialogContent>
          {popupDetalle.seleccionado && (
            <PermisoDetalleAdd
              permiso={popupDetalle.seleccionado}
              onCancel={popupDetalle.cerrar}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Dialog: Editar detalle ── */}
      <Dialog open={popupDetalleEditar.visible} onClose={popupDetalleEditar.cerrar} maxWidth="md" fullWidth>
        <DialogTitle>Editar Detalle</DialogTitle>
        <DialogContent>
          {popupDetalleEditar.seleccionado && (
            <PermisoDetalleEdit
              permiso={popupDetalleEditar.seleccionado}
              onCancel={popupDetalleEditar.cerrar}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Grilla ── */}
      <PermisoLista
        permisos={lista.permisos}
        selectedId={lista.filaSeleccionada?.id ?? null}
        onSeleccionar={lista.seleccionarFila}
        onEditar={popupEditar.abrir}
        onEliminar={onEliminar}
        puedeEditar={permisos.editar}
        puedeEliminar={permisos.eliminar}
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

export default Permisos;
