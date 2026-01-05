import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery, Alert, Box, Button } from '@mui/material';
import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import PredictionForm from '../components/prediction/PredictionForm';
import usePrediction from '../hooks/usePrediction';

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        <section id='home' className='min-w-screen min-h-screen bg-[#ffffff]'
            style={{
                width: '100vw',
                paddingBottom: isMobile ? '90px' : '0px',
            }}
        >
            <Header predicted={false} />
            <Menu />
            
            <div className='flex flex-col items-center mt-20 gap-6'>

                <PredictionForm variant='default' onPredict={handlePredict} />

                {error && (
                    <Box sx={{ width: '100%', maxWidth: 600, px: 2 }}>
                        <Alert severity='error'>{error}</Alert>
                    </Box>
                )}

            </div>
        </section>
    );

}

export default Home;