import type { ISubmoduloListar } from "../CasoUso/Listar/interface/ISubmoduloListar.interface";
import { submoduloApi } from "./SubmoduloApi";

export const updateSubmoduloForm = async (
    id: number,
    _prevState: unknown,
    queryData: FormData
): Promise<ISubmoduloListar> => {
    const { descripcion } = Object.fromEntries(queryData.entries());
    try {
        const response = await submoduloApi.put('/', { descripcion }, { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el submódulo:", error);
        throw error;
    }
};
