import type { IPermisoDetalle } from '../interface/IPermiso.interface';
import { permisoApi } from './PermisoApi';

export const getPermisoDetalles = async (permisoId: string): Promise<IPermisoDetalle[]> => {
    try {
        const res = await permisoApi.get(`/${permisoId}/detalles`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener los detalles del permiso:', error);
        throw error;
    }
};
