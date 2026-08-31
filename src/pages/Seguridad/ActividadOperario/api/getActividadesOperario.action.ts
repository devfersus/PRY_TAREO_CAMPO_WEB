import type { IActividadOperario } from '../interface/IActividadOperario.interface';
import { actividadOperarioApi } from './ActividadOperarioApi';

export const getActividadOperarioAll = async (): Promise<IActividadOperario[]> => {
    try {
        const res = await actividadOperarioApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener actividades de operario:', error);
        throw error;
    }
};

export const getActividadOperarioPorId = async (id: string): Promise<IActividadOperario> => {
    try {
        const res = await actividadOperarioApi.get(`/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error al obtener la actividad de operario:', error);
        throw error;
    }
};

export const createActividadOperarioForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<IActividadOperario> => {
    const { descripcion } = Object.fromEntries(queryData.entries());
    try {
        const response = await actividadOperarioApi.post('/', {
            descripcion,
            usuarioRegistro  : null,
            ipv4Registro     : null,
            ipv6Registro     : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la actividad de operario:', error);
        throw error;
    }
};
