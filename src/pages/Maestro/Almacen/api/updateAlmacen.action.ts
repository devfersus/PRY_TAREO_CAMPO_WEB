import type { IAlmacen } from '../interface/IAlmacen.interface';
import { almacenApi } from './AlmacenApi';

export const updateAlmacenForm = async (
    codigo: string,
    _prevState: unknown,
    queryData: FormData
): Promise<IAlmacen> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado  = queryData.get('estado') === 'true';
    try {
        const response = await almacenApi.put('/', {
            descripcion : entries.descripcion || null,
            ubicacion   : entries.ubicacion   || null,
            estado,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        }, { params: { codigo } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el almacén:', error);
        throw error;
    }
};
