import { createApiInstance } from '../../../../shared/api/tareoApi';
import type { IUsuarioPermiso } from '../interface/IUsuarioPermiso.interface';

const usuarioPermisoApi = createApiInstance('/api/seguridad/usuario-permisos');

export const getUsuarioPermisos = async (usuarioId: string): Promise<IUsuarioPermiso[]> => {
    try {
        const res = await usuarioPermisoApi.get(`/${usuarioId}`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener permisos del usuario:', error);
        throw error;
    }
};

export const asignarPermiso = async (usuarioId: string, permisoId: string): Promise<void> => {
    try {
        await usuarioPermisoApi.post('/', { usuarioId, permisoId });
    } catch (error) {
        console.error('Error al asignar permiso:', error);
        throw error;
    }
};

export const revocarPermiso = async (usuarioId: string, permisoId: string): Promise<void> => {
    try {
        await usuarioPermisoApi.delete('/', { params: { usuarioId, permisoId } });
    } catch (error) {
        console.error('Error al revocar permiso:', error);
        throw error;
    }
};
