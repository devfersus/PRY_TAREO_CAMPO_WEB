import { use, useState } from 'react';
import type { IAlmacen } from '../interface/IAlmacen.interface';
import { getAlmacenAll, getAlmacenPorCodigo } from '../api/getAlmacenes.action';

export const useAlmacenes = (getAlmacen: Promise<IAlmacen[]>) => {

    const initialAlmacenes = use(getAlmacen);
    const [almacenes, setAlmacenes] = useState<IAlmacen[]>(initialAlmacenes);

    const recargarLista = async () => {
        const lista = await getAlmacenAll();
        setAlmacenes(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup  = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onAlmacenAgregado = async (_nuevo: IAlmacen) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [almacenSeleccionado,  setAlmacenSeleccionado]  = useState<IAlmacen | null>(null);
    const [popupEditarVisible,   setPopupEditarVisible]   = useState(false);
    const [cargandoEditar,       setCargandoEditar]       = useState(false);
    const [errorEditar,          setErrorEditar]          = useState<string | null>(null);

    const onEditar = async (almacen: IAlmacen) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const actualizado = await getAlmacenPorCodigo(almacen.codigo);
            setAlmacenSeleccionado(actualizado);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar el almacén para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onAlmacenActualizado = async (_actualizado: IAlmacen) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    return {
        lista: { almacenes },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onAlmacenAgregado,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionado: almacenSeleccionado,
            onGuardar:    onAlmacenActualizado,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
    };
};
