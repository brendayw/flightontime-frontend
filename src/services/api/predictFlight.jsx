import axiosInstance from "./axiosInstance";

/**
 * POST → Envía datos del vuelo al backend para obtener predicción
 * @param {Object} flightData - Datos del vuelo (aerolinea, origen, destino, etc.)
 * @returns {Promise} - Respuesta de la API
 */
const predictFlight = async (flightData) => {
  return axiosInstance.post("/predict", flightData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default predictFlight;