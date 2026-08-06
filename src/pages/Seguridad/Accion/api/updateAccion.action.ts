import type { IAccion } from "../interface/IAccion.interface"; 
import { accionApi } from "./AcionApi";

export const updateAccionForm = async (
    id: string,
    _prevState: unknown,
    queryData: FormData
): Promise<IAccion> => {
    const { descripcion } = Object.fromEntries(queryData.entries());
    try {
        const response = await accionApi.put('/', { descripcion }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la acción:", error);
        throw error;
    }
};
