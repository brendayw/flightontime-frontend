/**
 * Devuelve un texto amigable según
 * el impacto del factor en el retraso.
 */
const getFactorImpactText = (factor) => {
  if (!factor) return '';

  return factor.direccion === 'a_favor'
    ? `Aumenta el riesgo de retraso (+${factor.peso})`
    : `Reduce el riesgo de retraso (${factor.peso})`;
};

export default getFactorImpactText;