import { useTheme, useMediaQuery, Card, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Menu from '../components/layout/Menu';
import PredictionForm from '../components/prediction/PredictionForm';
import NotifyToggle from '../components/ui/NotifyToggle';
import usePrediction from '../hooks/usePrediction';

const WorkspacePage = () => {
    const navigate = useNavigate();
    const { predict, loading, error } = usePrediction();

    const handlePredict = async (formData) => {
        const result = await predict(formData);
        if (!result) return;

        const predictionData = {
            ...formData,
            ...result
        };

        navigate('/predictions', {
            state: {
                predictions: [predictionData]
            }
        });
    };

    return (
        <section style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `,}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >
            <Header />
            <Menu />

            <Box sx={{ width: '100vw', textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 } }}>
                <Container maxWidth="lg" sx={{ mt: -4 }}  >

                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#FEAB77">
                        ¡Bienvenido!
                    </Typography>

                    <Card sx={{ 
                        background: 'rgba(65, 64, 64, 0.45)',
                        maxWidth: 650, mx: 'auto', p: { xs: 3, md: 2 }, borderRadius: 5 
                    }}>
                        <PredictionForm onPredict={handlePredict} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <NotifyToggle />
                        </Box>
                    </Card>
                </Container>
            </Box>  
        </section>
    );
}

export default WorkspacePage;