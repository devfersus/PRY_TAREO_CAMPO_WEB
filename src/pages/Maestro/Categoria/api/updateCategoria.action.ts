import type { ICategoria } from '../interface/ICategoria.interface';
import { categoriaApi } from './CategoriaApi';

export const updateCategoriaForm = async (
    codigo: string,
    _prevState: unknown,
    queryData: FormData
): Promise<ICategoria> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado = queryData.get('estado') === 'true';
    try {
        const response = await categoriaApi.put('/', {
            descripcion : entries.descripcion || null,
            comentario  : entries.comentario || null,
            estado,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        }, { params: { codigo } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        throw error;
    }
};
