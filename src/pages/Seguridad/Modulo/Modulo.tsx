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
import { ModuloLista } from './Pages/ModuloList';
import { AddModuloForm } from './Pages/ModuloAdd';
import { ModuloEdit } from './Pages/ModuloEdit';
import type { IModulo } from './interface/IModulo.interface';
import { useModulos } from './hooks/useModulos';

interface Props {
  getModulo: Promise<IModulo[]>;
  permisos: {
    agregar: boolean;
    editar: boolean;
  };
}

const Modulos: FC<Props> = ({ getModulo, permisos }) => {
  const { lista, popupAgregar, popupEditar } = useModulos(getModulo);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>MÓDULO</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={popupAgregar.abrir}
          sx={{ mb: 2 }}
        >
          Nuevo Módulo
        </Button>
      )}

      {permisos.agregar && (
        <Dialog
          open={popupAgregar.visible}
          onClose={popupAgregar.cerrar}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Nuevo Módulo</DialogTitle>
          <DialogContent>
            <AddModuloForm onAddModulo={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
          </DialogContent>
        </Dialog>
      )}

      {permisos.editar && (
        <Dialog
          open={popupEditar.visible}
          onClose={popupEditar.cerrar}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Editar Módulo</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionado && (
              <ModuloEdit
                modulo={popupEditar.seleccionado}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <ModuloLista
        modulos={lista.modulos}
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

export default Modulos;
