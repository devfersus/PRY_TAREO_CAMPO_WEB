import type { ComboItem } from '../../../../shared/components/ComboSearchField';
import { almacenApi } from './AlmacenApi';

export const getAlmacenesCombo = async (search: string): Promise<ComboItem[]> => {
    try {
        const res = await almacenApi.get('/combo', { params: { search } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener combo de almacenes:', error);
        return [];
    }
};
