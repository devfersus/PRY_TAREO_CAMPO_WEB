import { createApiInstance } from './tareoApi';

const misPermisosApi = createApiInstance('/api/seguridad');

export const getMisPermisos = async (): Promise<string[]> => {
    try {
        const res = await misPermisosApi.get('/mis-permisos');
        return res.data;
    } catch (error) {
        console.error('Error al obtener permisos del usuario autenticado:', error);
        return [];
    }
};
