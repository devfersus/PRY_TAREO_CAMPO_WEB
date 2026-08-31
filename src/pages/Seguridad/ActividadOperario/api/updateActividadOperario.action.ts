import type { IActividadOperario } from '../interface/IActividadOperario.interface';
import { actividadOperarioApi } from './ActividadOperarioApi';

export const updateActividadOperarioForm = async (
    id: string,
    _prevState: unknown,
    queryData: FormData
): Promise<IActividadOperario> => {
    const { descripcion } = Object.fromEntries(queryData.entries());
    const activo = queryData.get('activo') === 'true';
    try {
        const response = await actividadOperarioApi.put(`/${id}`, {
            descripcion,
            activo,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la actividad de operario:', error);
        throw error;
    }
};
