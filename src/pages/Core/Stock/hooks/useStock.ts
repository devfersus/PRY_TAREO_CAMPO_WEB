import { use, useState } from 'react';
import type { IStock } from '../interface/IStock.interface';
import { getStockAll, getStockAlertas, getStockPorClaves } from '../api/getStock.action';

export const useStock = (getStock: Promise<IStock[]>) => {

    const initialStock = use(getStock);
    const [stocks,          setStocks]          = useState<IStock[]>(initialStock);
    const [modoAlertas,     setModoAlertas]     = useState(false);
    const [cargandoToggle,  setCargandoToggle]  = useState(false);

    const recargarLista = async () => {
        const lista = modoAlertas
            ? await getStockAlertas()
            : await getStockAll();
        setStocks(lista);
    };

    const toggleAlertas = async () => {
        setCargandoToggle(true);
        try {
            const lista = modoAlertas
                ? await getStockAll()
                : await getStockAlertas();
            setStocks(lista);
            setModoAlertas(prev => !prev);
        } catch {
            // mantiene la lista actual si falla
        } finally {
            setCargandoToggle(false);
        }
    };

    // --- Popup editar ---
    const [stockSeleccionado,  setStockSeleccionado]  = useState<IStock | null>(null);
    const [popupEditarVisible, setPopupEditarVisible] = useState(false);
    const [cargandoEditar,     setCargandoEditar]     = useState(false);
    const [errorEditar,        setErrorEditar]        = useState<string | null>(null);

    const onEditar = async (stock: IStock) => {
        setCargandoEditar(true);
        setErrorEditar(null);
        try {
            const fresco = await getStockPorClaves(stock.codigoProducto, stock.codigoAlmacen);
            setStockSeleccionado(fresco);
            setPopupEditarVisible(true);
        } catch {
            setErrorEditar('No se pudo cargar el stock para editar.');
        } finally {
            setCargandoEditar(false);
        }
    };

    const cerrarPopupEditar = () => setPopupEditarVisible(false);

    const onStockActualizado = async (_actualizado: IStock) => {
        await recargarLista();
        cerrarPopupEditar();
    };

    return {
        lista: { stocks },
        toggle: {
            modoAlertas,
            cargando:       cargandoToggle,
            toggleAlertas,
        },
        popupEditar: {
            visible:      popupEditarVisible,
            abrir:        onEditar,
            cerrar:       cerrarPopupEditar,
            seleccionado: stockSeleccionado,
            onGuardar:    onStockActualizado,
            cargando:     cargandoEditar,
            error:        errorEditar,
            cerrarError:  () => setErrorEditar(null),
        },
    };
};
