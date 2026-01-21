import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Typography, Container, Box, Card, useMediaQuery, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header, PredictionForm, Features, CTA, Footer, BatchPredictionFile } from '../components';
import { formatAnyPrediction } from "../utils/formatAnyPrediction";
import usePrediction from '../hooks/prediction/usePrediction';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const [view, setView] = useState("hero"); //cambia entre form de predicción y el de batch
    const navigate = useNavigate();
    const { predict, loading, error } = usePrediction();

    // Único handlePredict para individual y batch
    const handlePredict = async (formData) => {
        const result = await predict(formData);
        if (!result) return;

        // Para individual: formData es un objeto
        // Para batch: formData es un array
        const predictions = formatAnyPrediction(result, formData);

        // Mostrar errores de batch si existen
        if (result.errores && result.errores.length > 0) {
            console.warn('Errores en predicción batch:', result.errores);
            // Aquí podrías mostrar un toast/alert con los errores
        }

        navigate('/predictions-guest', {
            state: {
                predictions,
                errors: result.errores || []
            }
        });
    };

    return (
        <>
            {/* Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Header onShowBatch={() => setView("batch")} />
            </motion.div>
            

            {/* Hero Section con Prediccion Individual o Prediccion en lote */}
            <Box sx={{ width: '100vw', textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 },
                backgroundImage: `
                    linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%, rgba(74, 58, 87, 0.85) 45%,
                    rgba(254, 160, 98, 0.85) 50%, rgba(254, 171, 119, 0.85) 55%,
                    rgba(74, 58, 87, 0.85) 70%, rgba(41, 36, 66, 0.85) 100%) `
            }}>
                <Container maxWidth="lg" sx={{ mt: -4 }}  >
                    <AnimatePresence mode="wait">
                        {view === "hero" ? (
                            <motion.div  key="heroForm" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}>
                                <motion.div variants={itemVariants}>
                                    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold"
                                        sx={{ fontSize: isMobile ? 30 : 36, mt: isMobile ? 8 : 0 }}
                                    >
                                        ¿Tu vuelo llegará a tiempo?
                                    </Typography>
                                </motion.div>
                        
                                {/* Formulario */}
                                <motion.div variants={itemVariants}>
                                    <Card sx={{ background: 'rgba(65, 64, 64, 0.45)', maxWidth: 650, mx: 'auto', 
                                        p: { xs: 3, md: 2 }, borderRadius: 5 
                                    }}>
                                        <PredictionForm onPredict={handlePredict} />
                                    </Card>
                                </motion.div>
                            </motion.div> 
                        ) : (
                            <motion.div key="batchForm" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}>
                                <motion.div variants={itemVariants}>
                                    <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                                        Predicciones en lote
                                    </Typography>
                                </motion.div>

                                {/* Opcion para subir archivo csv */}
                                <motion.div variants={itemVariants}>
                                    <Card sx={{ background: 'rgba(65, 64, 64, 0.45)', maxWidth: 650, maxHeight: 440, mx: 'auto', 
                                        p: { xs: 3, md: 2 }, borderRadius: 5 
                                    }}>
                                        <BatchPredictionFile onPredict={handlePredict} />
                                    </Card>
                                </motion.div>
                            </motion.div>    
                        )}
                    </AnimatePresence>
                </Container>
            </Box>
           
            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Features />
            </motion.div>
            

            {/* CTA Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <CTA />
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Footer />
            </motion.div>
        </>
    )
}

export default Home;