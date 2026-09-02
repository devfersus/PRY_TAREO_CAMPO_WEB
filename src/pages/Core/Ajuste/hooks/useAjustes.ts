import { use, useState } from 'react';
import type { IAjuste } from '../interface/IAjuste.interface';
import { getAjusteAll } from '../api/getAjustes.action';

export const useAjustes = (getAjuste: Promise<IAjuste[]>) => {

    const initialAjustes = use(getAjuste);
    const [ajustes, setAjustes] = useState<IAjuste[]>(initialAjustes);

    const recargarLista = async () => {
        const lista = await getAjusteAll();
        setAjustes(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup  = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onAjusteAgregado = async (_nuevo: IAjuste) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [ajusteSeleccionado, setAjusteSeleccionado] = useState<IAjuste | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);

    const onEditar = (ajuste: IAjuste) => {
        setAjusteSeleccionado(ajuste);
        setPopupEditarVisible(true);
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onAjusteActualizado = async (_actualizado: IAjuste) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    // --- Popup detalle masivo ---
    const [ajusteParaDetalle, setAjusteParaDetalle] = useState<IAjuste | null>(null);
    const [popupDetalleVisible, setPopupDetalleVisible] = useState(false);

    const onDetalle = (ajuste: IAjuste) => {
        setAjusteParaDetalle(ajuste);
        setPopupDetalleVisible(true);
    };

    const cerrarPopupDetalle = () => setPopupDetalleVisible(false);

    // --- Popup ver detalle (solo lectura) ---
    const [ajusteParaVer, setAjusteParaVer] = useState<IAjuste | null>(null);
    const [popupVerVisible, setPopupVerVisible] = useState(false);

    const onVerDetalle = (ajuste: IAjuste) => {
        setAjusteParaVer(ajuste);
        setPopupVerVisible(true);
    };

    const cerrarPopupVer = () => setPopupVerVisible(false);

    return {
        lista: { ajustes },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onAjusteAgregado,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionado: ajusteSeleccionado,
            onGuardar:    onAjusteActualizado,
        },
        popupDetalle: {
            visible:      popupDetalleVisible,
            abrir:        onDetalle,
            cerrar:       cerrarPopupDetalle,
            seleccionado: ajusteParaDetalle,
            onGuardar:    cerrarPopupDetalle,
        },
        popupVerDetalle: {
            visible:      popupVerVisible,
            abrir:        onVerDetalle,
            cerrar:       cerrarPopupVer,
            seleccionado: ajusteParaVer,
        },
    };
};
