import type { ComboItem } from '../../../../shared/components/ComboSearchField';
import { proveedorApi } from './ProveedorApi';

export const getProveedoresCombo = async (search: string): Promise<ComboItem[]> => {
    try {
        const res = await proveedorApi.get('/combo', { params: { search } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener combo de proveedores:', error);
        return [];
    }
};
