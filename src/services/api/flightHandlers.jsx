import { predictFlight } from './flightPrediction.jsx';

export const handleFlightSubmit = async (formData, { setResult, setLoading, setError }) => {
  try {
    setLoading(true);
    setError(null);

    const { data } = await predictFlight(formData);
    setResult(data);

  } catch (err) {
    console.error(err);
    setError("No se pudo obtener la predicción");
  } finally {
    setLoading(false);
  }
};
