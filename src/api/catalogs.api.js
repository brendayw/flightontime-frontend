import axiosInstance from "../api/axiosInstance";

/**
 * Obtiene el listado de aerolíneas disponibles.
 *
 * Endpoint:
 * GET /aerolineas
 *
 * Uso:
 * - Cargar opciones del formulario de predicción
 * - Datos de solo lectura (catálogo)
 *
 * @returns {Promise<Array>} Lista de aerolíneas
 */
export const fetchAerolineas = async () => {
  try {
    const { data } = await axiosInstance.get("/aerolineas");
    return data;
  } catch (err) {
    console.error("Error al obtener aerolíneas:", err);
    return [];
  }
};

/**
 * Obtiene el listado de aeropuertos disponibles.
 *
 * Endpoint:
 * GET /aeropuertos
 *
 * Uso:
 * - Cargar opciones del formulario de predicción
 * - Datos de solo lectura (catálogo)
 *
 * @returns {Promise<Array>} Lista de aeropuertos
 */
export const fetchAeropuertos = async () => {
  try {
    const { data } = await axiosInstance.get("/aeropuertos");
    return data;
  } catch (err) {
    console.error("Error al obtener aeropuertos:", err);
    return [];
  }
};