import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";
import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import PredictionForm from '../components/prediction/PredictionForm';
import PredictionList from '../components/prediction/PredictionList';
import usePrediction from "../hooks/usePrediction";
import { Alert, Box } from "@mui/material";

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [predicted, setPredicted] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const { predict, result, loading, error } = usePrediction();

    const handlePredict = async (formData) => {
        const result = await predict(formData);
        
        if (result) {

            const predictionData = {
                ...formData,
                ...result
            };

            setPredictions(prev => {
                const newPredictions = [predictionData, ...prev];
                return newPredictions;
            });
            setPredicted(true);
        }
    };

    const resultsAnimation = isMobile
        ? {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: -100 },
            }
        : {
            initial: { opacity: 0, y: 60 },
            animate: { opacity: 1, y: -110, x: -210 },
        };
    
    return (
        <section 
            id="home" 
            className="min-w-screen min-h-screen bg-[#ffffff] scroll-smooth "
            style={{
                width: '100vw',
                paddingBottom: isMobile ? '90px' : '0px',
            }}
        >
            <Header predicted={predicted} />
            <Menu />
            
            <div className='flex flex-col items-center mt-28 gap-6'>

                {/* FORM (siempre presente) */}
                <PredictionForm
                    variant={predicted ? "compact" : "default"}
                    onPredict={handlePredict}
                />

                {/* Mostrar error si existe */}
                {error && !predicted && (
                    <Box sx={{ width: '100%', maxWidth: 600, px: 2 }}>
                        <Alert severity="error" onClose={() => {}}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {/* Listado de resultados */}
                <AnimatePresence mode="wait">
                    {predicted && (
                        <motion.div
                            key="results"
                            initial={resultsAnimation.initial}
                            animate={resultsAnimation.animate}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ width: "100%"}}
                            
                        >
                            <PredictionList 
                                predictions={predictions}
                                loading={loading}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MENSAJES */}
                {/* {loading && <p>Cargando predicción...</p>}
                {error && <p>{error}</p>} */}
            </div>
        </section>
    );

}

export default Home;