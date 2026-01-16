/**
 * Valida y transforma los datos del formulario de predicción
 * @param {Object} params
 * @param {string} params.aerolinea
 * @param {string} params.origen
 * @param {string} params.destino
 * @param {string} params.fechaHora
 * @returns {Object|null} formData listo para enviar al backend o null si es inválido
 */
export const prepareFlightFormData = ({ aerolinea, origen, destino, fechaHora, distancia }) => {
  //if (!aerolinea || !origen || !destino || !fechaHora || !distancia) return null;

  if (!aerolinea) return setLocalError("Selecciona una aerolínea");
  if (!origen) return setLocalError("Selecciona aeropuerto de origen");
  if (!destino) return setLocalError("Selecciona aeropuerto de destino");
  if (!fechaHora) return setLocalError("Ingresa fecha y hora del vuelo");
  if (distancia == null) throw new Error("No se pudo calcular la distancia");

  return {
    aerolinea: aerolinea.trim(),
    origen: origen.trim(),
    destino: destino.trim(),
    distancia_km: Number(distancia),
    fecha_partida: `${fechaHora}:00`,
  };
};
