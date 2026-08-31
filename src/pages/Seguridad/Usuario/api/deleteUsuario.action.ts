import { usuarioApi } from './UsuarioApi';

export const deleteUsuario = async (id: string): Promise<void> => {
    try {
        await usuarioApi.delete('/', { params: { id } });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};
