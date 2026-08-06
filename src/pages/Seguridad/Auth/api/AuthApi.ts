import axios from 'axios';

// SIN createApiInstance: el endpoint de login no requiere Bearer token
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export const authApi = axios.create({
  baseURL: `${API_BASE}/api/seguridad/auth`,
});
