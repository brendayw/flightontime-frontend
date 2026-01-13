/**
 * Valida y transforma los datos del formulario de predicción
 * @param {Object} params
 * @param {string} params.aerolinea
 * @param {string} params.origen
 * @param {string} params.destino
 * @param {string} params.fechaHora
 * @param {string|number} params.distancia
 * @returns {Object|null} formData listo para enviar al backend o null si es inválido
 */
export const prepareFlightFormData = ({ aerolinea, origen, destino, fechaHora, distancia }) => {
  //if (!aerolinea || !origen || !destino || !fechaHora || !distancia) return null;

  if (!aerolinea) return setLocalError("Selecciona una aerolínea");
  if (!origen) return setLocalError("Selecciona aeropuerto de origen");
  if (!destino) return setLocalError("Selecciona aeropuerto de destino");
  if (!fechaHora) return setLocalError("Ingresa fecha y hora del vuelo");
  if (!distancia || distancia <= 0) return setLocalError("Ingresa una distancia válida");

  const distanciaInt = parseInt(distancia);
  if (isNaN(distanciaInt) || distanciaInt <= 0) return null;

  return {
    aerolinea: aerolinea.trim(),
    origen: origen.trim(),
    destino: destino.trim(),
    fecha_partida: `${fechaHora}:00`,
    distancia_km: distanciaInt,
  };
};
