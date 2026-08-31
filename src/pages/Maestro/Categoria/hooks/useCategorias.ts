import { use, useState } from 'react';
import type { ICategoria } from '../interface/ICategoria.interface';
import { getCategoriaAll, getCategoriaPorCodigo } from '../api/getCategorias.action';

export const useCategorias = (getCategoria: Promise<ICategoria[]>) => {

    const initialCategorias = use(getCategoria);
    const [categorias, setCategorias] = useState<ICategoria[]>(initialCategorias);

    const recargarLista = async () => {
        const lista = await getCategoriaAll();
        setCategorias(lista);
    };

    // --- Popup agregar ---
    const [popupVisible, setPopupVisible] = useState(false);
    const abrirPopup = () => setPopupVisible(true);
    const cerrarPopup = () => setPopupVisible(false);

    const onCategoriaAgregada = async (_nueva: ICategoria) => {
        await recargarLista();
        cerrarPopup();
    };

    // --- Popup editar ---
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<ICategoria | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);
    const [cargandoEditar,     setCargandoEditar]     = useState(false);
    const [errorEditar,        setErrorEditar]        = useState<string | null>(null);

    const onEditar = async (categoria: ICategoria) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const actualizada = await getCategoriaPorCodigo(categoria.codigo);
            setCategoriaSeleccionada(actualizada);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar la categoría para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onCategoriaActualizada = async (_actualizada: ICategoria) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    return {
        lista: { categorias },
        popupAgregar: {
            visible:   popupVisible,
            abrir:     abrirPopup,
            cerrar:    cerrarPopup,
            onGuardar: onCategoriaAgregada,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionada: categoriaSeleccionada,
            onGuardar:    onCategoriaActualizada,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
    };
};
