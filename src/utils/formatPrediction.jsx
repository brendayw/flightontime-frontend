export const formatPrediction = (prediction) => {
  if (!prediction) return null;

  const {
    aerolinea,
    origen,
    destino,
    distancia_km,
    fecha_partida,
    prevision,
    probabilidad
  } = prediction;

  if (!fecha_partida) return null;

  const [fecha, horaCompleta] = fecha_partida.split("T");
  const hora = horaCompleta.slice(0, 5); // HH:mm

  const [year, month, day] = fecha.split("-");
  const formattedDate = `${day}/${month}/${year} ${hora}`;

  const probability = Math.round(probabilidad * 100);
  const isDelayed = prevision === "Retrasado";
  const status = isDelayed ? "Retrasado" : "A tiempo";

  return {
    aerolinea,
    origen,
    destino,
    distancia: `${distancia_km} km`,
    formattedDate,
    status,
    probability,
    isDelayed
  };
};