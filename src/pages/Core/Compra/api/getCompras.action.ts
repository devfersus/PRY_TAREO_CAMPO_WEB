import type { ICompra } from '../interface/ICompra.interface';
import { compraApi } from './CompraApi';

export const getCompraAll = async (): Promise<ICompra[]> => {
    try {
        const res = await compraApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener compras:', error);
        throw error;
    }
};

export const getCompraPorId = async (id: string): Promise<ICompra> => {
    try {
        const res = await compraApi.get('/', { params: { id } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        throw error;
    }
};

export const createCompraForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<ICompra> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await compraApi.post('/', {
            codigoCompra   : entries.codigoCompra    || null,
            codigoProveedor: entries.codigoProveedor || null,
            estado         : true,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la compra:', error);
        throw error;
    }
};
