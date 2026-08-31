import type { IProveedor } from '../interface/IProveedor.interface';
import { proveedorApi } from './ProveedorApi';

export const getProveedorAll = async (): Promise<IProveedor[]> => {
    try {
        const res = await proveedorApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        throw error;
    }
};

export const getProveedorPorCodigo = async (codigo: string): Promise<IProveedor> => {
    try {
        const res = await proveedorApi.get('/', { params: { codigo } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener el proveedor:', error);
        throw error;
    }
};

export const createProveedorForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<IProveedor> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await proveedorApi.post('/', {
            codigo            : entries.codigo || null,
            descripcion       : entries.descripcion || null,
            comentario        : entries.comentario || null,
            usuarioContactoId : entries.usuarioContactoId || null,
            estado            : queryData.get('estado') === 'true',
            usuarioRegistro   : null,
            ipv4Registro      : null,
            ipv6Registro      : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el proveedor:', error);
        throw error;
    }
};
