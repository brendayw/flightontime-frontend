import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Typography, Container, Box, Card, useMediaQuery } from "@mui/material";
import { PredictionForm, BatchPredictionFile } from '../';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Hero = ({ onPredict, view, setView }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Box sx={{ width: '100%', textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 },
            backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%, rgba(74, 58, 87, 0.85) 45%,
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
                                    <PredictionForm onPredict={onPredict} />
                                </Card>
                            </motion.div>
                        </motion.div> 
                    ) : (
                        <motion.div key="batchForm" variants={containerVariants} initial="hidden" animate="visible" background='#000000' exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}>
                            <motion.div variants={itemVariants}>
                                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom
                                    sx={{ fontSize: isMobile ? 28 : 36, mt: isMobile ? 2 : 0 }}
                                >
                                    Predicciones en lote
                                </Typography>
                            </motion.div>

                            {/* Opcion para subir archivo csv */}
                            <motion.div variants={itemVariants} > 
                                <Card sx={{ 
                                    display: 'flex',
                                    justifyContent: 'center',
                                    background: 'rgba(65, 64, 64, 0.45)', 
                                    maxWidth: 650,
                                    width: '100%',
                                    maxHeight: isMobile ? 520 : 440,
                                    p: { xs: 1, md: 2 }, borderRadius: 5, 
                                    mx: 'auto',
                                }}>
                                    <BatchPredictionFile onPredict={onPredict} />
                                </Card>
                             </motion.div>
                        </motion.div>    
                    )}
                </AnimatePresence>
            </Container>
        </Box>
    )
}

export default Hero;