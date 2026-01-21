import { useEffect, useState } from 'react';
import { getGlobalHistory } from '../../api/dashboard.api';
import { normalizePrevision } from '../../utils/normalize';

/**
 * Custom hook para obtener y normalizar el historial global de vuelos.
 *
 * Cada registro del historial contiene:
 *  - vueloId: número identificador del vuelo
 *  - probabilidad: número (probabilidad asociada)
 *  - prevision: "Retraso", "A tiempo" o "Desconocido"
 *  - createdAt: timestamp (ms)
 *
 * @returns {Object} - Retorna un objeto con:
 *   @property {Array} history - Array de registros normalizados de historial.
 *   @property {boolean} loading - Indica si la carga de datos está en progreso.
 *   @property {string|null} error - Mensaje de error si ocurre un fallo.
 *
 * @example
 * const { history, loading, error } = useDashboardHistory();
 * if (loading) return <Spinner />;
 * if (error) return <p>{error}</p>;
 * return (
 *   <ul>
 *     {history.map(h => (
 *       <li key={h.vueloId}>
 *         Vuelo {h.vueloId}: {h.prevision} ({h.probabilidad}%)
 *       </li>
 *     ))}
 *   </ul>
 * );
 */
const useDashboardHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
  * Función que obtiene el historial global desde la API
  * y normaliza los datos.
  */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyRaw = await getGlobalHistory();
        const normalizedHistory = Array.isArray(historyRaw)
          ? historyRaw
              .map((h) => ({
                ...h,
                vueloId: Number(h.vueloId),
                probabilidad: Number(h.probabilidad),
                prevision: normalizePrevision(h.prevision),
                createdAt: new Date(h.createdAt).getTime(),
              }))
              .filter(
                (h) =>
                  !isNaN(h.vueloId) &&
                  !isNaN(h.probabilidad) &&
                  !isNaN(h.createdAt)
              )
          : [];
        setHistory(normalizedHistory);
      } catch (err) {
        console.error(err);
        setError("Error cargando history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return { history, loading, error };
};

export default useDashboardHistory;