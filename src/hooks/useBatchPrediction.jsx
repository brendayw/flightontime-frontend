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

      console.log('📊 Datos del API:', data);

      // El API devuelve los datos en español
      setResult({
        total: data.totalFilas,
        ok: data.procesadasOk,
        error: data.conError,
      });

      // El API devuelve 'resultados', no 'results'
      const predictionsData = data.resultados || [];
      setPredictions(predictionsData);
      
      console.log('✅ Predicciones guardadas:', predictionsData);
      console.log('📈 Total de predicciones:', predictionsData.length);

    } catch (e) {
      setError("Error procesando archivo");
      console.error('❌ Error completo:', e);
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