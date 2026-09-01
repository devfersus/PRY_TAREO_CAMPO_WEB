import type { IUnidadMedida } from '../interface/IUnidadMedida.interface';
import { unidadMedidaApi } from './UnidadMedidaApi';

export const getUnidadMedidaAll = async (): Promise<IUnidadMedida[]> => {
    try {
        const res = await unidadMedidaApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener unidades de medida:', error);
        throw error;
    }
};

export const getUnidadMedidaPorCodigo = async (codigo: string): Promise<IUnidadMedida> => {
    try {
        const res = await unidadMedidaApi.get('/', { params: { codigo } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener la unidad de medida:', error);
        throw error;
    }
};

export const createUnidadMedidaForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<IUnidadMedida> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await unidadMedidaApi.post('/', {
            codigo      : entries.codigo      || null,
            descripcion : entries.descripcion || null,
            abreviatura : entries.abreviatura || null,
            estado      : queryData.get('estado') === 'true',
            usuarioRegistro : null,
            ipv4Registro    : null,
            ipv6Registro    : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la unidad de medida:', error);
        throw error;
    }
};
