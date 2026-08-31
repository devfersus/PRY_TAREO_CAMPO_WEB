import type { ICompra } from '../interface/ICompra.interface';
import { compraApi } from './CompraApi';

export const updateCompraForm = async (
    id: string,
    _prevState: unknown,
    queryData: FormData
): Promise<ICompra> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado  = queryData.get('estado') === 'true';
    try {
        const response = await compraApi.put('/', {
            codigoProveedor: entries.codigoProveedor || null,
            estado,
        }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la compra:', error);
        throw error;
    }
};
