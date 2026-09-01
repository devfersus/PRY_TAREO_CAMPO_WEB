import type { IUnidadMedida } from '../interface/IUnidadMedida.interface';
import { unidadMedidaApi } from './UnidadMedidaApi';

export const updateUnidadMedidaForm = async (
    codigo: string,
    _prevState: unknown,
    queryData: FormData
): Promise<IUnidadMedida> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado  = queryData.get('estado') === 'true';
    try {
        const response = await unidadMedidaApi.put('/', {
            descripcion : entries.descripcion || null,
            abreviatura : entries.abreviatura || null,
            estado,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        }, { params: { codigo } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la unidad de medida:', error);
        throw error;
    }
};
