import type { IPermisoDetalleRequest } from '../interface/IPermiso.interface';
import { permisoApi } from './PermisoApi';

export const createPermisoDetalle = async (data: IPermisoDetalleRequest): Promise<void> => {
    try {
        await permisoApi.post('/detalles', data, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al guardar el detalle de permiso:', error);
        throw error;
    }
};
