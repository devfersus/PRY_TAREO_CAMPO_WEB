import { compraApi } from './CompraApi';
import type { ICompraDetalleListItem } from '../interface/ICompraDetalle.interface';

export const getCompraDetallePorCompra = async (
    codigoCompra   : string,
    codigoProveedor: string
): Promise<ICompraDetalleListItem[]> => {
    try {
        const res = await compraApi.get('/detalle/listar', { params: { codigoCompra, codigoProveedor } });
        return res.data;
    } catch (error) {
        console.error('Error al obtener detalles de compra:', error);
        throw error;
    }
};
