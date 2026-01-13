import { useState, useEffect } from "react";
import { getAllPredictions } from "../api/prediction.api";

/**
 * Hook para obtener todas las predicciones guardadas
 * y manejar loading, error y refresh para el ADMIN.
 */
const usePredictionsAdmin = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const data = await getAllPredictions();
      setPredictions(data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener predicciones:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  return { predictions, loading, error, refresh: fetchPredictions };
};

export default usePredictionsAdmin;