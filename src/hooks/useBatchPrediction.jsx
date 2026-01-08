import { useState } from 'react';
import { uploadBatchPrediction } from '../services/api/prediction/uploadBatchPrediction';

const useBatchPrediction = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const selectFile = (file) => setFile(file);

  const upload = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await uploadBatchPrediction(file);

      // El API devuelve los datos en español
      setResult({
        total: data.totalFilas,
        ok: data.procesadasOk,
        error: data.conError,
      });

      // El API devuelve 'resultados', no 'results'
      const predictionsData = data.resultados || [];
      setPredictions(predictionsData);
  
    } catch (e) {
      setError("Error procesando archivo");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setPredictions([]);
    setError(null);
  };

  return {
    file,
    loading,
    error,
    result,
    predictions,
    selectFile,
    upload,
    reset,
  };
};

export default useBatchPrediction;