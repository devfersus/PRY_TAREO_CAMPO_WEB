import type { ISalidaDetalleMasivo } from '../interface/ISalidaDetalle.interface';
import { salidaApi } from './SalidaApi';

export const createSalidaDetalleMasivo = async (payload: ISalidaDetalleMasivo): Promise<void> => {
    try {
        await salidaApi.post('/detalle/masivo', payload);
    } catch (error) {
        console.error('Error al registrar detalle masivo de salida:', error);
        throw error;
    }
};
