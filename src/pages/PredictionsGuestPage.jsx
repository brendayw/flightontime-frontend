import { useTheme, useMediaQuery, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Header, ResultsList, Features, CTA, Footer, PredictionActions } from '../components';

const PredictionsGuestPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    const predictions = location.state?.predictions || [];
    const isBatch = location.state?.isBatch || predictions.length > 1;
    
    return (
        <>
            <Header />
            <Box sx={{ width: '100vw', textAlign: 'center', pt: { xs: 12, md: 12 }, pb: { xs: 10, md: 8 },
                backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%, rgba(74, 58, 87, 0.85) 45%,
                    rgba(254, 160, 98, 0.85) 50%, rgba(254, 171, 119, 0.85) 55%,
                    rgba(74, 58, 87, 0.85) 70%, rgba(41, 36, 66, 0.85) 100%) `
            }}>
                <ResultsList predictions={predictions} isBatch={isBatch} />
                <PredictionActions />
            </Box>
            
            <Features />
            <CTA />
            <Footer />
        </> 
    );
};

export default PredictionsGuestPage;