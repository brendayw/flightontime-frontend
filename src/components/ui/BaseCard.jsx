import { useTheme, useMediaQuery,Card } from '@mui/material';

/**
 * BaseCard Component
 * 
 * Componente reutilizable para tarjetas (cards) en la aplicación.
 * Proporciona un estilo base y permite extenderlo mediante la prop `sx`.
 * 
 * Props:
 * @param {React.ReactNode} children - Contenido que se renderizará dentro de la card.
 * @param {object} sx - Objeto con estilos adicionales de MUI para personalizar la card.
 * 
 * Comportamiento:
 * - Renderiza un Card de MUI con estilos predeterminados:
 *    - Fondo: rgba(41, 36, 66, 0.5)
 *    - Texto: color #EAE8EC
 *    - Ancho: 250px
 *    - Bordes redondeados: 4
 *    - Alineación del contenido centrada
 * - Permite extender estilos mediante la prop `sx` (merge de estilos).
 * - Ideal para envolver iconos, títulos y textos en secciones de Features u otras tarjetas.
 * 
 * Uso:
 * <BaseCard sx={{ p: 3, textAlign: 'center' }}>
 *    <Typography variant="h6">Título</Typography>
 *    <Typography variant="body2">Descripción</Typography>
 * </BaseCard>
 */

const BaseCard = ({ children, sx }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card sx={{
            background: 'rgba(41, 36, 66, 0.5)',
            color: '#EAE8EC',
            width: isMobile ? 450 : 250,
            alignContent: 'center',
            borderRadius: 4,
            ...sx // permite extender estilos
        }}>
            {children}
        </Card>
    );
}

export default BaseCard;