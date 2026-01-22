const formatBatchPredictions = (data) => {
  if (!data.predicciones || !Array.isArray(data.predicciones)) {
    console.warn('Predicciones no es un array válido');
    return [];
  }

  return data.predicciones.map((pred, index) => {
    const { prevision, probabilidad } = pred;
    
    // Campos del input
    const { aerolinea = 'N/A', origen = 'N/A', destino = 'N/A', fecha_partida, distancia_km } = pred;

    // Formatear fecha si existe
    let formattedDate = 'Fecha no disponible';
    if (fecha_partida) {
      try {
        const [fecha, horaCompleta] = fecha_partida.split("T");
        const hora = horaCompleta?.slice(0, 5) || '00:00';
        const [year, month, day] = fecha.split("-");
        formattedDate = `${day}/${month}/${year} ${hora}`;
      } catch (error) {
        console.warn(`Error formateando fecha en índice ${index}:`, error);
      }
    }

    const probability = probabilidad != null ? Math.round(Number(probabilidad)) : 0;
    const isDelayed = prevision === "Retrasado";
    const status = isDelayed ? "Retrasado" : "A tiempo";
    const distancia = distancia_km ? `${distancia_km} km` : 'N/A';

    return { 
      aerolinea, origen, destino, distancia, formattedDate, 
      status, probability, isDelayed
    };
  });
}

export default formatBatchPredictions;