import { useState } from 'react';
import { uploadBatchPrediction } from '../../api/prediction.api';
import { formatAnyPrediction } from '../../utils/formatAnyPrediction';

const useBatchPrediction = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  /** Selecciona un archivo y parsea su contenido */
  const selectFile = async (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    setResult(null);
    setPredictions([]);

    // Parsear el CSV para guardar los datos originales
    if (selectedFile) {
      try {
        const text = await selectedFile.text();
        const rows = text.trim().split('\n');
        
        // Parsear CSV a array de objetos
        const parsedData = rows.slice(1).map(row => {
          const values = row.split(',');
          return {
            aerolinea: values[0]?.trim(),
            origen: values[1]?.trim(),
            destino: values[2]?.trim(),
            fecha_partida: values[3]?.trim(),
            distancia_km: parseInt(values[4]?.trim() || '0')
          };
        }).filter(row => row.aerolinea); // Filtrar filas vacías

        console.log('📄 CSV parseado:', parsedData);
        setOriginalData(parsedData);
      } catch (err) {
        console.error('Error parseando CSV:', err);
        setError('Error al leer el archivo CSV');
      }
    }
  };

  /** Sube el archivo al backend y procesa las predicciones */
  const upload = async () => {
    if (!file || originalData.length === 0) {
      setError('No hay datos para procesar');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await uploadBatchPrediction(file);
      const rawPredictions = data.predicciones || [];
      const errors = data.errores || [];

      // Calcula totales
      setResult({
        total: rawPredictions.length + errors.length,
        ok: rawPredictions.length,
        error: errors.length,
      });

      const combinedPredictions = rawPredictions.map((pred, index) => {
        const originalRow = originalData[index] || {};
        return {
          ...originalRow,
          ...pred
        };
      });

      // Formatear
      const formattedPredictions = formatAnyPrediction(
        { predicciones: combinedPredictions }, 
        null
      );

      setPredictions(formattedPredictions);
  
    } catch (e) {
      setError("Error procesando archivo: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  /** Resetea el hook a su estado inicial */
  const reset = () => {
    setFile(null);
    setResult(null);
    setPredictions([]);
    setError(null);
    setOriginalData([]);
  };

  return { file, loading, error, result, predictions, selectFile, upload, reset };
};

export default useBatchPrediction;