import type { ISalidaDetalleListItem } from '../interface/ISalidaDetalle.interface';
import { salidaApi } from './SalidaApi';

export const getSalidaDetallePorSalida = async (
    codigoSalida: string
): Promise<ISalidaDetalleListItem[]> => {
    try {
        const res = await salidaApi.get('/detalle/listar', { params: { codigoSalida } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener detalle de salida:', error);
        throw error;
    }
};
