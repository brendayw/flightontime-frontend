const formatPrediction = (prediction) => {
  if (!prediction) return null;

  //Predicción individual (estructura directa)
  const { aerolinea, origen, destino, distancia_km, fecha_partida, 
    prevision, probabilidad, explicabilidad } = prediction;

  //formatea la fecha
  if (!fecha_partida) return null;
  const [fecha, horaCompleta] = fecha_partida.split("T");
  const hora = horaCompleta.slice(0, 5); // HH:mm
  const [year, month, day] = fecha.split("-");
  const formattedDate = `${day}/${month}/${year} ${hora}`;

  const probability = probabilidad != null ? Math.round(Number(probabilidad)) : 0;
  const isDelayed = prevision === "Retrasado";
  const status = isDelayed ? "Retrasado" : "No Retrasado";

  return { aerolinea, origen, destino, distancia: `${distancia_km} km`, formattedDate, 
    status, probability, isDelayed, explicabilidad 
  };
}

export default formatPrediction;