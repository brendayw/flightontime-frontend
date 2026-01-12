import { useTheme, useMediaQuery, Box, Container, Typography, Stack, Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate  } from 'react-router-dom';

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