import { useEffect, useState } from "react";
import { getDashboardSummary, getGlobalHistory } from "../services/api/dashboard/dashboardApi";

const normalizePrevision = (p) => {
  if (!p) return "Desconocido";
  const val = p.toLowerCase();
  if (val.startsWith("retras")) return "Retraso";
  return "A tiempo";
};

const useDashboard = () => {
  const [data, setData] = useState({
    summary: null,
    history: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryRaw, historyRaw] = await Promise.all([
          getDashboardSummary(),
          getGlobalHistory(),
        ]);

        const history = Array.isArray(historyRaw)
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

        setData({ summary, history });
      } catch (err) {
        console.error(err);
        setError("Error cargando datos del dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { ...data, loading, error };
};

export default useDashboard;