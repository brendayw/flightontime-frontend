import { useTheme, useMediaQuery, Card, CardContent, Typography, Box } from '@mui/material';

const ResultsCount = ({ total, loading = false, isBatch = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    //const [predictions, setPredictions] = useState([]);

    return (
        <Card 
            sx={{
                borderRadius: '25px',
                background: 'rgba(65, 64, 64, 0.45)',
                boxShadow: 'inherit',
                border: '0.5px solid #d9d9d954',
                width: isMobile ? '95%' : { sm: '80%', md: 600},
                height: isMobile ? 60 : 60,
                overflow: 'hidden'
            }}
        >
            <CardContent 
                sx={{ 
                    p: isMobile ? 1.5 : 0, 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <Box sx={{ 
                    p: isMobile ? 1 : 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                }}>

                    <Typography fontWeight={600} ml={2} color='#E5E6EA'> Predicciones </Typography>

                    <Typography color='#E5E6EA'>
                        | Total{" "} 
                        <Box component="span" sx={{ color: "#FEA062", fontWeight: 600 }} >
                            {loading ? "..." : `${total} resultado${total !== 1 ? 's' : ''}`}
                        </Box>
                    </Typography>
                    
                </Box>
            </CardContent>
        </Card>
    );
}

export default ResultsCount;