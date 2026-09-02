import type { IAjusteDetalleMasivo } from '../interface/IAjusteDetalle.interface';
import { ajusteApi } from './AjusteApi';

export const createAjusteDetalleMasivo = async (payload: IAjusteDetalleMasivo): Promise<void> => {
    try {
        await ajusteApi.post('/detalle/masivo', payload);
    } catch (error) {
        console.error('Error al registrar detalle masivo de ajuste:', error);
        throw error;
    }
};
