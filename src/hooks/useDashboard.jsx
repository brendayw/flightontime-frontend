import { useEffect, useState } from "react";
import { getDashboardSummary, getGlobalHistory } from "../api/dashboardApi";

const useDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryData, historyData] = await Promise.all([
          getDashboardSummary(),
          getGlobalHistory()
        ]);

        setSummary(summaryData);
        setHistory(historyData);
      } catch (error) {
        console.error("Error cargando dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { summary, history, loading };
};

export default useDashboard;