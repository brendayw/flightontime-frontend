import { useTheme, useMediaQuery, Box } from '@mui/material';
import useDashboard from '../../hooks/useDashboard';

const DashboardStats = () => {
    const { history, loading, error } = useDashboard();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (loading) return <p className='text-[#251A79] text-center'>Cargando estadísticas...</p>;
    if (error) return <p className='text-[#251A79] text-center'>Error al cargar estadísticas</p>;

  
    const total = history.length;
    const puntuales = total === 0
        ? 0
        : ((history.filter(h => h.prevision?.toLowerCase().trim() === "a tiempo").length / total) * 100).toFixed(1);

    const retrasos = total === 0
        ? 0
        : ((history.filter(h => h.prevision?.toLowerCase().trim() === "retraso").length / total) * 100).toFixed(1);

    const stats = [
        { title: '📊 Total de predicciones', value: total, bg: 'bg-gray-100', textColor: '#251A79' },
        { title: '🟢 Puntuales', value: `${puntuales}%`, bg: 'bg-green-100', textColor: '#2e7d32' },
        { title: '🔴 Retrasos', value: `${retrasos}%`, bg: 'bg-red-100', textColor: '#d32f2f' },
    ];

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: isMobile ? 'column' : { md:'row', lg: 'row',},
                flexWrap: 'wrap',
                left: isMobile ? 0 : { sm: 52, md: 12, lg: 24, xl: 0},
                justifyContent: 'center',
                gap: 3,
                width: '100%',
                maxWidth: isMobile ? '100%' : { sm: '100%', md: '93%', xl: '100%'},
                mx: 'auto',
        }}>
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className={`${isMobile ? 'w-full' : 'w-[280px]'} text-center p-4 ${stat.bg} rounded-lg shadow`}
                >
                    <span className='text-xl font-medium block'style={{ color: stat.textColor }}>
                        {stat.title}
                    </span>
                    <span className='text-2xl font-bold' style={{ color: stat.textColor }}>
                        {stat.value}
                    </span>
                </div>
            ))}
        </Box>
    );
};


export default DashboardStats;