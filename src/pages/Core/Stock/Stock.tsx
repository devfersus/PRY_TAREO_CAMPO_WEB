import type { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import type { IStock } from './interface/IStock.interface';
import { useStock } from './hooks/useStock';
import { StockLista } from './Pages/StockList';
import { StockEdit } from './Pages/StockEdit';

interface Props {
    getStock: Promise<IStock[]>;
    permisos: {
        editar: boolean;
    };
}

const Stock: FC<Props> = ({ getStock, permisos }) => {
    const { lista, toggle, popupEditar } = useStock(getStock);

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>STOCK</Typography>
            <Divider sx={{ mb: 2 }} />

            <Button
                variant={toggle.modoAlertas ? 'contained' : 'outlined'}
                color="warning"
                startIcon={toggle.modoAlertas ? <FormatListBulletedIcon /> : <WarningAmberIcon />}
                onClick={toggle.toggleAlertas}
                disabled={toggle.cargando}
                sx={{ mb: 2 }}
            >
                {toggle.modoAlertas ? 'Ver Todos' : 'Ver Alertas'}
            </Button>

            {permisos.editar && (
                <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
                    <DialogTitle>Editar Límites de Stock</DialogTitle>
                    <DialogContent>
                        {popupEditar.seleccionado && (
                            <StockEdit
                                stock={popupEditar.seleccionado}
                                onActualizar={popupEditar.onGuardar}
                                onCancel={popupEditar.cerrar}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            )}

            <StockLista
                stocks={lista.stocks}
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

export default Stock;
