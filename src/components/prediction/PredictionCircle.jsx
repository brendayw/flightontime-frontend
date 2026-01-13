import { useTheme, useMediaQuery, Box, CircularProgress, Typography } from '@mui/material';
import { formatPrediction } from '../../utils/formatPrediction.jsx';

/**
 * PredictionCircle
 *
 * Componente que visualiza de manera circular el porcentaje de probabilidad de retraso de un vuelo.
 *
 * Props:
 * - prediction: objeto que contiene la información de la predicción del vuelo.
 *
 * Características:
 * - Muestra un círculo de fondo gris tenue.
 * - Muestra un círculo de progreso que representa la probabilidad de retraso.
 * - El color del círculo cambia según si el vuelo tiene retraso (naranja) o está a tiempo (verde).
 * - Centra el porcentaje en el medio del círculo.
 * - Muestra un mensaje debajo indicando si el vuelo se retrasará o llegará a tiempo.
 * - Responsive: adapta el tamaño según si es móvil o no.
 */

const PredictionCircle = ({ prediction }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Si no hay predicción, no renderiza nada
    if (!prediction) return null;

    // Formatear datos de la predicción
    const data = formatPrediction(prediction);
    if (!data) return null;

    const { probability, isDelayed } = data;

    //Estilos
    const size = isMobile ? 160 : 180;      //tamaño del circulo
    const thickness = 5;                    //grosor del circulo
    const color = isDelayed ? '#FF854C' : '#4caf50';        //color

    return (
        <Box sx={{ position: 'relative', width: 'full', height: {sm:100, md: 160}, display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto'
        }}>
            {/* Círculo de fondo gris tenue */}
            <CircularProgress variant="determinate"
                value={100} size={size}
                thickness={thickness}
                sx={{color: 'rgba(255,255,255,0.12)', position: 'absolute' }}
            />

            {/* Progreso real */}
            <CircularProgress
                variant="determinate"
                value={probability}
                size={size}
                thickness={thickness}
                sx={{
                    color: color,
                    position: 'absolute',
                    '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round'
                    }
                }}
            />

            {/* Contenido central */}
            <Box
                sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                }}
            >
                <Typography variant="h3" component="div" fontWeight="bold" sx={{ lineHeight: 1, color: '#E5E6EA' }}>
                    {probability}%
                </Typography>

            </Box>
            <Box sx={{ mt: 26}}>
                <Typography fontSize={16} textAlign="center"  >
                    <strong className='text-[#FFFFFF]/90'> El vuelo {isDelayed ? ' se retrasará' : 'llegará a tiempo'} </strong>
                </Typography>
            </Box>
        </Box>
    );
}

export default PredictionCircle;