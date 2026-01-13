/**
 * Formatea una predicción de vuelo para su visualización.
 * 
 * Maneja dos casos:
 * 1. Predicciones en batch con campos `input` y `output`.
 * 2. Predicciones individuales con estructura directa.
 *
 * @param {Object} prediction - Objeto de predicción.
 * @param {Object} [prediction.input] - Datos de entrada (solo para batch).
 * @param {string} prediction.input.aerolinea - Aerolínea del vuelo.
 * @param {string} prediction.input.origen - Ciudad de origen.
 * @param {string} prediction.input.destino - Ciudad de destino.
 * @param {number} prediction.input.distancia_km - Distancia en km.
 * @param {string} prediction.input.fecha_partida - Fecha y hora de partida en formato ISO.
 * @param {Object} [prediction.output] - Datos de salida (solo para batch).
 * @param {string} prediction.output.prevision - "Retrasado" o "A tiempo".
 * @param {number} prediction.output.probabilidad - Probabilidad de la predicción (0 a 1).
 * @param {string} [prediction.aerolinea] - Aerolínea (para predicción individual).
 * @param {string} [prediction.origen] - Origen (para predicción individual).
 * @param {string} [prediction.destino] - Destino (para predicción individual).
 * @param {number} [prediction.distancia_km] - Distancia en km (para predicción individual).
 * @param {string} [prediction.fecha_partida] - Fecha/hora ISO (para predicción individual).
 * @param {string} [prediction.prevision] - "Retrasado" o "A tiempo" (para individual).
 * @param {number} [prediction.probabilidad] - Probabilidad 0-1 (para individual).
 * 
 * @returns {Object|null} Formato unificado de la predicción:
 *   @property {string} aerolinea
 *   @property {string} origen
 *   @property {string} destino
 *   @property {string} distancia - Formateada con " km"
 *   @property {string} formattedDate - Fecha y hora en formato `dd/mm/yyyy HH:mm`
 *   @property {string} status - "Retrasado" o "A tiempo"
 *   @property {number} probability - Probabilidad en porcentaje
 *   @property {boolean} isDelayed - true si está retrasado
 *   Retorna null si la fecha no está disponible.
 *
 * @example
 * const formatted = formatPrediction({
 *   input: { aerolinea: "AA", origen: "NYC", destino: "LAX", distancia_km: 4000, fecha_partida: "2026-01-13T15:30:00" },
 *   output: { prevision: "Retrasado", probabilidad: 0.85 }
 * });
 * // {
 * //   aerolinea: "AA",
 * //   origen: "NYC",
 * //   destino: "LAX",
 * //   distancia: "4000 km",
 * //   formattedDate: "13/01/2026 15:30",
 * //   status: "Retrasado",
 * //   probability: 85,
 * //   isDelayed: true
 * // }
 */
export const formatPrediction = (prediction) => {
  if (!prediction) return null;

  // Caso 1: Predicción en lote
  if (prediction.input && prediction.output) {
    const { input, output, error } = prediction;
    //lo que se envia en cada columna
    const { aerolinea, origen, destino, distancia_km, fecha_partida } = input;
    //lo que devuelve
    const { prevision, probabilidad } = output;

    if (!fecha_partida) return null;
    const [fecha, horaCompleta] = fecha_partida.split("T");
    const hora = horaCompleta.slice(0, 5); // HH:mm
    const [year, month, day] = fecha.split("-");
    const formattedDate = `${day}/${month}/${year} ${hora}`;

    const probability = Math.round(probabilidad * 100);
    const isDelayed = prevision === "Retrasado";
    const status = isDelayed ? "Retrasado" : "A tiempo";

    return { aerolinea, origen, destino, distancia: `${distancia_km} km`, formattedDate,
      status, probability, isDelayed };
  }

  // Caso 2: Predicción individual (estructura directa)
  const { aerolinea, origen, destino, distancia_km, fecha_partida, prevision, probabilidad } = prediction;

  if (!fecha_partida) return null;
  const [fecha, horaCompleta] = fecha_partida.split("T");
  const hora = horaCompleta.slice(0, 5); // HH:mm
  const [year, month, day] = fecha.split("-");
  const formattedDate = `${day}/${month}/${year} ${hora}`;
  const probability = Math.round(probabilidad * 100);
  const isDelayed = prevision === "Retrasado";
  const status = isDelayed ? "Retrasado" : "No Retrasado";

  return { aerolinea, origen, destino, distancia: `${distancia_km} km`, formattedDate, 
    status, probability, isDelayed };
}