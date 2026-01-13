import axios from "axios";

/**
 * Instancia de Axios centralizada para todo el proyecto.
 *
 * Uso:
 * - Base URL preconfigurada para apuntar al backend
 * - Headers por defecto
 * - Timeout global
 * - Interceptores de request/respuesta
 *
 * Beneficios:
 * - Evita repetir configuración en cada request
 * - Permite manejar errores de manera centralizada
 * - Facilita agregar auth headers automáticamente
 */

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL base de la API
  timeout: 10000,                        // timeout global en ms
  headers: {
    "Content-Type": "application/json",  // header por defecto para JSON
  },
});

/**
 * Interceptor de respuesta global.
 *
 * - Permite manejar errores en un solo lugar
 * - Por ahora solo propaga el error para ser manejado en el hook/service
 */
axiosInstance.interceptors.response.use(
  (response) => response,          // resuelve normalmente
  (error) => Promise.reject(error) // propaga error para manejarlo en hooks/components
);


export default axiosInstance;