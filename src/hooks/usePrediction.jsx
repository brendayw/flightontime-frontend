import { useState, useCallback } from "react";
import handleFlightSubmit from "../services/api/prediction/handleFlightSubmit";

const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (formData) => {
    try {
      const data = await handleFlightSubmit(formData, { setResult, setLoading, setError });
      return data;
    } catch (err) {
      // El error ya está manejado en handleFlightSubmit
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, predict, reset };
};

export default usePrediction;