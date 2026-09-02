import type { IStock } from '../interface/IStock.interface';
import { stockApi } from './StockApi';

export const updateStockForm = async (
    codigoProducto: string,
    codigoAlmacen : string,
    _prevState    : unknown,
    queryData     : FormData
): Promise<IStock> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await stockApi.put('/', {
            stockMinimo: parseFloat(entries.stockMinimo as string) || 0,
            stockMaximo: parseFloat(entries.stockMaximo as string) || 0,
        }, { params: { codigoProducto, codigoAlmacen } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        throw error;
    }
};
