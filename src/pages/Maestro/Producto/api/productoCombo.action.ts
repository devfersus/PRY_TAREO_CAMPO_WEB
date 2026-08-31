import type { ComboItem } from '../../../../shared/components/ComboSearchField';
import { productoApi } from './ProductoApi';

export const getProductosCombo = async (search: string): Promise<ComboItem[]> => {
    try {
        const res = await productoApi.get('/combo', { params: { search } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener combo de productos:', error);
        return [];
    }
};
