import type { IAjuste } from '../interface/IAjuste.interface';
import { ajusteApi } from './AjusteApi';

export const updateAjusteForm = async (
    id        : string,
    _prevState: unknown,
    queryData : FormData
): Promise<IAjuste> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado  = queryData.get('estado') === 'true';
    try {
        const response = await ajusteApi.put('/', {
            motivo              : entries.motivo || null,
            estado,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el ajuste:', error);
        throw error;
    }
};
