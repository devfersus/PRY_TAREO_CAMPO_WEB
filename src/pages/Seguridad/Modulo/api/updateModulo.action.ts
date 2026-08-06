import type { IModulo } from "../interface/IModulo.interface";
import { moduloApi } from "./ModuloApi";

export const updateModuloForm = async (
    id: number,
    _prevState: unknown,
    queryData: FormData
): Promise<IModulo> => {
    const { descripcion } = Object.fromEntries(queryData.entries());
    try {
        const response = await moduloApi.put('/', { descripcion }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el módulo:", error);
        throw error;
    }
};
