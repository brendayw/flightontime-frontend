import formatPrediction from './formatPrediction';
import formatBatchPredictions from './formatBatchPrediction';

export function formatAnyPrediction(data, formData = null) {
  // Caso 1: Predicción INDIVIDUAL
  if (data.prevision !== undefined && data.probabilidad !== undefined && !data.predicciones) {
       
    if (!formData) {
      console.warn('El formData es requerido para predicción individual');
      return [];
    }

    const combined = { 
      ...formData, 
      ...data 
    };
    
    const formatted = formatPrediction(combined);
    
    return formatted ? [formatted] : [];
  }

  // Caso 2: Predicción BATCH
  if (data.predicciones && Array.isArray(data.predicciones)) {
    return formatBatchPredictions(data);
  }

  console.warn('Formato de predicción no reconocido:', data);
  return [];
}