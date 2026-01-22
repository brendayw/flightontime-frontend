/**
 * Parsea el texto crudo de factores principales del modelo
 * y lo transforma en un array usable en el front.
 */
const parseMainFactors = (raw) => {
  if (!raw || typeof raw !== 'string') return [];

  // quitamos  "Factores principales: " si existe
  const cleaned = raw.replace(/^Factores principales:\s*/, '');

  return cleaned
    .split(';')
    .map(f => f.trim())
    .filter(Boolean)
    .map(item => {
      const match = item.match(
        /(.*?) <= .*?\((.*?), peso ([\-\d.]+)\)/
      );

      if (!match) return null;

      const [, feature, impactoTexto, peso] = match;

      const pesoNum = Number(peso);

      return {
        feature,                 // ej: aerolinea_WN
        impactoTexto,            // ej: "a favor del retraso"
        peso: pesoNum,           // ej: 0.19
        direccion: pesoNum > 0 ? 'a_favor' : 'en_contra',
        magnitud: Math.abs(pesoNum),
      };
    })
    .filter(Boolean);
};

export default parseMainFactors;
