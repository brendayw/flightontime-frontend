import { useLocation, Navigate } from 'react-router-dom';
import { useMediaQuery, useTheme, Box, Card, Container, Typography } from '@mui/material';
import Header from '../components/ui/Header';
import Menu from '../components/layout/Menu';
import BatchPredicionFile from '../components/batchPrediction/BatchPredictionFile';
import useAuth from '../hooks/useAuth';

const BatchPredictionPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isPredictedView = true;

    const { loading, isAuthenticated, role } = useAuth();
    const location = useLocation();

    const isGuest = role === "GUEST";
    const cameFromHome = location.state?.fromHome;

    //aca decide auth
    if (loading) return null;

    if (isGuest && !cameFromHome) {
        return <Navigate to='/' replace />;
    }

    return (
        <section id='batch' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `,}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >
            <Header />

            {/* El menu se muestra si NO es guest */}
            {isAuthenticated && <Menu />}

            <Box sx={{ width: '100vw', textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 },
                backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%, rgba(74, 58, 87, 0.85) 45%,
                    rgba(254, 160, 98, 0.85) 50%, rgba(254, 171, 119, 0.85) 55%,
                    rgba(74, 58, 87, 0.85) 70%, rgba(41, 36, 66, 0.85) 100%) `
            }}>
                <Container maxWidth="lg" sx={{ mt: -8 }}  >
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#FEAB77">
                        Predicciones en lote
                    </Typography>

                    <Card sx={{ background: 'rgba(65, 64, 64, 0.45)', maxWidth: 650, maxHeight: {sm: 415, md: 420}, mx: 'auto', 
                        p: { xs: 2, md: 2 }, borderRadius: 5 
                    }}>
                        <BatchPredicionFile />
                    </Card>
                </Container>  
            </Box>
        </section>
    );
}

export default BatchPredictionPage;