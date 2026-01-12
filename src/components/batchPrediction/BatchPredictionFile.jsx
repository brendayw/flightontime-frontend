import { useMediaQuery, useTheme, Stack, Card, CardContent, Button, Typography, Box, Alert } from '@mui/material'; 
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
import useBatchPrediction from '../../hooks/useBatchPrediction'; 
import useAuth from '../../hooks/useAuth';

const BatchPredictionFile = () => {
    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuth();
    const { file, loading, error, result, predictions, selectFile, upload, reset } = useBatchPrediction(); 

    const handleUpload = async () => {
        await upload();
    };

    useEffect(() => {
        if (result && predictions && predictions.length > 0 && !loading) {
            const timer = setTimeout(() => {
                const targetRoute = isAuthenticated
                    ? '/predictions'
                    : '/predictions-guest';

                navigate(targetRoute, {
                    state: {
                        predictions,
                        isBatch: true,
                    },
                });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [result, predictions, loading, navigate, isAuthenticated]);
    
    return ( 
        <Box>
            <Stack spacing={1}>
                <CardContent >
                    {/* Instrucciones del formato esperado */} 
                    <Alert severity="info" sx={{ mb: 0.8, fontSize: '0.8rem' }}>

                        <Typography variant="caption" display="block" mb={0.5} textAlign="start"> 
                            <strong>Formato requerido:</strong> 
                        </Typography> 
                        
                        <Typography variant="caption" display="block" textAlign="start"> 
                            • Separador: <strong>coma (,)</strong> 
                        </Typography> 

                        <Typography variant="caption" display="block" textAlign="start"> 
                            • Columnas: aerolinea,origen,destino,fecha_partida,distancia_km 
                        </Typography>
                        
                        <Typography variant="caption" display="block" textAlign="start"> 
                            • Fecha formato ISO: <strong>YYYY-MM-DDTHH:mm:ss</strong> 
                        </Typography> 
                        
                        <Typography variant="caption" display="block" mt={0.5} textAlign="start"> 
                            <strong>Ejemplo:</strong>
                            <br/> aerolinea,origen,destino,fecha_partida,distancia_km
                            <br/> AA,JFK,MIA,2025-02-15T10:30:00,1759 
                        </Typography> 
                    </Alert> 

                    {result && ( 
                        <Alert severity="success" sx={{ mb: 2 }}> 
                            ✅ Procesados: {result.total} vuelos | ✓ Exitosos: {result.ok} | ✗ Errores: {result.error}
                            <Typography variant="caption" display="block" mt={1}>
                                Redirigiendo a resultados...
                            </Typography>
                        </Alert> 
                    )} 

                    {!result && ( 
                        <> 
                            <Box sx={{ border: '2px dashed #feab7780', borderRadius: 2, p: 3, textAlign: 'center', }} >
                                <Typography color='#e5e6ea9f' fontSize='12px' mb={1}> 
                                    Arrastrá tu archivo CSV o hacé click para seleccionarlo
                                </Typography> 
                                
                                <Button variant='outlined' component='label' disabled={loading} sx={{ mt: 2, color:'#e5e6ea9f', fontWeight: 600, borderColor: '#e5e6ea9f', }} > 
                                    Seleccionar archivo 
                                    <input type='file' accept='.csv' hidden onChange={(e) => selectFile(e.target.files?.[0])} /> 
                                </Button> 
                            </Box> 
                            
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}> 
                                <Button onClick={handleUpload} disabled={!file || loading} sx={{ px: 4,backgroundColor: '#251A79', color: '#FEFFFA', fontWeight: 600, textTransform: "none", '&:disabled': { backgroundColor: '#cccccc', color: '#5c5555', }, '&:hover': { backgroundColor: "#1d145f" } }} > 
                                    
                                    {loading ? 'Procesando...' : 'Predecir'} 
                                </Button> 
                            </Box> 
                        </> 
                    )} 
                </CardContent>
            </Stack>
        </Box>
    ); 
} 

export default BatchPredictionFile;