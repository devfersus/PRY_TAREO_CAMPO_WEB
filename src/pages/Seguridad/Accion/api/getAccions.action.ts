
import type { IAccion } from "../interface/IAccion.interface"; 
import { accionApi } from "./AcionApi";

//Agregar
export const addAccion = async (accion: Partial<IAccion>) => {
    try {
        console.log("addAccion peticion realizada");
        const response = await accionApi.post('/', { accion });
        return response.data;
    } catch (error) {
        console.error("Error al agregar la acción:", error);
        throw error;
    }
}

export const createAccionForm = async (
    _prevState: unknown,
    queryData: FormData
) => {
    const formData = Object.fromEntries(queryData.entries());
    try {
        const response = await accionApi.post('/', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear la acción:", error);
        throw error;
    }
}

//Listar por id
export const getAccionPorId = async (id: string): Promise<IAccion> => {
    try {
        const res = await accionApi.get('/', { params: { id } });
        return res.data;
    } catch (error) {
        console.error("Error al obtener la acción:", error);
        throw error;
    }
}

export const getAccionAll = async (): Promise<IAccion[]> => {
    try {
        console.log("getAccion peticion realizada");
        const res = await accionApi.get('/listar');
        return res.data;
    } catch (error) {
        console.error("Error al obtener la acción:", error);
        throw error;
    }
}
