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
import type { IUnidadMedida } from './interface/IUnidadMedida.interface';
import { useUnidadesMedida } from './hooks/useUnidadesMedida';
import { UnidadMedidaLista } from './Pages/UnidadMedidaList';
import { AddUnidadMedidaForm } from './Pages/UnidadMedidaAdd';
import { UnidadMedidaEdit } from './Pages/UnidadMedidaEdit';

interface Props {
    getUnidadMedida: Promise<IUnidadMedida[]>;
    permisos: {
        agregar: boolean;
        editar : boolean;
    };
}

const UnidadesMedida: FC<Props> = ({ getUnidadMedida, permisos }) => {
    const { lista, popupAgregar, popupEditar } = useUnidadesMedida(getUnidadMedida);

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>UNIDAD DE MEDIDA</Typography>
            <Divider sx={{ mb: 2 }} />

            {permisos.agregar && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir} sx={{ mb: 2 }}>
                    Nueva Unidad de Medida
                </Button>
            )}

            {permisos.agregar && (
                <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Nueva Unidad de Medida</DialogTitle>
                    <DialogContent>
                        <AddUnidadMedidaForm onAddUnidadMedida={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
                    </DialogContent>
                </Dialog>
            )}

            {permisos.editar && (
                <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Editar Unidad de Medida</DialogTitle>
                    <DialogContent>
                        {popupEditar.seleccionada && (
                            <UnidadMedidaEdit
                                unidad={popupEditar.seleccionada}
                                onActualizar={popupEditar.onGuardar}
                                onCancel={popupEditar.cerrar}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            )}

            <UnidadMedidaLista
                unidades={lista.unidades}
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

export default UnidadesMedida;
