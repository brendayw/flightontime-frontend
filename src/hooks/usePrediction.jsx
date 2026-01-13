import { useState, useCallback } from 'react';
import { predictFlight } from '../api/prediction.api';

/**
 * Hook para manejar predicciones de vuelos.
 *
 * Encapsula:
 * - Llamada a la API
 * - Estado de loading
 * - Manejo de errores
 * - Almacenamiento del resultado
 *
 * @returns {Object} {
 *   result: Resultado de la predicción,
 *   loading: Booleano indicando si está cargando,
 *   error: Mensaje de error,
 *   predict: Función para ejecutar la predicción,
 *   reset: Función para limpiar estado
 * }
 */
const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Ejecuta la predicción de un vuelo.
   *
   * @param {Object} formData - Datos del vuelo (aerolinea, origen, destino, fecha, hora)
   * @returns {Promise<Object|null>} Resultado de la predicción o null si hubo error
   */
  const predict = useCallback(async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await predictFlight(formData);
      const data = response.data;
      setResult(data);
      return data;
    } catch (err) {
      setError("No se pudo obtener la predicción");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Resetea el estado del hook
   */
  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, predict, reset };
};

export default usePrediction;