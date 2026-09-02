import type { IKardex } from '../interface/IKardex.interface';
import { kardexApi } from './KardexApi';

export const getKardexAll = async (): Promise<IKardex[]> => {
    try {
        const res = await kardexApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error('Error al obtener kardex:', error);
        throw error;
    }
};

export const getKardexPorClaves = async (
    codigoProducto: string,
    codigoAlmacen : string
): Promise<IKardex[]> => {
    try {
        const res = await kardexApi.get('/', { params: { codigoProducto, codigoAlmacen } });
        return res.data;
    } catch (error) {
        console.error('Error al filtrar kardex:', error);
        throw error;
    }
};
