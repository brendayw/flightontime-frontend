import { useEffect, useState } from 'react';
import { getGlobalHistory } from '../api/dashboard.api';

const normalizePrevision = (p) => {
  if (!p) return "Desconocido";
  const val = p.toLowerCase();
  if (val.startsWith("retras")) return "Retraso";
  return "A tiempo";
};

const useDashboardHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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