import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PredictionCard from "./PredictionCard";
import PredictionResults from "./PredictionResults";

function PredictionList({ predictions = [], loading = false }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <section className='flex flex-col gap-4'
      style={{
        gap: isMobile ? 20 : 16,
        paddingLeft: isMobile ? 12 : 0,
        paddingRight: isMobile ? 12 : 0,
        alignItems: "center",
      }}
    >
      <PredictionResults total={predictions.length} loading={loading} />

      {loading && (
        <Box sx={{ textAlign: "center", py: isMobile ? 2 : 4 }}>
          <Typography color="text.secondary">
            Cargando predicciones...
          </Typography>
        </Box>
      )}

      {!loading && predictions.length === 0 && (
        <Box sx={{ textAlign: "center", py: isMobile ? 2 : 4 }}>
          <Typography color="text.secondary">
            No hay predicciones disponibles. Realiza tu primera predicción.
          </Typography>
        </Box>
      )}

      {/* Lista de predicciones */}
      {!loading && predictions.length > 0 &&
        predictions.map((prediction, index) => (
          <PredictionCard key={index} prediction={prediction} />
        ))
      }
    </section>
  );
}

export default PredictionList;