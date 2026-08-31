import { actividadOperarioApi } from './ActividadOperarioApi';

export const deleteActividadOperario = async (id: string): Promise<void> => {
    try {
        await actividadOperarioApi.delete(`/${id}`, {
            data: {
                usuarioModificacion : null,
                ipv4Modificacion    : null,
                ipv6Modificacion    : null,
            },
        });
    } catch (error) {
        console.error('Error al eliminar la actividad de operario:', error);
        throw error;
    }
};
