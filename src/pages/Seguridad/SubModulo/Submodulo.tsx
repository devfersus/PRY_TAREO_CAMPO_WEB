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
import { SubmoduloLista } from './Pages/SubmoduloList';
import { AddSubmoduloForm } from './Pages/SubmoduloAdd';
import { SubmoduloEdit } from './Pages/SubmoduloEdit';
import type { ISubmoduloListar } from './CasoUso/Listar/interface/ISubmoduloListar.interface';
import { useSubmodulos } from './hooks/useSubmodulos';

interface Props {
  getSubmodulo: Promise<ISubmoduloListar[]>;
  permisos: {
    agregar: boolean;
    editar: boolean;
  };
}

const Submodulos: FC<Props> = ({ getSubmodulo, permisos }) => {
  const { lista, popupAgregar, popupEditar } = useSubmodulos(getSubmodulo);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>SUBMÓDULOS</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={popupAgregar.abrir}
          sx={{ mb: 2 }}
        >
          Nuevo SubMódulo
        </Button>
      )}

      {permisos.agregar && (
        <Dialog
          open={popupAgregar.visible}
          onClose={popupAgregar.cerrar}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Nuevo SubMódulo</DialogTitle>
          <DialogContent>
            <AddSubmoduloForm onAddSubmodulo={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
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
          <DialogTitle>Editar SubMódulo</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionado && (
              <SubmoduloEdit
                submodulo={popupEditar.seleccionado}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <SubmoduloLista
        submodulos={lista.submodulos}
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

export default Submodulos;
