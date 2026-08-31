import type { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import type { ICompra } from './interface/ICompra.interface';
import { useCompras } from './hooks/useCompras';
import { CompraLista } from './Pages/CompraList';
import { AddCompraForm } from './Pages/CompraAdd';
import { CompraEdit } from './Pages/CompraEdit';
import { CompraDetalleForm } from './Pages/CompraDetalleForm';
import { CompraDetalleView } from './Pages/CompraDetalleView';

interface Props {
  getCompra: Promise<ICompra[]>;
  permisos: {
    agregar: boolean;
    editar : boolean;
  };
}

const Compras: FC<Props> = ({ getCompra, permisos }) => {
  const { lista, popupAgregar, popupEditar, popupDetalle, popupVerDetalle } = useCompras(getCompra);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>COMPRA</Typography>
      <Divider sx={{ mb: 2 }} />

      {permisos.agregar && (
        <Button variant="contained" startIcon={<AddIcon />} onClick={popupAgregar.abrir} sx={{ mb: 2 }}>
          Nueva Compra
        </Button>
      )}

      {permisos.agregar && (
        <Dialog open={popupAgregar.visible} onClose={popupAgregar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Nueva Compra</DialogTitle>
          <DialogContent>
            <AddCompraForm onAddCompra={popupAgregar.onGuardar} onCancel={popupAgregar.cerrar} />
          </DialogContent>
        </Dialog>
      )}

      {permisos.editar && (
        <Dialog open={popupEditar.visible} onClose={popupEditar.cerrar} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Compra</DialogTitle>
          <DialogContent>
            {popupEditar.seleccionada && (
              <CompraEdit
                compra={popupEditar.seleccionada}
                onActualizar={popupEditar.onGuardar}
                onCancel={popupEditar.cerrar}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={popupDetalle.visible} onClose={popupDetalle.cerrar} maxWidth="md" fullWidth>
        <DialogTitle>Compras Múltiples</DialogTitle>
        <DialogContent>
          {popupDetalle.seleccionada && (
            <CompraDetalleForm
              compra={popupDetalle.seleccionada}
              onGuardar={popupDetalle.onGuardar}
              onCancel={popupDetalle.cerrar}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={popupVerDetalle.visible} onClose={popupVerDetalle.cerrar} maxWidth="md" fullWidth>
        <DialogTitle>Detalle de Compra</DialogTitle>
        <DialogContent>
          {popupVerDetalle.seleccionada && (
            <CompraDetalleView
              compra={popupVerDetalle.seleccionada}
              onCerrar={popupVerDetalle.cerrar}
            />
          )}
        </DialogContent>
      </Dialog>

      <CompraLista
        compras={lista.compras}
        onEditar={popupEditar.abrir}
        onDetalle={popupDetalle.abrir}
        onVerDetalle={popupVerDetalle.abrir}
        puedeEditar={permisos.editar}
      />
    </>
  );
};

export default Compras;
