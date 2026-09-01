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
import type { IAlmacen } from './interface/IAlmacen.interface';
import { useAlmacenes } from './hooks/useAlmacenes';
import { AlmacenLista } from './Pages/AlmacenList';
import { AddAlmacenForm } from './Pages/AlmacenAdd';
import { AlmacenEdit } from './Pages/AlmacenEdit';

interface Props {
    getAlmacen: Promise<IAlmacen[]>;
    permisos: {
        agregar: boolean;
        editar : boolean;
    };
}

const Almacenes: FC<Props> = ({ getAlmacen, permisos }) => {
    const { lista, popupAgregar, popupEditar } = useAlmacenes(getAlmacen);

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>ALMACÉN</Typography>
            <Divider sx={{ mb: 2 }} />

            {permisos.agregar && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir} sx={{ mb: 2 }}>
                    Nuevo Almacén
                </Button>
            )}

            {permisos.agregar && (
                <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Nuevo Almacén</DialogTitle>
                    <DialogContent>
                        <AddAlmacenForm onAddAlmacen={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
                    </DialogContent>
                </Dialog>
            )}

            {permisos.editar && (
                <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Editar Almacén</DialogTitle>
                    <DialogContent>
                        {popupEditar.seleccionado && (
                            <AlmacenEdit
                                almacen={popupEditar.seleccionado}
                                onActualizar={popupEditar.onGuardar}
                                onCancel={popupEditar.cerrar}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            )}

            <AlmacenLista
                almacenes={lista.almacenes}
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

export default Almacenes;
