import { useEffect, useState } from "react";
import { getDashboardSummary, getGlobalHistory } from "../services/api/dashboard/dashboardApi";

const useDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryData, historyData] = await Promise.all([
          getDashboardSummary(),
          getGlobalHistory(),
        ]);

        setSummary(summaryData);
        setHistory(historyData);
      } catch (err) {
        console.error(err);
        setError("Error cargando datos del dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { summary, history, loading, error };
};

export default useDashboard;