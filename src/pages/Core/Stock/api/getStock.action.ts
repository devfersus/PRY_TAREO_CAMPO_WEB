import type { IStock } from '../interface/IStock.interface';
import { stockApi } from './StockApi';

export const getStockAll = async (): Promise<IStock[]> => {
    try {
        const res = await stockApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener stock:', error);
        throw error;
    }
};

export const getStockAlertas = async (): Promise<IStock[]> => {
    try {
        const res = await stockApi.get('/alertas');
        return res.data;
    } catch (error) {
        console.error('Error al obtener alertas de stock:', error);
        throw error;
    }
};

export const getStockPorClaves = async (
    codigoProducto: string,
    codigoAlmacen : string
): Promise<IStock> => {
    try {
        const res = await stockApi.get('/', { params: { codigoProducto, codigoAlmacen } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener stock por claves:', error);
        throw error;
    }
};
