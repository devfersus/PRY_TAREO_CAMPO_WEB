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
import type { IActividadOperario } from './interface/IActividadOperario.interface';
import { useActividadesOperario } from './hooks/useActividadesOperario';
import { ActividadOperarioLista } from './Pages/ActividadOperarioList';
import { AddActividadOperarioForm } from './Pages/ActividadOperarioAdd';
import { ActividadOperarioEdit } from './Pages/ActividadOperarioEdit';

interface Props {
  getActividadOperario: Promise<IActividadOperario[]>;
  permisos: {
    agregar  : boolean;
    editar   : boolean;
    eliminar : boolean;
  };
}

const ActividadesOperario: FC<Props> = ({ getActividadOperario, permisos }) => {
  const { lista, popupAgregar, popupEditar, onEliminar } = useActividadesOperario(getActividadOperario);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>ACTIVIDAD OPERARIO</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={popupAgregar.abrir}
          sx={{ mb: 2 }}
        >
          Nueva Actividad
        </Button>
      )}

      {/* ── Dialog: Nueva actividad ── */}
      {permisos.agregar && (
        <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="xs" fullWidth>
          <DialogTitle>Nueva Actividad Operario</DialogTitle>
          <DialogContent>
            <AddActividadOperarioForm onAddActividad={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
          </DialogContent>
        </Dialog>
      )}

      {/* ── Dialog: Editar actividad ── */}
      {permisos.editar && (
        <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="xs" fullWidth>
          <DialogTitle>Editar Actividad Operario</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionada && (
              <ActividadOperarioEdit
                actividad={popupEditar.seleccionada}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* ── Grilla ── */}
      <ActividadOperarioLista
        actividades={lista.actividades}
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

export default ActividadesOperario;
