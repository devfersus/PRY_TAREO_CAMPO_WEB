import type { IProveedor } from '../interface/IProveedor.interface';
import { proveedorApi } from './ProveedorApi';

export const updateProveedorForm = async (
    codigo: string,
    _prevState: unknown,
    queryData: FormData
): Promise<IProveedor> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado = queryData.get('estado') === 'true';
    try {
        const response = await proveedorApi.put('/', {
            descripcion         : entries.descripcion || null,
            comentario          : entries.comentario || null,
            usuarioContactoId   : entries.usuarioContactoId || null,
            estado,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        }, { params: { codigo } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        throw error;
    }
};
