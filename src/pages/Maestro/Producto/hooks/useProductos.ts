import { use, useState } from 'react';
import type { IProducto } from '../interface/IProducto.interface';
import { getProductoAll, getProductoPorCodigo } from '../api/getProductos.action';

export const useProductos = (getProducto: Promise<IProducto[]>) => {

    const initialProductos = use(getProducto);
    const [productos, setProductos] = useState<IProducto[]>(initialProductos);

    const recargarLista = async () => {
        const lista = await getProductoAll();
        setProductos(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onProductoAgregado = async (_nuevo: IProducto) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [productoSeleccionado, setProductoSeleccionado] = useState<IProducto | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);
    const [cargandoEditar,     setCargandoEditar]     = useState(false);
    const [errorEditar,        setErrorEditar]        = useState<string | null>(null);

    const onEditar = async (producto: IProducto) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const actualizado = await getProductoPorCodigo(producto.codigo);
            setProductoSeleccionado(actualizado);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar el producto para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onProductoActualizado = async (_actualizado: IProducto) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    return {
        lista: { productos },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onProductoAgregado,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionado: productoSeleccionado,
            onGuardar:    onProductoActualizado,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
    };
};
