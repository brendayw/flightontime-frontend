import { Typography,  Container, Grid } from '@mui/material';
import BaseCard from '../ui/BaseCard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';

const Features = () => {
    return (
        
        <Container maxWidth="lg" sx={{ py: 10 }} background='transparent'>
            <Typography variant="h4" textAlign="center" gutterBottom color="#251A79" fontWeight="bold">
                Por qué elegir Flight On Time
            </Typography>

            <Grid container spacing={6} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4}>
                    <BaseCard sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
                    <BaseCard sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
                    <BaseCard sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                        <BarChartRoundedIcon sx={{ fontSize: 50, color: '#FEAB77', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Datos históricos
                        </Typography>
                        <Typography variant="body2" color='#d9d9d9bb'>
                            Análisis de métricas para detectar patrones de rendimiento.
                        </Typography>
                    </BaseCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <BaseCard sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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