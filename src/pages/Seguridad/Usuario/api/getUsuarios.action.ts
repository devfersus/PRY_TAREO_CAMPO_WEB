import type { IUsuario } from '../interface/IUsuario.interface';
import { usuarioApi } from './UsuarioApi';

export const getUsuarioAll = async (): Promise<IUsuario[]> => {
    try {
        const res = await usuarioApi.get('/');
        return res.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

export const getUsuarioPorId = async (id: string): Promise<IUsuario> => {
    try {
        const res = await usuarioApi.get('/detalle', { params: { id } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};

export const createUsuarioForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<IUsuario> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await usuarioApi.post('/', {
            codigo         : entries.codigo,
            nombre         : entries.nombre,
            apellidoPaterno: entries.apellidoPaterno,
            apellidoMaterno: entries.apellidoMaterno,
            email          : entries.email,
            contraseña     : entries.contraseña,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};
