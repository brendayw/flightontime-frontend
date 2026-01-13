import { useState, lazy, Suspense } from "react";
import { Typography, Container, Box, Card, useMediaQuery, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import PredictionForm from '../components/prediction/PredictionForm';
import Features from '../components/ui/Features';
import CTA from '../components/ui/CTA';
import Footer from '../components/ui/Footer';
import BatchPredictionFile from '../components/batchPrediction/BatchPredictionFile';
// import useAuth from '../hooks/useAuth';
import usePrediction from '../hooks/usePrediction';

const Home = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const [view, setView] = useState("hero"); //cambia entre form de predicción y el de batch
    const navigate = useNavigate();
    const { predict, loading, error } = usePrediction();
    //const { isGuest, isUser, isAdmin } = useAuth(); 

    const handlePredict = async (formData) => {
        const result = await predict(formData);
        if (!result) return;

        const predictionData = {
            ...formData,
            ...result
        };

        navigate('/predictions-guest', {
            state: {
                predictions: [predictionData]
            }
        });
    };

    return (
        <>
            {/* Header */}
            <Header onShowBatch={() => setView("batch")} />

            {/* Hero Section con Prediccion Individual o Prediccion en lote */}
            <Box sx={{ width: '100vw', textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 },
                backgroundImage: `
                    linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%, rgba(74, 58, 87, 0.85) 45%,
                    rgba(254, 160, 98, 0.85) 50%, rgba(254, 171, 119, 0.85) 55%,
                    rgba(74, 58, 87, 0.85) 70%, rgba(41, 36, 66, 0.85) 100%) `
            }}>
                <Container maxWidth="lg" sx={{ mt: -4 }}  >
                    {view === "hero" ? (
                        <>
                            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                                ¿Tu vuelo llegará a tiempo?
                            </Typography>
                    
                            {/* Formulario */}
                            <Card sx={{ background: 'rgba(65, 64, 64, 0.45)', maxWidth: 650, mx: 'auto', 
                                p: { xs: 3, md: 2 }, borderRadius: 5 
                            }}>
                                <PredictionForm onPredict={handlePredict} />
                            </Card>
                        </> 
                    ) : (
                        <>
                            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                                Predicciones en lote
                            </Typography>

                            <Card sx={{ background: 'rgba(65, 64, 64, 0.45)', maxWidth: 650, maxHeight: 400, mx: 'auto', 
                                p: { xs: 3, md: 2 }, borderRadius: 5 
                            }}>
                                <BatchPredictionFile />
                            </Card>
                        </>    
                    )}
                </Container>
            </Box>
           
            {/* Features */}
            <Features />

            {/* CTA Section */}
            <CTA />
            
            <Footer />
        </>
    )
}

export default Home;