import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import PredictionCard from './PredictionCard';
import PredictionResults from './PredictionResults';

function PredictionList({ predictions = [], loading = false }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <section id='results'
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        transform: isMobile ? 'translateX(0)' : 'translateX(16rem)',
        gap: isMobile ? 20 : 16,        
        alignItems: 'center',
      }}
    >
      <PredictionResults total={predictions.length} loading={loading} />

      {loading && (
        <Box sx={{ textAlign: 'center', py: isMobile ? 2 : 4 }}>
          <Typography color='text-[#251A79] text-center'>
            Cargando predicciones...
          </Typography>
        </Box>
      )}

      {!loading && predictions.length === 0 && (
        <Box sx={{ textAlign: 'center', py: isMobile ? 2 : 4 }}>
          <Typography color='text-[#251A79] text-center'>
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