import { Typography, Container, Grid } from '@mui/material';
import BaseCard from '../ui/BaseCard';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';

/**
 * Features Component
 * 
 * Componente que muestra las principales características de la aplicación Flight On Time.
 * Se utiliza en las páginas:
 *  - Home (pantalla inicial)
 *  - PredictionsGuestPage (cuando el usuario no está loggeado)
 * 
 * Comportamiento:
 * - Muestra un título centrado: "Por qué elegir Flight On Time"
 * - Despliega una cuadrícula de tarjetas (cards) con iconos, subtítulos y descripciones.
 * - Cada tarjeta representa una feature:
 *    1. Predicciones precisas
 *    2. Alertas de retraso
 *    3. Datos históricos
 *    4. Fácil de usar
 * - Diseñado para ser responsive
 * 
 * Props:
 * - Ninguna
 * 
 * Estilos:
 * - Container con padding vertical (py:10) y ancho máximo 'lg'
 * - Grid con spacing 6 entre items y margin-top 4
 * - BaseCard:
 *    - Texto centrado
 *    - Padding 3
 *    - Altura 100%
 * - Iconos: color #FEAB77, tamaño 50px, margin-bottom 2
 * - Títulos de tarjetas: variant h6, gutterBottom
 * - Texto descriptivo: color #d9d9d9bb, variant body2
 * 
 * Uso:
 * <Features />
 */

const Features = () => {
    return (
        
        <Container maxWidth="lg" sx={{ py: 10 }} background='transparent'>
            <Typography variant="h4" textAlign="center" gutterBottom color="#251A79" fontWeight="bold">
                Por qué elegir Flight On Time
            </Typography>

            <Grid container spacing={6} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4}>
                    <BaseCard sx={{ textAlign: 'center', p: 3 }}>
                        <SpeedIcon sx={{ fontSize: 50, color: '#FEAB77', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Predicciones precisas
                        </Typography>
                        <Typography variant="body2" color='#d9d9d9bb'>
                            Entrenado con millones de vuelos históricos y datos en tiempo real.
                        </Typography>
                    </BaseCard>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <BaseCard sx={{ textAlign: 'center', p: 3 }}>
                        <NotificationsActiveIcon sx={{ fontSize: 50, color: '#FEAB77', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            {/* notificaciones en tiempo real */}
                            Alertas de retraso
                        </Typography>
                        <Typography variant="body2" color='#d9d9d9bb'>
                            Sigue tus vuelos y recibe alertas de cambios o retrasos.
                        </Typography>
                    </BaseCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <BaseCard sx={{ textAlign: 'center', p: 3 }}>
                        <BarChartRoundedIcon sx={{ fontSize: 50, color: '#FEAB77', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Datos históricos
                        </Typography>
                        <Typography variant="body2" color='#d9d9d9bb'>
                            Análisis de métricas para detectar patrones de rendimiento.
                        </Typography>
                    </BaseCard>
                </Grid>

                <Grid item xs={12} md={4} >
                    <BaseCard sx={{ textAlign: 'center', p: 3 }}>
                        <InsertEmoticonRoundedIcon sx={{ fontSize: 50, color: '#FEAB77', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Fácil de usar
                        </Typography>
                        <Typography variant="body2" color='#d9d9d9bb'>
                            Interfaz simple para predicciones rápidas.
                        </Typography>
                    </BaseCard>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Features;