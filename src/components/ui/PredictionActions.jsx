import { Box, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * PredictionActions Component
 * 
 * Botonera que se muestra después de realizar una predicción (todos los roles).
 * Permite al usuario:
 *  - Seguir vuelo → redirige a /auth/login (para login o seguimiento)
 *  - Nueva Predicción → redirige a /home para hacer otra predicción
 * 
 * Props:
 * - Ninguna
 * 
 * Hooks utilizados:
 * - useNavigate (react-router-dom) → para navegar entre rutas
 * 
 * Estilos:
 * - Box: flex row, centrado, gap 2, margin-top 2
 * - Botón "Seguir vuelo":
 *    - Contained, fondo #FEA062, color texto #E5E6EA
 *    - Hover: background #FEAB77
 *    - Padding: px 4, py 1
 *    - Font: size 14, weight 600
 *    - Border radius 1
 * - Botón "Nueva Predicción":
 *    - Contained transparente, color texto #E5E6EA
 *    - Hover: borde 1px sólido #E5E6EA
 *    - Padding: px 4, py 1
 *    - Font: size 14, weight 600
 *    - Border radius 1
 * 
 * Uso:
 * <PredictionActions />
 */

const PredictionActions = () => {
    const navigate = useNavigate();
    
    return (
        <Box sx={{ 
            position: 'relative',
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'center', 
            gap: 2 ,
            mt: 2
        }}>
            <Button onClick={() => navigate('/auth/login')} variant="contained"
                sx={{
                    backgroundColor: '#FEA062',
                    color: '#E5E6EA',
                    ":hover": { backgroundColor:'#FEAB77' },
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 1
                }}
            >
                Seguir vuelo
            </Button>

            <Button onClick={() => navigate('/home')} variant="contained"
                sx={{
                    backgroundColor: 'transparent',
                    color: '#E5E6EA',
                    ":hover": { border:'1px solid #E5E6EA' },
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 1
            }}>
                Nueva Predicción
            </Button>
        </Box>
    );
}

export default PredictionActions;