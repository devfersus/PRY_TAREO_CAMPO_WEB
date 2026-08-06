import type { ILoginCredentials, ILoginResponse } from '../interface/IAuth.interface';
import { authApi } from './AuthApi';

export const loginAction = async (
  credentials: ILoginCredentials
): Promise<ILoginResponse> => {
  try {
    const response = await authApi.post<ILoginResponse>('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};
