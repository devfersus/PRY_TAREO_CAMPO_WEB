import type { IModulo } from "../interface/IModulo.interface";
import { moduloApi } from "./ModuloApi";

//Agregar
export const addModulo = async (modulo: Partial<IModulo>) => {
    try {
        console.log("addModulo peticion realizada");
        const response = await moduloApi.post('/', { modulo });
        return response.data;
    } catch (error) {
        console.error("Error al agregar el módulo:", error);
        throw error;
    }
}

export const createModuloForm = async (
    _prevState: unknown,
    queryData: FormData
) => {
    const formData = Object.fromEntries(queryData.entries());
    try {
        const response = await moduloApi.post('/', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el módulo:", error);
        throw error;
    }
}

//Listar por id
export const getModuloPorId = async (id: number): Promise<IModulo> => {
    try {
        const res = await moduloApi.get('/', { params: { id } });
        return res.data;
    } catch (error) {
        console.error("Error al obtener el módulo:", error);
        throw error;
    }
}

export const getModuloAll = async (): Promise<IModulo[]> => {
    try {
        console.log("getModuloAll peticion realizada");
        const res = await moduloApi.get('/');
        return res.data;
    } catch (error) {
        console.error("Error al obtener los módulos:", error);
        throw error;
    }
}
