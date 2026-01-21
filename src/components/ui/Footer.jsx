import { Typography, Box } from '@mui/material';

/**
 * Footer Component
 * 
 * Componente que muestra el pie de página de la aplicación Flight On Time.
 * Contiene un mensaje de derechos reservados centrado.
 * 
 * Props:
 * - Ninguna
 * 
 * Comportamiento:
 * - Siempre se muestra en la parte inferior de la página.
 * - Muestra el texto: "© 2026 Flight On Time - Todos los derechos reservados".
 * 
 * Estilos:
 * - Fondo: gradiente lineal de azul oscuro a violeta claro (rgba)
 * - Texto: color blanco
 * - Padding vertical: 8px (py={1})
 * - Texto centrado (textAlign="center")
 * 
 * Uso:
 * <Footer />
 */

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