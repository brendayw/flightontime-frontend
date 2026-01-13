import { useState } from 'react';
import { trackPrediction } from '../api/prediction.api';

/**
 * Custom hook para habilitar/deshabilitar el tracking de una predicción específica.
 *
 * Permite activar notificaciones cuando la predicción supera un umbral determinado.
 *
 * @param {string|number} predictionId - ID de la predicción a monitorear.
 *
 * @returns {Object} - Retorna un objeto con:
 *   @property {boolean} enabled - Indica si el tracking está activado.
 *   @property {boolean} loading - Indica si la solicitud de tracking está en progreso.
 *   @property {Function} toggleTracking - Función para activar o desactivar el tracking.
 *       @param {boolean} value - true para activar, false para desactivar.
 *
 * @example
 * const { enabled, toggleTracking, loading } = usePredictionTracker(prediction.id);
 *
 * <button
 *   onClick={() => toggleTracking(!enabled)}
 *   disabled={loading}
 * >
 *   {enabled ? 'Desactivar tracking' : 'Activar tracking'}
 * </button>
 */
export const usePredictionTracker = (predictionId) => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Activa o desactiva el tracking de la predicción.
   * Envía la configuración al backend solo si se habilita.
   */
  const toggleTracking = async (value) => {
    setEnabled(value);
    setLoading(true);

    try {
      if (value) {
        await trackPrediction({
          predictionId,
          notifyBy: ['EMAIL'],
          threshold: 0.8,
        });
      }
    } catch (e) {
      setEnabled(false);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { enabled, toggleTracking, loading };
};