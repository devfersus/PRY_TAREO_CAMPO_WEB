import type { IAjusteDetalleListItem } from '../interface/IAjusteDetalle.interface';
import { ajusteApi } from './AjusteApi';

export const getAjusteDetallePorAjuste = async (
    codigoAjuste: string
): Promise<IAjusteDetalleListItem[]> => {
    try {
        const res = await ajusteApi.get('/detalle/listar', { params: { codigoAjuste } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener detalle de ajuste:', error);
        throw error;
    }
};
