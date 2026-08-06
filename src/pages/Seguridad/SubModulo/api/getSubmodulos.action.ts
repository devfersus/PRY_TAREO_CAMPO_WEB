import type { ISubmoduloAgregar } from "../CasoUso/Agregar/interface/ISubmoduloAgregar.interface";
import type { ISubmoduloListar } from "../CasoUso/Listar/interface/ISubmoduloListar.interface";
import { submoduloApi } from "./SubmoduloApi";

//Agregar
export const addSubmodulo = async (submodulo: Partial<ISubmoduloAgregar>) => {
    try {
        console.log("addSubmodulo peticion realizada");
        const response = await submoduloApi.post('/', { submodulo });
        return response.data;
    } catch (error) {
        console.error("Error al agregar el submódulo:", error);
        throw error;
    }
}

export const createSubmoduloForm = async (
    _prevState: unknown,
    queryData: FormData
) => {
    const { descripcion, activo } = Object.fromEntries(queryData.entries());
    try {
        const response = await submoduloApi.post('/', { descripcion, activo }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el submódulo:", error);
        throw error;
    }
}

//Listar por id
export const getSubmoduloPorId = async (id: number): Promise<ISubmoduloListar> => {
    try {
        const res = await submoduloApi.get('/', { params: { id } });
        return res.data;
    } catch (error) {
        console.error("Error al obtener el submódulo:", error);
        throw error;
    }
}

export const getSubmoduloAll = async (): Promise<ISubmoduloListar[]> => {
    try {
        console.log("getSubmoduloAll peticion realizada");
        const res = await submoduloApi.get('/');
        return res.data;
    } catch (error) {
        console.error("Error al obtener los submódulos:", error);
        throw error;
    }
}