import { useTheme, useMediaQuery,Card } from '@mui/material';
import { motion } from 'framer-motion';

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

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.03, boxShadow: '0px 8px 15px rgba(0,0,0,0.2)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ display: 'inline-block', borderRadius: 16 }} // evita que el hover afecte layout
        >
            <Card sx={{
                background: 'rgba(41, 36, 66, 0.5)',
                color: '#EAE8EC',
                width: isMobile ? 450 : 250,
                height: isMobile ? 200 : 250,
                alignContent: 'center',
                borderRadius: 4,
                ...sx // permite extender estilos
            }}>
                {children}
            </Card>
        </motion.div>
    );
}

export default BaseCard;