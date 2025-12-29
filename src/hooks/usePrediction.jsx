import { useState, useCallback } from "react";
import { handleFlightSubmit } from "../services/api/flightHandlers.jsx";

const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback((formData) => {
    handleFlightSubmit(formData, { setResult, setLoading, setError });
  }, []);

  return { result, loading, error, predict };
};

export default usePrediction;
