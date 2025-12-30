/**
 * Formatea los datos de predicción del backend
 * @param {Object} prediction - Datos crudos del backend
 * @returns {Object} - Datos formateados para mostrar
 */
export const formatPrediction = (prediction) => {
  if (!prediction) return null;

  const { aerolinea, origen, destino, distancia_km, fecha_partida, prevision, probabilidad } = prediction;

  const date = new Date(fecha_partida);
  const formattedDate = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const probability = Math.round(probabilidad * 100);

  const isDelayed = prevision === "Retrasado";
  const status = isDelayed ? "Retrasado" : "A tiempo";

  const result = {
    aerolinea,
    origen,
    destino,
    distancia: `${distancia_km} km `,
    formattedDate,
    status,
    probability,
    isDelayed
  };

  return result;
};