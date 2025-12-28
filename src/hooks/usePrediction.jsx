import { useState } from "react";
import { predictFlight } from "../services/flightPrediction.service";

const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await predictFlight(formData);
      setResult(response.data);

    } catch (err) {
      console.error(err);
      setError("No se pudo obtener la predicción");
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    predict,
  };
};

export default usePrediction;