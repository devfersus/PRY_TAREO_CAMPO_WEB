import { use, useState } from 'react';
import type { IKardex } from '../interface/IKardex.interface';
import { getKardexAll, getKardexPorClaves } from '../api/getKardex.action';

export const useKardex = (getKardex: Promise<IKardex[]>) => {

    const initialKardex = use(getKardex);
    const [kardexItems,    setKardexItems]    = useState<IKardex[]>(initialKardex);
    const [isFiltrado,     setIsFiltrado]     = useState(false);
    const [cargandoFiltro, setCargandoFiltro] = useState(false);
    const [filterKey,      setFilterKey]      = useState(0);

    const filtrar = async (codigoProducto: string, codigoAlmacen: string) => {
        if (!codigoProducto || !codigoAlmacen) return;
        setCargandoFiltro(true);
        try {
            const lista = await getKardexPorClaves(codigoProducto, codigoAlmacen);
            setKardexItems(lista);
            setIsFiltrado(true);
        } catch {
            // mantiene la lista actual si falla
        } finally {
            setCargandoFiltro(false);
        }
    };

    const limpiarFiltro = async () => {
        setCargandoFiltro(true);
        try {
            const lista = await getKardexAll();
            setKardexItems(lista);
            setIsFiltrado(false);
            setFilterKey(k => k + 1);
        } catch {
            // mantiene la lista actual si falla
        } finally {
            setCargandoFiltro(false);
        }
    };

    return {
        lista: { kardexItems },
        filtro: {
            isFiltrado,
            cargando: cargandoFiltro,
            filterKey,
            filtrar,
            limpiarFiltro,
        },
    };
};
