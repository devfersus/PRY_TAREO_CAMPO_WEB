import type { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import type { ISalida } from './interface/ISalida.interface';
import { useSalidas } from './hooks/useSalidas';
import { SalidaLista } from './Pages/SalidaList';
import { AddSalidaForm } from './Pages/SalidaAdd';
import { SalidaEdit } from './Pages/SalidaEdit';
import { SalidaDetalleForm } from './Pages/SalidaDetalleForm';
import { SalidaDetalleView } from './Pages/SalidaDetalleView';

interface Props {
    getSalida: Promise<ISalida[]>;
    permisos: {
        agregar: boolean;
        editar : boolean;
    };
}

const Salidas: FC<Props> = ({ getSalida, permisos }) => {
    const { lista, popupAgregar, popupEditar, popupDetalle, popupVerDetalle } = useSalidas(getSalida);

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>SALIDA</Typography>
            <Divider sx={{ mb: 2 }} />

            {permisos.agregar && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir} sx={{ mb: 2 }}>
                    Nueva Salida
                </Button>
            )}

            {permisos.agregar && (
                <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Nueva Salida</DialogTitle>
                    <DialogContent>
                        <AddSalidaForm onAddSalida={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
                    </DialogContent>
                </Dialog>
            )}

            {permisos.editar && (
                <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Editar Salida</DialogTitle>
                    <DialogContent>
                        {popupEditar.seleccionada && (
                            <SalidaEdit
                                salida={popupEditar.seleccionada}
                                onActualizar={popupEditar.onGuardar}
                                onCancel={popupEditar.cerrar}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            )}

            <Dialog open={popupDetalle.visible} onClose={popupDetalle.cerrar} maxWidth="md" fullWidth>
                <DialogTitle>Ítems de Salida</DialogTitle>
                <DialogContent>
                    {popupDetalle.seleccionada && (
                        <SalidaDetalleForm
                            salida={popupDetalle.seleccionada}
                            onGuardar={popupDetalle.onGuardar}
                            onCancel={popupDetalle.cerrar}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={popupVerDetalle.visible} onClose={popupVerDetalle.cerrar} maxWidth="md" fullWidth>
                <DialogTitle>Detalle de Salida</DialogTitle>
                <DialogContent>
                    {popupVerDetalle.seleccionada && (
                        <SalidaDetalleView
                            salida={popupVerDetalle.seleccionada}
                            onCerrar={popupVerDetalle.cerrar}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <SalidaLista
                salidas={lista.salidas}
                onEditar={popupEditar.abrir}
                onDetalle={popupDetalle.abrir}
                onVerDetalle={popupVerDetalle.abrir}
                puedeEditar={permisos.editar}
            />
        </>
    );
};

export default Salidas;
