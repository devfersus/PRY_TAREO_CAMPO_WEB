import { permisoApi } from './PermisoApi';

// Eliminar baja lógica (DELETE — 204 sin body)
export const deletePermiso = async (id: string): Promise<void> => {
    try {
        await permisoApi.delete(`/${id}`);
    } catch (error) {
        console.error('Error al eliminar el permiso:', error);
        throw error;
    }
};
