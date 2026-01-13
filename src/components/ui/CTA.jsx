import { useTheme, useMediaQuery, Box, Container, Typography, Stack, Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate  } from 'react-router-dom';

/**
 * CTA Component
 * 
 * Componente de llamada a la acción que invita a los usuarios a registrarse o recibir notificaciones de vuelos.
 * Se utiliza generalmente en la página Home o landing page para usuarios no autenticados.
 * 
 * Comportamiento:
 * - Muestra un título centrado: "¿Quieres estar siempre informado?"
 * - Muestra dos botones:
 *    1. Login → redirige a /auth/login usando useNavigate
 *    2. Seguir vuelos y recibir notificaciones → botón principal con icono
 * - Adaptable a pantallas móviles:
 *    - isMobile: stack de botones en columna
 *    - no mobile: stack de botones en fila
 * 
 * Hooks utilizados:
 * - useTheme (MUI) → para obtener el theme y breakpoints
 * - useMediaQuery (MUI) → para detectar tamaño de pantalla
 * - useNavigate (react-router-dom) → navegación a rutas internas
 * 
 * Props:
 * - Ninguna
 * 
 * Estilos:
 * - Box: background con gradiente lineal, color de texto blanco, padding vertical 6, texto centrado
 * - Container: ancho máximo 'md'
 * - Typography: h6, bold, color #EAE8EC
 * - Stack: espacio entre botones 3, justifyContent center, dirección columna en móviles, fila en desktop
 * - Botones:
 *    - Login: outlined, color inherit, size large
 *    - Notificaciones: contained, color de fondo #FEA062, size large, startIcon NotificationsActiveIcon
 * 
 * Uso:
 * <CTA />
 */

const CTA = () => {
    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const navigate = useNavigate();

    return (
        <Box sx={{ color: 'white',py: 6, textAlign: 'center',
            backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%, rgba(74, 58, 87, 0.85) 45%,
                rgba(254, 160, 98, 0.85) 50%, rgba(254, 171, 119, 0.85) 55%,
                rgba(74, 58, 87, 0.85) 70%, rgba(41, 36, 66, 0.85) 100%)
            `
        }}
        >
            <Container maxWidth="md">
                <Typography variant="h6" component="h1" gutterBottom  color='#EAE8EC' fontWeight="bold">
                    ¿Quieres estar siempre informado?”
                </Typography>

                <Stack direction={isMobile ? 'column' : 'row'} spacing={3} justifyContent="center" sx={{ mt: 4 }}>
                    <Button onClick={() => navigate('/auth/login')} variant="outlined" color="inherit" size="large">
                        Login
                    </Button>

                    <Button variant="contained" style={{ background:"#FEA062"}} size="large" startIcon={<NotificationsActiveIcon />}>
                        Seguir vuelos y recibir notificaciones
                    </Button>
                </Stack>
            </Container>
        </Box>
    )
}

export default CTA;