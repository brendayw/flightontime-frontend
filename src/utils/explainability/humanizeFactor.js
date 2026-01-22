/**
 * Convierte nombres técnicos del modelo
 * en textos entendibles para el usuario.
 */
const humanizeFactor = (feature) => {
  if (!feature) return '';

  const [tipo, valor] = feature.split('_');

  switch (tipo) {
    case 'aerolinea':
      return 'Aerolínea';   // ignoramos el código WN
    case 'origen':
      return 'Origen';      // opcional, si querés usar
    case 'destino':
      return 'Destino';     // ignoramos el código MJT/CMX
    case 'hora':
    case 'hora_decimal':
      return 'Hora';
    case 'dia':
      return 'Día';
    default:
      return feature.replace('_', ' ');
  }
};

export default humanizeFactor;