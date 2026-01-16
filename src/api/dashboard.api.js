import axiosInstance from "../api/axiosInstance";


/**
 * Obtiene el resumen general del dashboard.
 *
 * Endpoint:
 * GET /dashboard/summary
 *
 * Uso:
 * - Mostrar métricas principales (stats, contadores, totales)
 * - Vista inicial del dashboard
 *
 * @returns {Promise<Object>} Datos resumidos del dashboard
 */
export const getDashboardSummary = async () => {
  const response = await axiosInstance.get("/api/dashboard/summary");
  return response.data;
};

/**
 * Obtiene el historial global de predicciones.
 *
 * Endpoint:
 * GET /dashboard/global-history
 *
 * Uso:
 * - Gráficos
 * - Tablas de historial
 * - Análisis temporal
 *
 * @returns {Promise<Array>} Historial global de predicciones
 */
export const getGlobalHistory = async () => {
  const response = await axiosInstance.get("/api/dashboard/global-history");
  return response.data;
};