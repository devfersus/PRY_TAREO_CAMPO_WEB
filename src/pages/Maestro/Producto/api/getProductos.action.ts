import type { IProducto } from '../interface/IProducto.interface';
import { productoApi } from './ProductoApi';

export const getProductoAll = async (): Promise<IProducto[]> => {
    try {
        const res = await productoApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const getProductoPorCodigo = async (codigo: string): Promise<IProducto> => {
    try {
        const res = await productoApi.get('/', { params: { codigo } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error;
    }
};

export const createProductoForm = async (
    _prevState: unknown,
    queryData: FormData
): Promise<IProducto> => {
    const entries = Object.fromEntries(queryData.entries());
    try {
        const response = await productoApi.post('/', {
            codigo            : entries.codigo || null,
            idCategoria       : entries.idCategoria || null,
            idProveedor       : entries.idProveedor || null,
            precio            : parseFloat(entries.precio as string) || 0,
            descripcion       : entries.descripcion || null,
            comentario : entries.comentario || null,
            estado     : queryData.get('estado') === 'true',
            usuarioRegistro   : null,
            ipv4Registro      : null,
            ipv6Registro      : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
};
