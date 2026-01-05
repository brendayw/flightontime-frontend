import { useTheme, useMediaQuery } from '@mui/material';
import useDashboard from '../../hooks/useDashboard';
import Title from '../ui/Title';
import PrediccionesStatusChart from './PrediccionesStatusChart';
import PrediccionesDistributionChart from './PrediccionesDistributionChart';
import PrediccionesEvolutionChart from './PrediccionesEvolutionChart';
import PrediccionesPorVueloChart from './PrediccionesPorVueloChart';
import DashboardStats from './DashboardStats';

const DashboardCharts = () => {
    const { summary, history, loading, error } = useDashboard();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (loading) return <p className='text-[#251A79] text-center'>Cargando dashboard...</p>;
    if (error) return <p className='text-[#251A79] text-center'>{error}</p>;

    return (
        <div className={`w-full ${isMobile ? 'px-2' : 'px-6'} py-2 space-y-6`}>

            <div className={`relative w-100% ${isMobile ? 'left-0' : 'left-16 md:left-24 lg:left-16 xl:left-0'} mr-6`}>
                <Title titulo='Dashboard de Predicciones de Vuelos' className='text-[#251A79] text-2xl font-medium text-start mb-6'/>

                <p className='text-[#000000] italic text-lg text-start mb-6'>
                    Visualización en tiempo real basada en datos almacenados en nuestra BDD.
                </p>
            </div>

            <DashboardStats />

            <div className={`w-[95%] grid ${isMobile ? 'w-[100%] grid-cols-1' : 'sm:grid-cols-1 md:grid-cols-2 items-center xl:w-[100%]'} gap-6`}>
                <div className={`w-[95%] relative ${isMobile ? 'left-0 w-[100%]': 'left-12 md:left-12 lg:left-16 xl:left-0 xl:w-[100%]'} `}>
                    <Title titulo='Estado de las predicciones' className={`text-[#251A79] ${isMobile ? 'text-base' : 'text-lg'} text-center p-3`} />
                    <PrediccionesStatusChart summary={summary} />
                </div>
                
                <div className={`w-[95%] relative ${isMobile ? 'left-0 w-[100%]': 'left-12 md:left-12 lg:left-16 xl:left-0 xl:w-[100%]'} `}>
                    <Title titulo='📊 Distribución de predicciones' className={`text-[#251A79] ${isMobile ? 'text-base' : 'text-lg'} text-center p-3`} />
                    <PrediccionesDistributionChart history={history} />
                </div>
                
            </div>

            <div className={`w-[90%] relative ${isMobile ? 'left-0 w-[100%]': 'md:w-[93%] left-12 md:left-12 lg:left-16 xl:left-0 xl:w-[100%]'} `}>
                <Title titulo='📈 Evolución global de probabilidades por vuelo' className={`text-[#251A79] ${isMobile ? 'text-base' : 'text-lg'} text-start p-3`} />
                <PrediccionesEvolutionChart history={history} />
            </div>

            
            <div className={`w-[90%] relative ${isMobile ? 'left-0 w-[100%]': 'md:w-[93%] left-12 md:left-12 lg:left-16 xl:left-0 xl:w-[100%]'} `}>
                <Title titulo='🛫 Análisis por vuelo' className={`w-[95%] text-[#251A79] ${isMobile ? 'text-base' : 'text-lg'} text-start p-3`} />
                <PrediccionesPorVueloChart history={history} />
            </div>
        </div>
    );
};

export default DashboardCharts;