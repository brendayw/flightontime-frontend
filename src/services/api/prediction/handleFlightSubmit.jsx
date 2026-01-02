import predictFlight from './predictFlight.jsx';

const handleFlightSubmit = async (formData, { setResult, setLoading, setError }) => {
  try {
    setLoading(true);
    setError(null);

    const { data } = await predictFlight(formData);
    setResult(data);
    return data;

  } catch (err) {
    console.error(err);
    setError("No se pudo obtener la predicción");
    return null;
  } finally {
    setLoading(false);
  }
};

export default handleFlightSubmit;

