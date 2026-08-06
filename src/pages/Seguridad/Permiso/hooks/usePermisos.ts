import { use, useState } from 'react';
import type { IPermiso } from '../interface/IPermiso.interface';
import { getPermisoAll, getPermisoPorId } from '../api/getPermisos.action';
import { deletePermiso } from '../api/deletePermiso.action';

export const usePermisos = (getPermiso: Promise<IPermiso[]>) => {
    const initialPermisos = use(getPermiso);
    const [permisos, setPermisos] = useState<IPermiso[]>(initialPermisos);

    const recargarLista = async () => {
        const lista = await getPermisoAll();
        setPermisos(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onPermisoAgregado = async () => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [permisoSeleccionado, setPermisoSeleccionado] = useState<IPermiso | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);

    const onEditar = async (permiso: IPermiso) => {
        const permisoActualizado = await getPermisoPorId(permiso.id);
        setPermisoSeleccionado(permisoActualizado);
        setPopupEditarVisible(true);
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onPermisoActualizado = async () => {
        await recargarLista();
        cerrarPopupEditar();
    };

    // --- Eliminar ---
    const onEliminar = async (id: string) => {
        await deletePermiso(id);
        await recargarLista();
    };

    // --- Selección de fila ---
    const [filaSeleccionada, setFilaSeleccionada] = useState<IPermiso | null>(null);

    const seleccionarFila = (permiso: IPermiso) => {
        setFilaSeleccionada((prev) => (prev?.id === permiso.id ? null : permiso));
    };

    // --- Popup detalle ---
    const [permisoDetalle, setPermisoDetalle] = useState<IPermiso | null>(null);
    const [popupDetalleVisible, setPopupDetalleVisible] = useState(false);

    const abrirDetalle = () => {
        if (!filaSeleccionada) return;
        setPermisoDetalle(filaSeleccionada);
        setPopupDetalleVisible(true);
    };

    const cerrarDetalle = () => setPopupDetalleVisible(false);

    const onDetalleGuardado = () => cerrarDetalle();

    // --- Popup editar detalle ---
    const [permisoDetalleEditar, setPermisoDetalleEditar] = useState<IPermiso | null>(null);
    const [popupDetalleEditarVisible, setPopupDetalleEditarVisible] = useState(false);

    const abrirDetalleEditar = () => {
        if (!filaSeleccionada) return;
        setPermisoDetalleEditar(filaSeleccionada);
        setPopupDetalleEditarVisible(true);
    };

    const cerrarDetalleEditar = () => setPopupDetalleEditarVisible(false);

    return {
        lista: {
            permisos,
            filaSeleccionada,
            seleccionarFila,
        },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onPermisoAgregado,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionado: permisoSeleccionado,
            onGuardar:    onPermisoActualizado,
        },
        popupDetalle: {
            visible:         popupDetalleVisible,
            abrir:           abrirDetalle,
            cerrar:          cerrarDetalle,
            seleccionado:    permisoDetalle,
            onGuardar:       onDetalleGuardado,
            haySeleccionada: filaSeleccionada !== null,
        },
        popupDetalleEditar: {
            visible:         popupDetalleEditarVisible,
            abrir:           abrirDetalleEditar,
            cerrar:          cerrarDetalleEditar,
            seleccionado:    permisoDetalleEditar,
            haySeleccionada: filaSeleccionada !== null,
        },
        onEliminar,
    };
};
