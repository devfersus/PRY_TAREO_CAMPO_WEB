import type { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import type { IAjuste } from './interface/IAjuste.interface';
import { useAjustes } from './hooks/useAjustes';
import { AjusteLista } from './Pages/AjusteList';
import { AddAjusteForm } from './Pages/AjusteAdd';
import { AjusteEdit } from './Pages/AjusteEdit';
import { AjusteDetalleForm } from './Pages/AjusteDetalleForm';
import { AjusteDetalleView } from './Pages/AjusteDetalleView';

interface Props {
    getAjuste: Promise<IAjuste[]>;
    permisos: {
        agregar: boolean;
        editar : boolean;
    };
}

const Ajustes: FC<Props> = ({ getAjuste, permisos }) => {
    const { lista, popupAgregar, popupEditar, popupDetalle, popupVerDetalle } = useAjustes(getAjuste);

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>AJUSTE DE INVENTARIO</Typography>
            <Divider sx={{ mb: 2 }} />

            {permisos.agregar && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir} sx={{ mb: 2 }}>
                    Nuevo Ajuste
                </Button>
            )}

            {permisos.agregar && (
                <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Nuevo Ajuste de Inventario</DialogTitle>
                    <DialogContent>
                        <AddAjusteForm onAddAjuste={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
                    </DialogContent>
                </Dialog>
            )}

            {permisos.editar && (
                <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Editar Ajuste</DialogTitle>
                    <DialogContent>
                        {popupEditar.seleccionado && (
                            <AjusteEdit
                                ajuste={popupEditar.seleccionado}
                                onActualizar={popupEditar.onGuardar}
                                onCancel={popupEditar.cerrar}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            )}

            <Dialog open={popupDetalle.visible} onClose={popupDetalle.cerrar} maxWidth="md" fullWidth>
                <DialogTitle>Registrar Ítems de Ajuste</DialogTitle>
                <DialogContent>
                    {popupDetalle.seleccionado && (
                        <AjusteDetalleForm
                            ajuste={popupDetalle.seleccionado}
                            onGuardar={popupDetalle.onGuardar}
                            onCancel={popupDetalle.cerrar}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={popupVerDetalle.visible} onClose={popupVerDetalle.cerrar} maxWidth="md" fullWidth>
                <DialogTitle>Detalle de Ajuste</DialogTitle>
                <DialogContent>
                    {popupVerDetalle.seleccionado && (
                        <AjusteDetalleView
                            ajuste={popupVerDetalle.seleccionado}
                            onCerrar={popupVerDetalle.cerrar}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <AjusteLista
                ajustes={lista.ajustes}
                onEditar={popupEditar.abrir}
                onDetalle={popupDetalle.abrir}
                onVerDetalle={popupVerDetalle.abrir}
                puedeEditar={permisos.editar}
            />
        </>
    );
};

export default Ajustes;
