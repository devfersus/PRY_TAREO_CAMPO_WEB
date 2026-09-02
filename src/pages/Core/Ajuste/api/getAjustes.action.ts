import type { IAjuste } from '../interface/IAjuste.interface';
import { ajusteApi } from './AjusteApi';

export const getAjusteAll = async (): Promise<IAjuste[]> => {
    try {
        const res = await ajusteApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener ajustes:', error);
        throw error;
    }
};

export const getAjustePorId = async (id: string): Promise<IAjuste> => {
    try {
        const res = await ajusteApi.get('/', { params: { id } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener el ajuste:', error);
        throw error;
    }
};

export const createAjusteForm = async (
    _prevState: unknown,
    queryData : FormData
): Promise<IAjuste> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await ajusteApi.post('/', {
            codigoAjuste    : entries.codigoAjuste || null,
            motivo          : entries.motivo       || null,
            estado          : queryData.get('estado') === 'true',
            usuarioRegistro : null,
            ipv4Registro    : null,
            ipv6Registro    : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el ajuste:', error);
        throw error;
    }
};
