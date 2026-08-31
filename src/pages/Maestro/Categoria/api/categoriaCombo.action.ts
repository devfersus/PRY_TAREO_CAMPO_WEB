import type { ComboItem } from '../../../../shared/components/ComboSearchField';
import { categoriaApi } from './CategoriaApi';

export const getCategoriasCombo = async (search: string): Promise<ComboItem[]> => {
    try {
        const res = await categoriaApi.get('/combo', { params: { search } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener combo de categorías:', error);
        return [];
    }
};
