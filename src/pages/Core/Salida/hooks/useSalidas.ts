import { use, useState } from 'react';
import type { ISalida } from '../interface/ISalida.interface';
import { getSalidaAll } from '../api/getSalidas.action';

export const useSalidas = (getSalida: Promise<ISalida[]>) => {

    const initialSalidas = use(getSalida);
    const [salidas, setSalidas] = useState<ISalida[]>(initialSalidas);

    const recargarLista = async () => {
        const lista = await getSalidaAll();
        setSalidas(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup  = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onSalidaAgregada = async (_nueva: ISalida) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [salidaSeleccionada, setSalidaSeleccionada] = useState<ISalida | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);

    const onEditar = (salida: ISalida) => {
        setSalidaSeleccionada(salida);
        setPopupEditarVisible(true);
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onSalidaActualizada = async (_actualizada: ISalida) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    // --- Popup detalle masivo ---
    const [salidaParaDetalle, setSalidaParaDetalle] = useState<ISalida | null>(null);
    const [popupDetalleVisible, setPopupDetalleVisible] = useState(false);

    const onDetalle = (salida: ISalida) => {
        setSalidaParaDetalle(salida);
        setPopupDetalleVisible(true);
    };

    const cerrarPopupDetalle = () => setPopupDetalleVisible(false);

    // --- Popup ver detalle (solo lectura) ---
    const [salidaParaVer, setSalidaParaVer] = useState<ISalida | null>(null);
    const [popupVerVisible, setPopupVerVisible] = useState(false);

    const onVerDetalle = (salida: ISalida) => {
        setSalidaParaVer(salida);
        setPopupVerVisible(true);
    };

    const cerrarPopupVer = () => setPopupVerVisible(false);

    return {
        lista: { salidas },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onSalidaAgregada,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionada: salidaSeleccionada,
            onGuardar:    onSalidaActualizada,
        },
        popupDetalle: {
            visible:      popupDetalleVisible,
            abrir:        onDetalle,
            cerrar:       cerrarPopupDetalle,
            seleccionada: salidaParaDetalle,
            onGuardar:    cerrarPopupDetalle,
        },
        popupVerDetalle: {
            visible:      popupVerVisible,
            abrir:        onVerDetalle,
            cerrar:       cerrarPopupVer,
            seleccionada: salidaParaVer,
        },
    };
};
