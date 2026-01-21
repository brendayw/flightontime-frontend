import { useEffect, useState } from 'react';
import { getDashboardSummary } from '../../api/dashboard.api';

/**
 * Custom hook para obtener el resumen del dashboard.
 *
 * Normaliza los valores recibidos del backend para asegurarse
 * de que sean números y evita valores nulos o undefined.
 *
 * @returns {Object} - Retorna un objeto con:
 *   @property {Object|null} summary - Resumen del dashboard con:
 *     - totalPredicciones: número total de predicciones
 *     - porcentajePuntuales: porcentaje de vuelos a tiempo
 *     - porcentajeRetrasos: porcentaje de vuelos con retraso
 *   @property {boolean} loading - Indica si la carga de datos está en progreso.
 *   @property {string|null} error - Mensaje de error en caso de fallo.
 *
 * @example
 * const { summary, loading, error } = useDashboardSummary();
 * if (loading) return <Spinner />;
 * if (error) return <p>{error}</p>;
 * return (
 *   <div>
 *     <p>Total predicciones: {summary.totalPredicciones}</p>
 *     <p>Puntuales: {summary.porcentajePuntuales}%</p>
 *     <p>Retrasos: {summary.porcentajeRetrasos}%</p>
 *   </div>
 * );
 */
const useDashboardSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summaryRaw = await getDashboardSummary();
        const summary =
          summaryRaw && typeof summaryRaw === "object"
            ? {
                totalPredicciones: Number(summaryRaw.totalPredicciones) || 0,
                porcentajePuntuales:
                  Number(summaryRaw.porcentajePuntuales) || 0,
                porcentajeRetrasos:
                  Number(summaryRaw.porcentajeRetrasos) || 0,
              }
            : null;
        setSummary(summary);
      } catch (err) {
        console.error(err);
        setError("Error cargando summary");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  return { summary, loading, error };
};

export default useDashboardSummary;