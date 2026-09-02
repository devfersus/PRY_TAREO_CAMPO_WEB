import type { ISalida } from '../interface/ISalida.interface';
import { salidaApi } from './SalidaApi';

export const updateSalidaForm = async (
    id        : string,
    _prevState: unknown,
    queryData : FormData
): Promise<ISalida> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado  = queryData.get('estado') === 'true';
    try {
        const response = await salidaApi.put('/', {
            motivo              : entries.motivo || null,
            estado,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la salida:', error);
        throw error;
    }
};
