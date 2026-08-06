import { useState } from 'react';
import type { ILoginCredentials } from '../interface/IAuth.interface';
import { loginAction } from '../api/login.action';

const TOKEN_KEY = 'token'; // misma key que tareoApi.ts

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const login = async (credentials: ILoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginAction(credentials);
      localStorage.setItem(TOKEN_KEY, response.token);
      return true;
    } catch {
      setError('Credenciales incorrectas. Verifique su email y contraseña.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => localStorage.removeItem(TOKEN_KEY);

  return { login, logout, isLoading, error };
};
