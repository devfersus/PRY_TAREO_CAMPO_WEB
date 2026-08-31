import { compraApi } from './CompraApi';
import type { ICompraDetalleMasivo } from '../interface/ICompraDetalle.interface';

export const createCompraDetalleMasivo = async (payload: ICompraDetalleMasivo): Promise<void> => {
    try {
        await compraApi.post('/detalle/masivo', payload);
    } catch (error) {
        console.error('Error al registrar detalle masivo:', error);
        throw error;
    }
};
