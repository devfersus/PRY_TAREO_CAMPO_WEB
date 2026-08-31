import { use, useState } from 'react';
import type { ICompra } from '../interface/ICompra.interface';
import { getCompraAll } from '../api/getCompras.action';

export const useCompras = (getCompra: Promise<ICompra[]>) => {

    const initialCompras = use(getCompra);
    const [compras, setCompras] = useState<ICompra[]>(initialCompras);

    const recargarLista = async () => {
        const lista = await getCompraAll();
        setCompras(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup  = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onCompraAgregada = async (_nueva: ICompra) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [compraSeleccionada, setCompraSeleccionada] = useState<ICompra | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);

    const onEditar = (compra: ICompra) => {
        setCompraSeleccionada(compra);
        setPopupEditarVisible(true);
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onCompraActualizada = async (_actualizada: ICompra) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    // --- Popup detalle masivo ---
    const [compraParaDetalle, setCompraParaDetalle] = useState<ICompra | null>(null);
    const [popupDetalleVisible, setPopupDetalleVisible] = useState(false);

    const onDetalle = (compra: ICompra) => {
        setCompraParaDetalle(compra);
        setPopupDetalleVisible(true);
    };

    const cerrarPopupDetalle = () => setPopupDetalleVisible(false);

    // --- Popup ver detalle (solo lectura) ---
    const [compraParaVer, setCompraParaVer] = useState<ICompra | null>(null);
    const [popupVerVisible, setPopupVerVisible] = useState(false);

    const onVerDetalle = (compra: ICompra) => {
        setCompraParaVer(compra);
        setPopupVerVisible(true);
    };

    const cerrarPopupVer = () => setPopupVerVisible(false);

    return {
        lista: { compras },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onCompraAgregada,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionada: compraSeleccionada,
            onGuardar:    onCompraActualizada,
        },
        popupDetalle: {
            visible:      popupDetalleVisible,
            abrir:        onDetalle,
            cerrar:       cerrarPopupDetalle,
            seleccionada: compraParaDetalle,
            onGuardar:    cerrarPopupDetalle,
        },
        popupVerDetalle: {
            visible:      popupVerVisible,
            abrir:        onVerDetalle,
            cerrar:       cerrarPopupVer,
            seleccionada: compraParaVer,
        },
    };
};
