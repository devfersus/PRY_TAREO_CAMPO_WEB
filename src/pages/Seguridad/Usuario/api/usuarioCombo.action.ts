import type { ComboItem } from '../../../../shared/components/ComboSearchField';
import { usuarioApi } from './UsuarioApi';

interface UsuarioComboRaw {
    codigo         : string;
    nombre         : string;
    apellidoPaterno: string;
    apellidoMaterno: string;
}

export const getUsuariosCombo = async (search: string): Promise<ComboItem[]> => {
    try {
        const res = await usuarioApi.get('/combo', { params: { search } });
        return (res.data as UsuarioComboRaw[]).map((u) => ({
            codigo     : u.codigo,
            descripcion: `${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno}`.trim(),
        }));
    } catch (error) {
        console.error('Error al obtener combo de usuarios:', error);
        return [];
    }
};

interface UsuarioListarRaw {
    id              : string;
    nombre          : string;
    apellidoPaterno : string;
    apellidoMaterno : string;
}

// Combo que devuelve el GUID como código (para asignación de permisos)
export const getUsuariosComboConId = async (): Promise<ComboItem[]> => {
    try {
        const res = await usuarioApi.get('/');
        return (res.data as UsuarioListarRaw[]).map((u) => ({
            codigo     : u.id,
            descripcion: `${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno}`.trim(),
        }));
    } catch (error) {
        console.error('Error al obtener combo de usuarios:', error);
        return [];
    }
};
