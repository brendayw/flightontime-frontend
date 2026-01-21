import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, useMediaQuery, Box, Container } from "@mui/material";
import { Header, Menu, ResultsList, PredictionActions } from '../components';

const PredictionsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { state } = useLocation();
    const navigate = useNavigate();
    const predictions = state?.predictions ?? [];
    const predicted = predictions.length > 0;
    const isBatch = predictions.length > 1;
    const errors = state?.errors ?? [];

    //fallback si entran directo a la URL
    if (!state) {
        navigate('/');
        return null;
    }
    
    const resultsAnimation = isMobile ? 
        {
            initial: { opacity: 0, y: 0 },
            animate: { opacity: 1, y: -100 },
        }
        : {
            initial: { opacity: 0, y: 60 },
            animate: { opacity: 1, y: 20, x: 10 },
        };

    return (
        <section id='predictions' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >
            <Header  />
            <Menu />

            <Box sx={{ width: '100vw', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 } }}>
                <Container maxWidth="lg" sx={{ mt: -10 }}  >
                    <AnimatePresence mode="wait">
                        {predicted && (
                            <motion.div
                                key="results"
                                initial={resultsAnimation.initial}
                                animate={resultsAnimation.animate}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                style={{ width: "100%" }}
                            >
                                {/* Resultados */}
                                <ResultsList predictions={predictions} isBatch={isBatch} />
                                
                                {/* Botones para nueva prediccion o notificar */}
                                <PredictionActions />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Container>
            </Box>
        </section>
    );
};

export default PredictionsPage;