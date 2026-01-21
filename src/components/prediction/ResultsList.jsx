import { Box, Stack, useTheme, useMediaQuery, Grid } from '@mui/material';
import { AppAlert, PredictionCard, ResultsCount } from '../'; 

/**
 * Componente que muestra un listado de predicciones.
 *
 * Props:
 * - predictions: array de predicciones a mostrar (default: [])
 * - loading: booleano para indicar si se están cargando los datos (default: false)
 * - isBatch: booleano que indica si las predicciones vienen de un archivo batch (default: false)
 */

const ResultsList = ({ predictions = [], loading = false, isBatch = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const showGrid = isBatch && predictions.length > 1; //en caso de que se obtengan de archivo
  
  return (
    <Box>
      <Stack spacing={2} alignItems={'center'}>

        <ResultsCount total={predictions.length} loading={loading} isBatch={isBatch} />

        {!loading && predictions.length === 0 && (
          <Box sx={{ py: isMobile ? 2 : 4 }}>
            <AppAlert severity="error">
              No hay predicciones disponibles.
            </AppAlert>
          </Box>
        )}

        {/* Lista de predicciones */}
        {!loading && predictions.length > 0 && (
          showGrid ? (
            <Grid container spacing={3} sx={{ maxWidth: 1200, px: { xs: 2, md: 0 }, justifyContent: 'center'}} >
              {predictions.map((prediction, index) => (
                <Grid item key={`prediction-${index}-${prediction.id || ''}`} xs={6} sm={3} md={2} >
                  <PredictionCard prediction={prediction} />
                </Grid>
              ))}
            </Grid>
          ) : (
            predictions.map((prediction, index) => (
              <PredictionCard key={`prediction-${index}-${prediction.id || ''}`} prediction={prediction} />
            ))
          ) 
        )}
      </Stack>
    </Box>
  );
}

export default ResultsList;