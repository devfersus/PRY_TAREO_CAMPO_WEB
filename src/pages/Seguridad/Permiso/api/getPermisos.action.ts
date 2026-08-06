import type { IPermiso, IPermisoAccion, IPermisoModulo, IPermisoSubmodulo } from '../interface/IPermiso.interface';
import { permisoApi } from './PermisoApi';

// Listar todos
export const getPermisoAll = async (): Promise<IPermiso[]> => {
    try {
        const res = await permisoApi.get('/');
        return res.data;
    } catch (error) {
        console.error('Error al obtener los permisos:', error);
        throw error;
    }
};

// Obtener por ID
export const getPermisoPorId = async (id: string): Promise<IPermiso> => {
    try {
        const res = await permisoApi.get(`/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener el permiso:', error);
        throw error;
    }
};

// Registrar (POST — el id lo genera el backend, 201 sin body)
export const createPermisoForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<void> => {
    const { descripcion } = Object.fromEntries(queryData.entries());
    try {
        await permisoApi.post('/', { descripcion }, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al crear el permiso:', error);
        throw error;
    }
};

// --- Shared (datos para combos) ---

export const getPermisoModulos = async (): Promise<IPermisoModulo[]> => {
    try {
        const res = await permisoApi.get('/shared/modulos');
        return res.data;
    } catch (error) {
        console.error('Error al obtener módulos:', error);
        throw error;
    }
};

export const getPermisoSubmodulos = async (): Promise<IPermisoSubmodulo[]> => {
    try {
        const res = await permisoApi.get('/shared/submodulos');
        return res.data;
    } catch (error) {
        console.error('Error al obtener submódulos:', error);
        throw error;
    }
};

export const getPermisoAcciones = async (): Promise<IPermisoAccion[]> => {
    try {
        const res = await permisoApi.get('/shared/acciones');
        return res.data;
    } catch (error) {
        console.error('Error al obtener acciones:', error);
        throw error;
    }
};
