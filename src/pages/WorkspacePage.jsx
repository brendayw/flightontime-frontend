import { useTheme, useMediaQuery, Card, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/ui/Header';
import Menu from '../components/layout/Menu';
import PredictionForm from '../components/prediction/PredictionForm';
import NotifyToggle from '../components/ui/NotifyToggle';
import usePrediction from '../hooks/usePrediction';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Header />
                <Menu />
            </motion.div>

            <Box sx={{ width: '100vw', textAlign: 'center', pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 16 } }}>
                <Container maxWidth="lg" sx={{ mt: -4 }}  >

                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants}>
                            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#FEAB77">
                                ¡Bienvenido!
                            </Typography>
                        </motion.div>
                    </motion.div>

                    <Card sx={{ background: 'rgba(65, 64, 64, 0.45)',
                        maxWidth: 650, mx: 'auto', p: { xs: 3, md: 2 }, borderRadius: 5 
                    }}>
                        <motion.div variants={itemVariants}>
                            <PredictionForm onPredict={handlePredict} />
                        </motion.div>
      
                        {/* NotifyToggle */}
                        <motion.div variants={itemVariants} transition={{ type: "spring", stiffness: 300 }}
                            style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}
                        >
                            <NotifyToggle />
                        </motion.div>
                        </Card>
                </Container>
            </Box>  
        </section>
    );
}

export default WorkspacePage;