export const formatPrediction = (prediction) => {
  if (!prediction) return null;

  const { aerolinea, origen, destino, fechaHora, distancia, status, probability } = prediction;

  const isDelayed = status.toLowerCase() === "retrasado";

  const formattedDate = new Date(fechaHora).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return { aerolinea, origen, destino, fechaHora, distancia, status, probability, isDelayed, formattedDate };
};