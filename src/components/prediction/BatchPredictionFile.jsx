import { useMediaQuery, useTheme, Card, CardContent, Button, Typography, Box } from '@mui/material';
import Title from '../ui/Title';

const BatchPredictionModal = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleSubmit = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        console.log('Archivo CSV:', file);
        // llamada al backend
    };

    return (
        <Card
            sx={{
                width: isMobile ? '90%' : { sm: '75%', md: '85%', lg: '90%', xl: '100%' },
                maxWidth: 750,
                height: isMobile ? 'auto' : 300,
                p: isMobile ? 2 : { sm: 4, md: 4, lg: 3.5, xl: 4 },
                marginBottom: isMobile ? 8 : 0,
                borderRadius: 5,
                overflow: 'hidden',
                backgroundColor: '#F9F3F3',
        }}>

            <Title titulo='Predicción en lote' className='text-2xl text-[#251A79] text-center font-medium'/>

            <CardContent>
                <Typography variant='body2' color='#FF854C' textAlign='center' mb={2}
                >
                    Subí un archivo CSV con múltiples vuelos para obtener sus
                    predicciones de retraso.
                </Typography>

                <Box
                    sx={{
                        border: '2px dashed #ff854c7e',
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                    }}
                >
                    <Typography color='#ff854cb7' fontSize='12px' mb={1}>
                        Arrastrá tu archivo CSV o hacé click para seleccionarlo
                    </Typography>

                    <Button
                        variant='outlined'
                        component='label'
                        sx={{
                            mt: 2,
                            color: '#ff854c7e',
                            fontWeight: 600,
                            borderColor: '#ff854c7e',
                        }}
                    >
                        Seleccionar archivo
                        <input
                            type='file'
                            accept='.csv'
                            hidden
                            onChange={handleSubmit}
                        />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default BatchPredictionModal;