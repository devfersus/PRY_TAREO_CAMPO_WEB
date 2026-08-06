import type { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AccionLista } from './Pages/AccionList';
import { AddAccionForm } from './Pages/AccionAdd';
import { AccionEdit } from './Pages/AccionEdit';
import type { IAccion } from './interface/IAccion.interface';
import { useAcciones } from './hooks/useAcciones';

interface Props {
  getAccion: Promise<IAccion[]>;
  permisos: {
    agregar: boolean;
    editar: boolean;
  };
}

const Acciones: FC<Props> = ({ getAccion, permisos }) => {
  const { lista, popupAgregar, popupEditar } = useAcciones(getAccion);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Agregar y mantener acciones</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={popupAgregar.abrir}
          sx={{ mb: 2 }}
        >
          Nueva Acción
        </Button>
      )}

      {permisos.agregar && (
        <Dialog
          open={popupAgregar.visible}
          onClose={popupAgregar.cerrar}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Nueva Acción</DialogTitle>
          <DialogContent>
            <AddAccionForm onAddAccion={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
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
          <DialogTitle>Editar Acción</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionada && (
              <AccionEdit
                accion={popupEditar.seleccionada}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <AccionLista
        acciones={lista.acciones}
        onEditar={popupEditar.abrir}
        puedeEditar={permisos.editar}
      />
    </>
  );
};

export default Acciones;
