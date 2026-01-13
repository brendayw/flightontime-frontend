import { useTheme, useMediaQuery, Box } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import useDashboardSummary from '../../hooks/useDashboardSummary';
import AppAlert from '../ui/AppAlert';

/**
 * Componente DashboardStats
 * 
 * Muestra un resumen visual de estadísticas de predicciones de vuelos:
 * - Total de predicciones
 * - Porcentaje de predicciones a tiempo
 * - Porcentaje de predicciones con retraso
 * 
 * Obtiene los datos mediante el hook useDashboardSummary().
 * Adapta el layout para dispositivos móviles usando MUI useMediaQuery.
 * 
 * Uso:
 * <DashboardStats />
 */

const DashboardStats = () => {
    const { summary, error } = useDashboardSummary();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (error || !summary) {
        return (
            <div className="px-4 py-4">
                <AppAlert severity="error">Error al cargar datos</AppAlert>
            </div>
        );
    }
    // Datos a mostrar en tarjetas
    const stats = [
        {
            title: 'Predicciones totales',
            value: summary.totalPredicciones,
            icon: '#e5e6ead8',
            iconbg: 'rgba(37, 26, 121, 0.25)',
            textColor: '#E5E6EA',
        },
        {
            title: 'Predicciones a tiempo',
            value: `${summary.porcentajePuntuales.toFixed(1)}%`,
            icon: '#B0B8F9',
            iconbg: 'rgba(176, 184, 249, 0.25)',
            textColor: '#E5E6EA',
        },
        {
            title: 'Predicciones con retraso',
            value: `${summary.porcentajeRetrasos.toFixed(1)}%`,
            icon: '#FEA062',
            iconbg: 'rgba(254, 160, 98, 0.25)',
            textColor: '#E5E6EA',
        },
    ]

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: isMobile ? 'column' : { md:'row', lg: 'row' },
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: isMobile ? 2 : 8,
                width: '100%',
                maxWidth: isMobile ? '100%' : { sm: '100%', md: '93%', xl: '100%'},
                mx: 'auto'
        }}>
            {stats.map((stat, idx) => (
                <div key={idx} 
                    className={`${isMobile ? 'w-full h-[100px] flex items-center justify-between gap-4' : 'w-[300px] h-[250px]'} p-6 ${stat.bg} rounded-lg shadow border border-[#F9F3F3]` }
                >
                    <span key={idx} >
                        <FlightIcon sx={{ p: 1, background: stat.iconbg, display: 'flex', textAlign: 'start', transform: 'rotate(90deg)',
                            width: 55, height: 55, color: stat.icon, borderRadius: 4 }}
                        />
                    </span>
                    <span className={`${isMobile ? 'text-lg': 'text-xl block mt-6 pb-8'}`} style={{ color: stat.textColor }}>
                        {stat.title}
                    </span>
                    <span className={`${isMobile ? 'text-2xl font-bold' : 'text-5xl font-bold'}`} style={{ color: stat.textColor }}>
                        {stat.value}
                    </span>
                </div>
            ))}
        </Box>
    );
};


export default DashboardStats;