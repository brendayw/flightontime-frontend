/**
 * Normaliza la previsión de un vuelo.
 * @param {string} prevision - Valor de la previsión original.
 * @returns {string} "Retraso", "A tiempo" o "Desconocido"
 *
 * @example
 * normalizePrevision("Retraso por mal tiempo"); // "Retraso"
 * normalizePrevision("A tiempo"); // "A tiempo"
 * normalizePrevision(null); // "Desconocido"
 */
export const normalizePrevision = (prevision) => {
  if (!prevision) return "Desconocido";
  const val = prevision.toLowerCase();
  if (val.startsWith("retras")) return "Retraso";
  return "A tiempo";
};