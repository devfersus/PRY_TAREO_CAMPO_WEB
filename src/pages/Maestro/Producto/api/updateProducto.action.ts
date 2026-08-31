import type { IProducto } from '../interface/IProducto.interface';
import { productoApi } from './ProductoApi';

export const updateProductoForm = async (
    codigo: string,
    _prevState: unknown,
    queryData: FormData
): Promise<IProducto> => {
    const entries = Object.fromEntries(queryData.entries());
    const estado = queryData.get('estado') === 'true';
    try {
        const response = await productoApi.put('/', {
            idCategoria         : entries.idCategoria || null,
            idProveedor         : entries.idProveedor || null,
            precio              : parseFloat(entries.precio as string) || 0,
            descripcion         : entries.descripcion || null,
            comentario : entries.comentario || null,
            estado,
            usuarioModificacion : null,
            ipv4Modificacion    : null,
            ipv6Modificacion    : null,
        }, { params: { codigo } });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
};
