import { useTheme, useMediaQuery, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { AppAlert, PredictionCircle } from '../'; 
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import parseMainFactors from '../../utils/explainability/parseMainFactors';
import humanizeFactor from '../../utils/explainability/humanizeFactor';
import getFactorImpactText from '../../utils/explainability/getFactorImpactText';
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

  if (!prediction) {
    return (
      <Card sx={{ borderRadius: '25px', p: 3, backgroundColor: 'rgba(65, 64, 64, 0.45)' }}>
        <AppAlert severity="error">
          No hay predicciones disponibles.
        </AppAlert>
      </Card>
    );
  }

  // Formatea la predicción para mostrarla en el card
  const { aerolinea, origen, destino, formattedDate, distancia, explicabilidad } = prediction;
  const factores = parseMainFactors(explicabilidad);

  return (
    <Card sx={{
        borderRadius: '25px',
        background: 'rgba(65, 64, 64, 0.45)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        border: '0.5px solid #d9d9d954',
        width: isMobile ? '95%' : { sm: '80%', md: 450},
        height: isMobile ? 'auto' : 460,
        mx: isMobile ? 'auto' : 0,
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Porcentaje */}
        <Box sx={{ mt: isMobile ? -5 : 0}}>
          <PredictionCircle prediction={prediction} />
        </Box>

        {/*Datos del vuelo*/}
        <Box sx={{ mt: isMobile ? 2 : 6}}>
          <Typography color='#E5E6EA' fontSize={isMobile ? 12: 14} marginBottom={1} textAlign={'start'}>
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

            <Box >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <InsightsRoundedIcon sx={{ fontSize: 20, color: "#d9d9d9bb" }} />
                <Typography
                  fontSize={isMobile ? 14 : 15}
                  fontWeight={600}
                  color="#d9d9d9bb"
                >
                  Factores principales
                </Typography>
              </Box>
              {/* Lista de factores */}
              <Box sx={{ display: "flex", flexDirection: "column", textAlign: 'start', gap: 0., ml: isMobile ? 1 : 3.5}}>
                {factores.map((factor, index) => (
                  <Typography
                    key={index}
                    fontSize={isMobile ? 12 : 14}
                    color="#d9d9d9bb"
                  >
                    • <strong>{humanizeFactor(factor.feature)}</strong> → {getFactorImpactText(factor)}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PredictionCard;