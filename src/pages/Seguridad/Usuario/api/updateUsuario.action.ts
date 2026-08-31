import type { IUsuario } from '../interface/IUsuario.interface';
import { usuarioApi } from './UsuarioApi';

export const updateUsuarioForm = async (
    id: string,
    _prevState: unknown,
    queryData: FormData
): Promise<IUsuario> => {
    const entries = Object.fromEntries(queryData.entries());
    const activo  = queryData.get('activo') === 'true';
    try {
        const response = await usuarioApi.put('/', {
            codigo         : entries.codigo,
            nombre         : entries.nombre,
            apellidoPaterno: entries.apellidoPaterno,
            apellidoMaterno: entries.apellidoMaterno,
            email          : entries.email,
            contraseña     : entries.contraseña || undefined,
            activo,
        }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};
