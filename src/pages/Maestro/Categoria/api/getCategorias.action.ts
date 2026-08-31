import type { ICategoria } from '../interface/ICategoria.interface';
import { categoriaApi } from './CategoriaApi';

export const getCategoriaAll = async (): Promise<ICategoria[]> => {
    try {
        const res = await categoriaApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
};

export const getCategoriaPorCodigo = async (codigo: string): Promise<ICategoria> => {
    try {
        const res = await categoriaApi.get('/', { params: { codigo } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        throw error;
    }
};

export const createCategoriaForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<ICategoria> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await categoriaApi.post('/', {
            codigo      : entries.codigo || null,
            descripcion : entries.descripcion || null,
            comentario  : entries.comentario || null,
            estado      : queryData.get('estado') === 'true',
            usuarioRegistro   : null,
            ipv4Registro      : null,
            ipv6Registro      : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;
    }
};
