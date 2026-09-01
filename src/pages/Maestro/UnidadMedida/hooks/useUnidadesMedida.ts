import { use, useState } from 'react';
import type { IUnidadMedida } from '../interface/IUnidadMedida.interface';
import { getUnidadMedidaAll, getUnidadMedidaPorCodigo } from '../api/getUnidadesMedida.action';

export const useUnidadesMedida = (getUnidadMedida: Promise<IUnidadMedida[]>) => {

    const initialUnidades = use(getUnidadMedida);
    const [unidades, setUnidades] = useState<IUnidadMedida[]>(initialUnidades);

    const recargarLista = async () => {
        const lista = await getUnidadMedidaAll();
        setUnidades(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup  = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onUnidadAgregada = async (_nueva: IUnidadMedida) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [unidadSeleccionada,    setUnidadSeleccionada]    = useState<IUnidadMedida | null>(null);
    const [popupEditarVisible,    setPopupEditarVisible]    = useState(false);
    const [cargandoEditar,        setCargandoEditar]        = useState(false);
    const [errorEditar,           setErrorEditar]           = useState<string | null>(null);

    const onEditar = async (unidad: IUnidadMedida) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const actualizada = await getUnidadMedidaPorCodigo(unidad.codigo);
            setUnidadSeleccionada(actualizada);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar la unidad de medida para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onUnidadActualizada = async (_actualizada: IUnidadMedida) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    return {
        lista: { unidades },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onUnidadAgregada,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionada: unidadSeleccionada,
            onGuardar:    onUnidadActualizada,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
    };
};
