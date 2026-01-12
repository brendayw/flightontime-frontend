import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useTheme, useMediaQuery, Box, Stack, TextField, Button, MenuItem, Select, } from '@mui/material';
import useAerolineas from'../../hooks/core/useAerolineas';
import useAeropuertos from '../../hooks/core/useAeropuertos';

const PredictionForm = ({ onPredict}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { aerolineas, loading: loadingAerolineas } = useAerolineas();
    const { aeropuertos, loading: loadingAeropuertos } = useAeropuertos();
    
    const [aerolinea, setAerolinea] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [distancia, setDistancia] = useState('');
        
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (!aerolinea || !origen || !destino || !fechaHora || !distancia) return;
    
        const distanciaInt = parseInt(distancia);
        if (isNaN(distanciaInt) || distanciaInt <= 0) return;
    
        const formData = {
            aerolinea: aerolinea.trim(),
            origen: origen.trim(),
            destino: destino.trim(),
            fecha_partida: `${fechaHora}:00`,
            distancia_km: parseInt(distancia),
        };

        if (onPredict) {
            await onPredict(formData);
        }
    }

    if (loadingAerolineas || loadingAeropuertos) {
        return <p>Cargando datos...</p>;
    }

    return (
        <Box component="form" onSubmit={handleFormSubmit}>
            <Stack spacing={2}>
                {/* Aerolínea */}
                <Select
                    value={aerolinea}
                    onChange={(e) => setAerolinea(e.target.value)}
                    fullWidth
                    displayEmpty
                    sx={{ color: '#E5E6EA', textAlign: 'start', borderRadius: 4, height: 45, 
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid #e5e6ea50' },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e5e6ea50',
                        },
                        '& .MuiSelect-select': {
                            padding: '10px 14px',
                        },
                    }}
                >
                    <MenuItem value="" disabled>Aerolínea</MenuItem>
                    {aerolineas.map(a => (
                        <MenuItem key={a.id} value={a.iata}>
                            {a.nombre}
                        </MenuItem>
                    ))}
                </Select>

                {/* Origen | Destino (MISMA FILA) */}
                <Grid container gap={0.5}>
                    <Grid item xs={6} width='49.5%'>
                        <Select
                            value={origen}
                            onChange={(e) => setOrigen(e.target.value)}
                            fullWidth
                            displayEmpty
                            sx={{ color: '#E5E6EA', textAlign: 'start', borderRadius: 4, height: 45, 
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid #e5e6ea50' },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e5e6ea50',
                                },
                                '& .MuiSelect-select': {
                                    padding: '10px 14px',
                                },
                            }}
                        >
                        <MenuItem value="" disabled>Origen</MenuItem>
                            {aeropuertos.map(a => (
                                <MenuItem key={a.id} value={a.iata}>
                                    {a.iata} - {a.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={6} width='49.5%'>
                        <Select
                            value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            fullWidth
                            displayEmpty
                            sx={{ color: '#E5E6EA', textAlign: 'start', borderRadius: 4, height: 45, 
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid #e5e6ea50' },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e5e6ea50',
                                },
                                '& .MuiSelect-select': {
                                    padding: '10px 14px',
                                },
                            }}
                        >
                        <MenuItem value="" disabled>Destino</MenuItem>
                            {aeropuertos.map(a => (
                                <MenuItem key={a.id} value={a.iata}>
                                    {a.iata} - {a.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>

                {/* Fecha y hora */}
                <TextField
                    type="datetime-local"
                    value={fechaHora}
                    onChange={(e) => setFechaHora(e.target.value)}
                    fullWidth
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
                <TextField
                    label="Distancia (km)"
                    type="number"
                    fullWidth
                    value={distancia}
                    onChange={(e) => setDistancia(e.target.value)}
                    InputLabelProps={{ shrink: true, sx: { color: '#E5E6EA', '&.Mui-focused': {
                        color: '#E5E6EA' }} }}
                    sx={{
                        '& .MuiOutlinedInput-root': { color: '#E5E6EA', borderRadius: 4, height: 45 }, 
                        '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #e5e6ea50' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e6ea50' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiOutlinedInput-input': { padding: '10px 14px' }
                    }}
                />

                {/* Botón */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
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
    );
}

export default PredictionForm;