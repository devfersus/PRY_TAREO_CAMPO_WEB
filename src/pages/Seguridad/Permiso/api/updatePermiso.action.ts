import { permisoApi } from './PermisoApi';

// Actualizar (PUT — 204 sin body)
export const updatePermisoForm = async (
    id: string,
    _prevState: unknown,
    queryData: FormData
): Promise<void> => {
    const { descripcion, activo } = Object.fromEntries(queryData.entries());
    try {
        await permisoApi.put(`/${id}`, { descripcion, activo: activo === 'true' }, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al actualizar el permiso:', error);
        throw error;
    }
};
