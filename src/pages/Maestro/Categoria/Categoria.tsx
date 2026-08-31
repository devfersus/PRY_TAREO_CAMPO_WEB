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
import type { ICategoria } from './interface/ICategoria.interface';
import { useCategorias } from './hooks/useCategorias';
import { CategoriaLista } from './Pages/CategoriaList';
import { AddCategoriaForm } from './Pages/CategoriaAdd';
import { CategoriaEdit } from './Pages/CategoriaEdit';

interface Props {
  getCategoria: Promise<ICategoria[]>;
  permisos: {
    agregar: boolean;
    editar : boolean;
  };
}

const Categorias: FC<Props> = ({ getCategoria, permisos }) => {
  const { lista, popupAgregar, popupEditar } = useCategorias(getCategoria);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>CATEGORÍA</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir} sx={{ mb: 2 }}>
          Nueva Categoría
        </Button>
      )}

      {permisos.agregar && (
        <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Nueva Categoría</DialogTitle>
          <DialogContent>
            <AddCategoriaForm onAddCategoria={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
          </DialogContent>
        </Dialog>
      )}

      {permisos.editar && (
        <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Categoría</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionada && (
              <CategoriaEdit
                categoria={popupEditar.seleccionada}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <CategoriaLista
        categorias={lista.categorias}
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

export default Categorias;
