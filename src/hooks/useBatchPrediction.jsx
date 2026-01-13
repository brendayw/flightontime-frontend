import { useState } from 'react';
import { uploadBatchPrediction } from '../api/prediction.api';

/**
 * Custom hook para manejar la carga y procesamiento de predicciones en batch (archivo CSV o similar).
 *
 * @returns {Object} - Retorna un objeto con:
 *   @property {File|null} file - Archivo seleccionado para cargar predicciones.
 *   @property {boolean} loading - Indica si la carga o procesamiento está en progreso.
 *   @property {string|null} error - Mensaje de error en caso de fallo.
 *   @property {Object|null} result - Resumen del procesamiento con:
 *     - total: número total de filas procesadas
 *     - ok: filas procesadas correctamente
 *     - error: filas con error
 *   @property {Array} predictions - Array de predicciones procesadas desde el API.
 *   @property {Function} selectFile - Función para seleccionar un archivo. Recibe un File.
 *   @property {Function} upload - Función para subir y procesar el archivo.
 *   @property {Function} reset - Resetea el hook, limpiando archivo, resultados y errores.
 *
 * @example
 * const { file, selectFile, upload, result, predictions, loading, error } = useBatchPrediction();
 *
 * // Selección de archivo
 * <input type="file" onChange={(e) => selectFile(e.target.files[0])} />
 *
 * // Subir archivo
 * <button onClick={upload} disabled={loading}>Procesar</button>
 *
 * // Mostrar resultados
 * {result && <p>Total filas: {result.total}, OK: {result.ok}, Errores: {result.error}</p>}
 */

const useBatchPrediction = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [predictions, setPredictions] = useState([]);

  /** Selecciona un archivo para procesar */
  const selectFile = (file) => setFile(file);

  /** Sube el archivo al backend y procesa las predicciones */
  const upload = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await uploadBatchPrediction(file);
      // El API devuelve los datos en español
      setResult({
        total: data.totalFilas,
        ok: data.procesadasOk,
        error: data.conError,
      });

      const predictionsData = data.resultados || [];
      setPredictions(predictionsData);
  
    } catch (e) {
      setError("Error procesando archivo");
    } finally {
      setLoading(false);
    }
  };

  /** Resetea el hook a su estado inicial */
  const reset = () => {
    setFile(null);
    setResult(null);
    setPredictions([]);
    setError(null);
  };

  return { file, loading, error, result, predictions,
    selectFile, upload, reset,
  };
};

export default useBatchPrediction;