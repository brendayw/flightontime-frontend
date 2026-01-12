import { useTheme, useMediaQuery, Typography, Box } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{background:'linear-gradient(to right, rgba(34, 46, 96, 0.92), rgba(37, 26, 121, 0.85), rgba(121, 137, 244, 0.73))'}} color="white" py={1} textAlign="center">
            <Typography variant="body2">
                © 2026 Flight On Time - Todos los derechos reservados
            </Typography>
        </Box>
    );
}

export default Footer;