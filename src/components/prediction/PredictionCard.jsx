import { useTheme, useMediaQuery, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import PredictionCircle from './PredictionCircle.jsx';
import AppAlert from '../ui/AppAlert.jsx';
import { formatPrediction } from '../../utils/formatPrediction.jsx';

/**
 * PredictionCard - Componente que muestra la predicción de un vuelo en un card estilizado.
 *
 * Props:
 * - prediction: objeto que contiene los datos de predicción del vuelo.
 *
 * Características:
 * - Responsive: adapta tamaño y padding según el ancho de la pantalla.
 * - Muestra porcentaje de predicción mediante PredictionCircle.
 * - Muestra datos del vuelo: aerolínea, origen-destino, fecha/hora y distancia.
 * - Maneja casos donde no hay datos disponibles.
 */

function PredictionCard({ prediction }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Formatea la predicción para mostrarla en el card
  const data = formatPrediction(prediction);
  const { row, response, error } = prediction;

  if (!data) {
    return (
      <Card sx={{ borderRadius: '25px', p: 3, backgroundColor: 'rgba(65, 64, 64, 0.45)' }}>
        <AppAlert severity="info">
          No hay predicciones disponibles.
        </AppAlert>
      </Card>
    );
  }

  // Destructuring de los datos formateados
  const { aerolinea, origen, destino, formattedDate, distancia } = data;

  return (
    <Card sx={{
        borderRadius: '25px',
        background: 'rgba(65, 64, 64, 0.45)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        border: '0.5px solid #d9d9d954',
        width: isMobile ? '95%' : { sm: '80%', md: 450},
        height: isMobile ? 'auto' : 350,
        mx: isMobile ? 'auto' : 0,
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Porcentaje */}
        <PredictionCircle prediction={prediction} />

        {/*Datos del vuelo*/}
        <Box sx={{ mt: 4}}>
          <Typography color='#E5E6EA' fontSize={isMobile ? 12 : 14} padding={1}>
            Detalles de su vuelo
          </Typography>

          <Stack spacing={0.5}>
            <Box sx={{display: 'flex', gap: 2}}>
              <FlightTakeoffRoundedIcon sx={{ fontSize: 20, color: '#FEAB77'}}/>
              <Typography fontWeight={600} color='#d9d9d9bb' fontSize={isMobile ? 14 : 14}>
                {aerolinea} | {origen} → {destino}
              </Typography>
            </Box>
          
            <Box sx={{display: 'flex', gap: 2}}>
              <AccessTimeRoundedIcon sx={{ fontSize: 20, color: '#d9d9d9bb'}}/>
              <Typography color='#d9d9d9bb' fontSize={isMobile ? 14 : 14}>
                {formattedDate} hs
              </Typography>
            </Box>
          
            <Box sx={{display: 'flex', gap: 2}}>
              <RouteRoundedIcon sx={{ fontSize: 20, color: '#d9d9d9bb'}}/>
              <Typography color='#d9d9d9bb' fontSize={isMobile ? 14 : 14}>
                {distancia}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PredictionCard;