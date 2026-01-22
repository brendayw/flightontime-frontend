// import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery, useTheme, Box, Card, Container, Typography } from '@mui/material';
import { Header, Menu } from '../components';
import BatchPredicionFile from '../components/batchPrediction/BatchPredictionFile';

const BatchPredictionPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <section id='batch' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Header />
                <Menu />
            </motion.div>

            <Box sx={{ width: '100vw', textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 },
                backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%, rgba(74, 58, 87, 0.85) 45%,
                    rgba(254, 160, 98, 0.85) 50%, rgba(254, 171, 119, 0.85) 55%,
                    rgba(74, 58, 87, 0.85) 70%, rgba(41, 36, 66, 0.85) 100%) `
            }}>
                <Container maxWidth="lg" sx={{ mt: isMobile ? -3 : -8 }}  >
                    
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2">
                        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#FEAB77"
                            sx={{ mt: 2, mb: 2, fontSize: isMobile ? 28 : 'auto'}}
                        >
                            Predicciones en lote
                        </Typography>
                    </motion.div>
                    
                    <Card sx={{ background: 'rgba(65, 64, 64, 0.45)', maxWidth: 650, maxHeight: {sm: 415, md: 420}, mx: 'auto', 
                        p: { xs: 2, md: 2 }, borderRadius: 5 
                    }}>
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2">
                            <BatchPredicionFile />
                        </motion.div>
                    </Card>                       
                </Container>  
            </Box>
        </section>
    );
}

export default BatchPredictionPage;