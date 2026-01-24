import { useMediaQuery, useTheme, Stack, CardContent, 
    Button, Typography, Box, Alert } from '@mui/material'; 
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';
import useBatchPrediction from '../../hooks/prediction/useBatchPrediction'; 
import formatBatchError from '../../utils/formatBatchError';
import useAuth from '../../hooks/auth/useAuth';

/**
 * Componente para subir un archivo CSV con predicciones de vuelos en batch.
 * 
 * Funcionalidades:
 * - Permite seleccionar un archivo CSV arrastrándolo o mediante botón.
 * - Muestra las instrucciones de formato esperado.
 * - Llama al backend para procesar el archivo mediante useBatchPrediction().
 * - Muestra un resumen de resultados (total, exitosos, errores) tras el procesamiento.
 * - Redirige automáticamente a la pantalla de resultados (/predictions o /predictions-guest) una vez completado.
 * 
 * Uso:
 * <BatchPredictionFile />
 */

const BatchPredictionFile = () => {
    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { file, loading, error, result, predictions, rowErrors, originalData, 
        selectFile, upload, reset } = useBatchPrediction(); 

    /**
     * Función que ejecuta la subida y predicción del archivo.
     * Se llama al presionar el botón "Predecir".
     */
    const handleUpload = async () => {
        await upload();
    };

    /**
     * useEffect para redirigir automáticamente al usuario a la pantalla de resultados
     * una vez que se procesan las predicciones.
     */
    useEffect(() => {
        if (result && result.error === 0 && predictions && predictions.length > 0 && !loading) {
            const timer = setTimeout(() => {
                const targetRoute = isAuthenticated ? '/predictions' : '/predictions-guest';
                navigate(targetRoute, { state: { predictions, isBatch: true } });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [result, predictions, loading, navigate, isAuthenticated]);
    
    return ( 
        <Box sx={{ width: '100%' }}>
            <Stack spacing={1} >
                <CardContent>
                    {/* Instrucciones del formato esperado */} 
                    <Alert severity="info" sx={{ width: '100%', wordBreak: 'break-word', overflowWrap: 'anywhere', 
                        px: { xs: 2, sm: 2 }, py: { xs: 1, sm: 1.5 }, boxSizing: 'border-box', mb: 2, fontSize: '0.8rem' 
                    }}>
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

                    {/* Error general */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Mostrar archivo seleccionado */} 
                    {file && !result && ( 
                        <Alert severity="success" sx={{ display: 'flex', textAlign: 'start', bordBreak: 'break-word', overflowWrap: 'anywhere',   mb: 2 }}> 
                            Archivo seleccionado: <strong>{file.name}</strong> 
                        </Alert> 
                    )} 


                    {/* Alert de éxito solo si NO hay errores */}
                    {result && result.error === 0 && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ✅ Procesados: {result.total} vuelos | ✓ Exitosos: {result.ok} | ✗ Errores: {result.error}
                            <Typography variant="caption" display="block" mt={1}>
                                Redirigiendo a resultados...
                            </Typography>
                        </Alert>
                    )}

                    {/* Alert de warning si hay errores */}
                    {result && result.error > 0 && (
                        <Alert severity="warning" sx={{ textAlign: 'start', fontWeight:600, fontSize: '0.8rem', mb: 2 }}>
                            Hubo errores en el archivo. No se procesaron todos los vuelos.
                            <Typography variant="caption" display="block" textAlign={'start'} mt={1}>
                                Revisá los errores listados abajo antes de intentar nuevamente.
                            </Typography>
                        </Alert>
                    )}

                    {/* Lista de errores detallada */}
                    {rowErrors.length > 0 && (
                        <Alert severity="error" sx={{ display: 'flex', textAlign: 'start', mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={600} fontSize={12} textAlign={'start'} mb={1}>Errores encontrados:</Typography>
                            <ul>
                                {rowErrors.map((err, index) => (
                                    <li key={index}>
                                        <Typography variant="caption" sx={{ textAlign: 'start' }}>
                                            {formatBatchError(err, originalData[index] || {})}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    {result?.error > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={reset} 
                                sx={{ px: 4,backgroundColor: '#251A79', color: '#FEFFFA', fontWeight: 600, textTransform: "none", '&:hover': { backgroundColor: "#1d145f" } }}
                            >
                                Subir otro archivo
                            </Button>
                        </Box>
                    )}

                    {!result && ( 
                        <> 
                            <Box sx={{ border: '2px dashed #feab7780', borderRadius: 2, p: 3, textAlign: 'center' }} >
                                <Typography color='#e5e6ea9f' fontSize='12px' mb={1}> 
                                    Arrastrá tu archivo CSV o hacé click para seleccionarlo
                                </Typography> 
                                
                                <Button variant='outlined' component='label' disabled={loading} sx={{ mt: 2, color:'#e5e6ea9f', fontWeight: 600, borderColor: '#e5e6ea9f' }} > 
                                    Seleccionar archivo 
                                    <input type='file' accept='.csv' hidden 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) selectFile(file); //funcion asincrona para selecionar el archivo
                                        }}  
                                    /> 
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