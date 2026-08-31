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
import type { IUsuario } from './interface/IUsuario.interface';
import { useUsuarios } from './hooks/useUsuarios';
import { UsuarioLista } from './Pages/UsuarioList';
import { AddUsuarioForm } from './Pages/UsuarioAdd';
import { UsuarioEdit } from './Pages/UsuarioEdit';

interface Props {
    getUsuario: Promise<IUsuario[]>;
    permisos: {
        agregar  : boolean;
        editar   : boolean;
        eliminar : boolean;
    };
}

const Usuarios: FC<Props> = ({ getUsuario, permisos }) => {
    const { lista, popupAgregar, popupEditar, onEliminar } = useUsuarios(getUsuario);

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>USUARIO</Typography>
            <Divider sx={{ mb: 2 }} />

            {permisos.agregar && (
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={popupAgregar.abrir}
                    sx={{ mb: 2 }}
                >
                    Nuevo Usuario
                </Button>
            )}

            {/* Dialog: Nuevo usuario */}
            {permisos.agregar && (
                <Dialog
                    open={popupAgregar.visible}
                    onClose={popupAgregar.cerrar}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Nuevo Usuario</DialogTitle>
                    <DialogContent>
                        <AddUsuarioForm
                            onAddUsuario={popupAgregar.onGuardar}
                            onCancel={popupAgregar.cerrar}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* Dialog: Editar usuario */}
            {permisos.editar && (
                <Dialog
                    open={popupEditar.visible}
                    onClose={popupEditar.cerrar}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Editar Usuario</DialogTitle>
                    <DialogContent>
                        {popupEditar.seleccionado && (
                            <UsuarioEdit
                                usuario={popupEditar.seleccionado}
                                onActualizar={popupEditar.onGuardar}
                                onCancel={popupEditar.cerrar}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            )}

            {/* Grilla */}
            <UsuarioLista
                usuarios={lista.usuarios}
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

export default Usuarios;
