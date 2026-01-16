import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Grid from '@mui/material/Grid';
import { useTheme, useMediaQuery, Box, Stack, TextField, Button, MenuItem, Select, } from '@mui/material';
import AppAlert from '../ui/AppAlert'; 
import useAerolineas from'../../hooks/catalog/useAerolineas';
import useAeropuertos from '../../hooks/catalog/useAeropuertos';
import { prepareFlightFormData } from '../../services/formDataService';
import { calculateDistance } from '../../api/prediction.api';

/**
 * PredictionForm - Formulario para que el usuario ingrese datos de un vuelo y generar predicción.
 *
 * Props:
 * - onPredict: función async que se ejecuta al enviar el formulario con los datos válidos
 *
 * Hooks internos:
 * - useAerolineas: carga la lista de aerolíneas desde catálogo
 * - useAeropuertos: carga la lista de aeropuertos desde catálogo
 *
 * Estado local:
 * - aerolinea: aerolínea seleccionada
 * - origen: aeropuerto de origen
 * - destino: aeropuerto de destino
 * - fechaHora: fecha y hora del vuelo
 * - distancia: distancia del vuelo en km
 *
 * Características:
 * - Responsive: ajusta el formulario según pantalla móvil o desktop
 * - Validación mínima: no llama onPredict si los datos no son válidos
 * - Uso de Material UI Select y TextField con estilos personalizados
 * - Botón de envío estilizado
 */

const PredictionForm = ({ onPredict}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [localError, setLocalError] = useState("");
    const { aerolineas, loading: loadingAerolineas } = useAerolineas();
    const { aeropuertos, loading: loadingAeropuertos } = useAeropuertos();
    
    const [aerolinea, setAerolinea] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [distancia, setDistancia] = useState(null);
        
    useEffect(() => {
        if (!origen || !destino) return;

        const aeropuertoOrigen = aeropuertos.find(a => a.iata === origen);
        const aeropuertoDestino = aeropuertos.find(a => a.iata === destino);

        if (!aeropuertoOrigen || !aeropuertoDestino) return;

        const fetchDistancia = async () => {
            setDistancia(null);
            const km = await calculateDistance(aeropuertoOrigen, aeropuertoDestino);
            if (km !== null) setDistancia(Math.round(km));
            else setLocalError("No se pudo calcular la distancia");
        };

        fetchDistancia();
    }, [origen, destino, aeropuertos]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLocalError("");

        // Prepara los datos para la predicción
        distancia !== null ? distancia : '';
        if (distancia === null) {
            return setLocalError("Calculando distancia, espera un momento...");
        }
        const formData = prepareFlightFormData({ aerolinea, origen, destino, fechaHora, distancia });
        if (!formData) return setLocalError("Datos del vuelo incompletos");

        // Ejecuta la función de predicción pasada por props
        if (onPredict) {
        await onPredict(formData);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2">
            <Box component="form" onSubmit={handleFormSubmit}>
                <Stack spacing={2}>
                    {localError && <AppAlert severity="warning">{localError}</AppAlert>}

                    {/* Aerolínea */}
                    <Select value={aerolinea} disabled={loadingAerolineas} displayEmpty fullWidth
                        onChange={(e) => setAerolinea(e.target.value)}
                        sx={{ 
                            color: '#E5E6EA', textAlign: 'start', borderRadius: 4, height: 45, 
                            '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e5e6ea50' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e6ea50' },
                            '& .MuiSelect-select': { padding: '10px 14px' }
                        }}
                    >
                        <MenuItem value="" disabled>Aerolínea</MenuItem>
                        {aerolineas.map(a => (
                            <MenuItem key={a.id} value={a.iata}> {a.nombre} </MenuItem>
                        ))}
                    </Select>

                    {/* Origen | Destino (MISMA FILA) */}
                    <Grid container gap={0.5}>
                        <Grid item xs={6} width='49.5%'>
                            <Select value={origen} disabled={loadingAeropuertos} displayEmpty fullWidth
                                onChange={(e) => setOrigen(e.target.value)}
                                sx={{ color: '#E5E6EA', textAlign: 'start', borderRadius: 4, height: 45, 
                                    '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e5e6ea50' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e6ea50' },
                                    '& .MuiSelect-select': { padding: '10px 14px' }
                                }}
                            >
                            <MenuItem value="" disabled>Origen</MenuItem>
                                {aeropuertos.map(a => (
                                    <MenuItem key={a.id} value={a.iata}> {a.iata} - {a.nombre} </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={6} width='49.5%'>
                            <Select value={destino} disabled={loadingAeropuertos} displayEmpty fullWidth
                                onChange={(e) => setDestino(e.target.value)}
                                sx={{ color: '#E5E6EA', textAlign: 'start', borderRadius: 4, height: 45, 
                                    '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e5e6ea50' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e6ea50' },
                                    '& .MuiSelect-select': { padding: '10px 14px' }
                                }}
                            >
                            <MenuItem value="" disabled>Destino</MenuItem>
                                {aeropuertos.map(a => (
                                    <MenuItem key={a.id} value={a.iata}> {a.iata} - {a.nombre} </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>

                    {/* Fecha y hora */}
                    <TextField type="datetime-local" value={fechaHora} fullWidth
                        onChange={(e) => setFechaHora(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': { color: '#E5E6EA', borderRadius: 4, height: 45 }, 
                            '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e5e6ea50' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e6ea50' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '& .MuiOutlinedInput-input': { padding: '10px 14px' }
                        }}
                    />

                    {/* Distancia */}
                    {/* Borrar luego de que este lo de lat / long */}
                    {/* <TextField type="number" label="Distancia (km)" value={distancia}
                        onChange={(e) => setDistancia(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true, sx: { color: '#E5E6EA', '&.Mui-focused': { color: '#E5E6EA' }} }}
                        sx={{
                            '& .MuiOutlinedInput-root': { color: '#E5E6EA', borderRadius: 4, height: 45 }, 
                            '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e5e6ea50' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e6ea50' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '& .MuiOutlinedInput-input': { padding: '10px 14px' }
                        }}
                    /> */}

                    {/* Botón */}
                    <Button type="submit" variant="contained" fullWidth size="large"
                        sx={{
                            backgroundColor: '#222E60',
                            color: '#E5E6EA',
                            ":hover": { backgroundColor:'#292442' },
                            px: 5,
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            fontSize: 18,
                            borderRadius: 4
                        }}
                    >
                        Predecir vuelo
                    </Button>
                </Stack>
            </Box>
        </motion.div>
    );
}

export default PredictionForm;