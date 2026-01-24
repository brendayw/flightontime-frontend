import isValidIsoDate from './isValidISODate';

const formatBatchError = (error, row) => {
  if (!error) return '';

  // Elimina "Fila CsvPredictRowDTO[" y "]"
  let cleaned = error.replace(/^Fila CsvPredictRowDTO\[/, '');

  // Separar contexto y mensaje
  const splitIndex = cleaned.lastIndexOf(']:');
  if (splitIndex !== -1) {
    cleaned = cleaned.slice(splitIndex + 2).trim();
  }

  const message = cleaned;

  const aerolinea = row?.aerolinea || '-';
  const origen = row?.origen || '-';
  const destino = row?.destino || '-';
  const fecha = row?.fecha_partida;

  /* ───────────────
     CASO 1: error inesperado por fecha invalida
    ─────────────── */
  if (message.toLowerCase().includes('error inesperado')) {
    if (fecha && !isValidIsoDate(fecha)) {
      return `Fecha inválida: ${fecha} (${origen} → ${destino})`;
    }

    return `Error inesperado (${aerolinea}, ${origen} → ${destino})`;
  }

  /* ───────────────
     CASO 2: errores normales del backend por aerolineas o aeropuertos
     ─────────────── */
  return `${message} (${aerolinea}, ${origen} → ${destino})`;
};

export default formatBatchError;