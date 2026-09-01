import type { IAlmacen } from '../interface/IAlmacen.interface';
import { almacenApi } from './AlmacenApi';

export const getAlmacenAll = async (): Promise<IAlmacen[]> => {
    try {
        const res = await almacenApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener almacenes:', error);
        throw error;
    }
};

export const getAlmacenPorCodigo = async (codigo: string): Promise<IAlmacen> => {
    try {
        const res = await almacenApi.get('/', { params: { codigo } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener el almacén:', error);
        throw error;
    }
};

export const createAlmacenForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<IAlmacen> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await almacenApi.post('/', {
            codigo      : entries.codigo      || null,
            descripcion : entries.descripcion || null,
            ubicacion   : entries.ubicacion   || null,
            estado      : queryData.get('estado') === 'true',
            usuarioRegistro : null,
            ipv4Registro    : null,
            ipv6Registro    : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el almacén:', error);
        throw error;
    }
};
