import { useEffect, useState } from 'react';
import { getDashboardSummary } from '../api/dashboard.api';

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