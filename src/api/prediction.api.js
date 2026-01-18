import apiPrivate from "../api/apiPrivate";
import apiPublic from "../api/apiPublic";

/**
 * Obtiene una predicción de vuelo a partir de los datos ingresados por el usuario.
 *
 * Endpoint:
 * POST /predict
 *
 * Uso:
 * - Predicción individual desde el formulario
 * - Retorna el resultado del modelo de predicción
 *
 * @param {Object} flightData - Datos del vuelo
 * @param {string} flightData.aerolinea
 * @param {string} flightData.origen
 * @param {string} flightData.destino
 * @param {string} flightData.fecha
 * @param {string} flightData.hora
 *
 * @returns {Promise<AxiosResponse>} Respuesta de la API con el resultado de la predicción
 */
export const predictFlight = async (flightData) => {
  return apiPrivate.post("/api/predict", flightData, {
    headers: {
      "Content-Type": "application/json",
    }
  });
};

/**
 * Envía un archivo csv para ejecutar una predicción por lote (batch prediction).
 *
 * Endpoint:
 * POST /predict/batch
 *
 * Uso:
 * - Carga masiva de vuelos (CSV)
 * - Devuelve el resultado procesado por el backend
 *
 * @param {File} file - Archivo con datos de vuelos
 *
 * @returns {Promise<Object>} Resultado del procesamiento batch
 */
export const uploadBatchPrediction = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiPrivate.post(
    "/api/predict/batch",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const calculateDistance = async (origenCoord, destinoCoord) => {
  
  try {
    //console.log("=== TEST DISTANCIA ===");
    //console.log("Token en localStorage:", localStorage.getItem("jwt"));
    const response = await apiPublic.post("/api/distancia", {
      origen: {
        latitud: origenCoord.latitud,
        longitud: origenCoord.longitud
      },
      destino: {
        latitud: destinoCoord.latitud,
        longitud: destinoCoord.longitud
      }
    });
    //console.log("Respuesta exitosa:", response.data);
    return response.data.distanciaKm;
  } catch (error) {
    console.error("Error calculando distancia:", error);
    return null;
  }
}

/**
 * Activa el seguimiento de una predicción para recibir notificaciones.
 *
 * Endpoint:
 * POST /predictions/track
 *
 * Uso:
 * - El usuario habilita el seguimiento desde el frontend (toggle / botón)
 * - El backend registra la suscripción y notifica a n8n
 *
 * @param {Object} params
 * @param {number} params.predictionId - ID de la predicción a seguir
 * @param {Array<string>} params.notifyBy - Canales de notificación (EMAIL, PUSH, etc.)
 * @param {number} params.threshold - Umbral que dispara la notificación
 *
 * @returns {Promise<void>}
 */
export const trackPrediction = async ({ predictionId, notifyBy, threshold }) => {
  await apiPrivate.post('/api/predictions/track', {
    predictionId,
    notifyBy,
    threshold,
  });
};

/**
 * Obtiene todas las predicciones guardadas.
 *
 * Endpoint:
 * GET /predictions/all
 *
 * Uso:
 * - Listado completo de predicciones para el dashboard o administración
 *
 * @returns {Promise<Object[]>} Array de predicciones
 */
export const getAllPredictions = async () => {
  const response = await apiPrivate.get("/predictions/all");
  return response.data;
};

