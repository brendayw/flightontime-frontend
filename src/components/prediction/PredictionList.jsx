import PredictionCard from "./PredictionCard";
import PredictionResults from "./PredictionResults";
import { Box, Typography } from "@mui/material";

function PredictionList({ predictions = [], loading = false }) {
  return (
    <section className='flex flex-col gap-4'>
      <PredictionResults total={predictions.length} loading={loading} />

      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">Cargando predicciones...</Typography>
        </Box>
      )}

      {!loading && predictions.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No hay predicciones disponibles. Realiza tu primera predicción.
          </Typography>
        </Box>
      )}

      {/* Lista de predicciones */}
      {!loading && predictions.length > 0 && predictions.map((prediction, index) => {
        return <PredictionCard key={index} prediction={prediction} />;
      })}
    </section>
  );
}

export default PredictionList;