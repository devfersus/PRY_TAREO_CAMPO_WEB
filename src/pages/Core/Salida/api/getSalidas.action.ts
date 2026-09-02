import type { ISalida } from '../interface/ISalida.interface';
import { salidaApi } from './SalidaApi';

export const getSalidaAll = async (): Promise<ISalida[]> => {
    try {
        const res = await salidaApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener salidas:', error);
        throw error;
    }
};

export const getSalidaPorId = async (id: string): Promise<ISalida> => {
    try {
        const res = await salidaApi.get('/', { params: { id } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener la salida:', error);
        throw error;
    }
};

export const createSalidaForm = async (
    _prevState: unknown,
    queryData : FormData
): Promise<ISalida> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await salidaApi.post('/', {
            codigoSalida    : entries.codigoSalida || null,
            motivo          : entries.motivo       || null,
            estado          : queryData.get('estado') === 'true',
            usuarioRegistro : null,
            ipv4Registro    : null,
            ipv6Registro    : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la salida:', error);
        throw error;
    }
};
