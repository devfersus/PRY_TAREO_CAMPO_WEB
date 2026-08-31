import { use, useState } from 'react';
import type { IActividadOperario } from '../interface/IActividadOperario.interface';
import { getActividadOperarioAll, getActividadOperarioPorId } from '../api/getActividadesOperario.action';
import { deleteActividadOperario } from '../api/deleteActividadOperario.action';

export const useActividadesOperario = (getActividad: Promise<IActividadOperario[]>) => {

    const initialActividades = use(getActividad);
    const [actividades, setActividades] = useState<IActividadOperario[]>(initialActividades);

    const recargarLista = async () => {
        const lista = await getActividadOperarioAll();
        setActividades(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onActividadAgregada = async (_nueva: IActividadOperario) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [actividadSeleccionada, setActividadSeleccionada] = useState<IActividadOperario | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);
    const [cargandoEditar,     setCargandoEditar]     = useState(false);
    const [errorEditar,        setErrorEditar]        = useState<string | null>(null);

    const onEditar = async (actividad: IActividadOperario) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const actualizada = await getActividadOperarioPorId(actividad.id);
            setActividadSeleccionada(actualizada);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar la actividad para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onActividadActualizada = async (_actualizada: IActividadOperario) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    // --- Eliminar ---
    const onEliminar = async (id: string) => {
        await deleteActividadOperario(id);
        await recargarLista();
    };

    return {
        lista: {
            actividades,
        },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onActividadAgregada,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionada: actividadSeleccionada,
            onGuardar:    onActividadActualizada,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
        onEliminar,
    };
};
