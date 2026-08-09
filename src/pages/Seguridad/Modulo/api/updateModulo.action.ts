import type { IModulo } from "../interface/IModulo.interface";
import { moduloApi } from "./ModuloApi";

export const updateModuloForm = async (
    id: number,
    _prevState: unknown,
    queryData: FormData
): Promise<IModulo> => {
    const { descripcion } = Object.fromEntries(queryData.entries());
    const activo = queryData.get('activo') === 'true';
    try {
        const response = await moduloApi.put('/', { descripcion, activo }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el módulo:", error);
        throw error;
    }
};
