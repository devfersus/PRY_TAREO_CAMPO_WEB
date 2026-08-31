import { use, useState } from 'react';
import type { IProveedor } from '../interface/IProveedor.interface';
import { getProveedorAll, getProveedorPorCodigo } from '../api/getProveedores.action';

export const useProveedores = (getProveedor: Promise<IProveedor[]>) => {

    const initialProveedores = use(getProveedor);
    const [proveedores, setProveedores] = useState<IProveedor[]>(initialProveedores);

    const recargarLista = async () => {
        const lista = await getProveedorAll();
        setProveedores(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onProveedorAgregado = async (_nuevo: IProveedor) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<IProveedor | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);
    const [cargandoEditar,     setCargandoEditar]     = useState(false);
    const [errorEditar,        setErrorEditar]        = useState<string | null>(null);

    const onEditar = async (proveedor: IProveedor) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const actualizado = await getProveedorPorCodigo(proveedor.codigo);
            setProveedorSeleccionado(actualizado);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar el proveedor para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onProveedorActualizado = async (_actualizado: IProveedor) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    return {
        lista: {
            proveedores,
        },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onProveedorAgregado,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionado: proveedorSeleccionado,
            onGuardar:    onProveedorActualizado,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
    };
};
