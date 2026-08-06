import axios, { type InternalAxiosRequestConfig } from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export function createApiInstance(path: string) {
  const instance = axios.create({ baseURL: `${API_BASE}${path}` });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token') ?? '';
    config.headers['Authorization'] = `Bearer ${token}`;
    return new Promise((resolve) => {
      setTimeout(() => resolve(config));
      // reject(new Error('Error de prueba desde interceptor'));
    }); 
  });
 
  return instance; 
}
