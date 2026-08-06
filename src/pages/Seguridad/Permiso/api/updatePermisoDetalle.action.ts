import { permisoApi } from './PermisoApi';

export interface UpdateDetalleItem {
    permisoId   : string;
    moduloId    : string;
    subModuloId : string;
    accionId    : string;
    activo      : boolean;
}

export const updatePermisoDetalles = async (detalles: UpdateDetalleItem[]): Promise<void> => {
    try {
        await permisoApi.put('/detalles', detalles, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al actualizar detalles de permiso:', error);
        throw error;
    }
};
