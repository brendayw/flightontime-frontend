import { useMediaQuery, useTheme, Card, CardContent, Button, Typography, Box, Alert } from '@mui/material'; 
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
import useBatchPrediction from '../../hooks/useBatchPrediction'; 
import Title from '../ui/Title'; 

const BatchPredictionFile = () => {
    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const navigate = useNavigate();
    const { file, loading, error, result, predictions, selectFile, upload, reset } = useBatchPrediction(); 

    const handleUpload = async () => {
        await upload();
    };

    useEffect(() => {
        if (result && predictions && predictions.length > 0 && !loading) {
            const timer = setTimeout(() => {
                navigate('/predictions', { 
                    state: { 
                        predictions: predictions,
                        isBatch: true 
                    } 
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [result, predictions, loading, navigate]);
    
    return ( 
        <Card 
            sx={{ 
                width: isMobile ? '90%' : { sm: '75%', md: '85%', lg: '90%', xl: '100%' }, 
                maxWidth: 750, 
                height: isMobile ? 'auto' : 'auto', 
                p: isMobile ? 2 : { sm: 4, md: 4, lg: 3.5, xl: 4 }, 
                marginBottom: isMobile ? 8 : 0, 
                borderRadius: 5, 
                overflow: 'hidden', 
                backgroundColor: '#F9F3F3', 
        }}> 
            <Title titulo='Predicción en lote' className='text-2xl text-[#251A79] text-center font-medium'/> 
            
            <CardContent> 
                <Typography variant='body2' color='#FF854C' textAlign='center' mb={2}> 
                    Subí un archivo CSV con múltiples vuelos para obtener sus predicciones de retraso. 
                </Typography> 
                
                {/* Instrucciones del formato esperado */} 
                <Alert severity="info" sx={{ mb: 2, fontSize: '0.85rem' }}> 
                    <Typography variant="caption" display="block" mb={0.5}> 
                        <strong>Formato requerido:</strong> 
                    </Typography> 
                    
                    <Typography variant="caption" display="block"> 
                        • Separador: <strong>coma (,)</strong> 
                    </Typography> 
                    <Typography variant="caption" display="block"> 
                        • Columnas: aerolinea,origen,destino,fecha_partida,distancia_km 
                    </Typography>
                    
                    <Typography variant="caption" display="block"> 
                        • Fecha formato ISO: <strong>YYYY-MM-DDTHH:mm:ss</strong> 
                    </Typography> 
                    
                    <Typography variant="caption" display="block" mt={0.5}> 
                        <strong>Ejemplo:</strong>
                        <br/> aerolinea,origen,destino,fecha_partida,distancia_km
                        <br/> AA,JFK,MIA,2025-02-15T10:30:00,1759 
                    </Typography> 
                    
                </Alert> 
                {/* Mostrar error si existe */} 
                {error && ( 
                    <Alert severity="error" sx={{ mb: 2 }}> {error} 
                    </Alert> 
                )} 
                
                {/* Mostrar archivo seleccionado */} 
                {file && !result && ( 
                    <Alert severity="success" sx={{ mb: 2 }}> 
                        Archivo seleccionado: <strong>{file.name}</strong> 
                    </Alert> 
                )} 
                
                {/* Mostrar resultado exitoso */} 
                
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
                        <Box sx={{ border: '2px dashed #ff854c7e', borderRadius: 2, p: 3, textAlign: 'center', }} >
                            <Typography color='#ff854cb7' fontSize='12px' mb={1}> 
                                Arrastrá tu archivo CSV o hacé click para seleccionarlo
                            </Typography> 
                            
                            <Button variant='outlined' component='label' disabled={loading} 
                                sx={{ 
                                    mt: 2, color: '#ff854c7e', fontWeight: 600, borderColor: '#ff854c7e', textTransform: "none" 
                                }} 
                            > 
                                Seleccionar archivo 
                                <input type='file' accept='.csv' hidden onChange={(e) => selectFile(e.target.files?.[0])} /> 
                            </Button> 
                        </Box> 
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}> 
                            <Button onClick={handleUpload} disabled={!file || loading} 
                                sx={{ 
                                    px: 4, backgroundColor: '#ff854c', color: '#ffffff', fontWeight: 600, textTransform: "none", 
                                    '&:disabled': { backgroundColor: '#cccccc', color: '#666666', }, '&:hover': { backgroundColor: '#e6764a' } 
                                }} 
                            > 
                                
                                {loading ? 'Procesando...' : 'Predecir'} 
                            </Button> 
                        </Box> 
                    </> 
                )} 
            </CardContent> 
        </Card> 
    ); 
} 

export default BatchPredictionFile;