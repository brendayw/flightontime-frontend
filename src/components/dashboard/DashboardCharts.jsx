import { useTheme, useMediaQuery } from '@mui/material';
import useDashboardHistory from '../../hooks/useDashboardHistory';
import Title from '../ui/Title';
import DistributionChart from './charts/DistributionChart';
import EvolutionChart from './charts/EvolutionChart';
import PerFlightChart from './charts/PerFlightChart';
import DashboardStats from './DashboardStats';

const DashboardCharts = () => {
    const { history, loading: loadingHistory, error: errorHistory } = useDashboardHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (loadingHistory) 
        return <p className='text-[#251A79] text-center'>Cargando dashboard...</p>;

    if (errorHistory) 
        return 
            <p className='text-[#251A79] text-center'>{errorHistory}</p>;
            
    return (
        <div className={`w-full ${isMobile ? 'px-2 py-2' : 'px-6 py-6'} py-2 space-y-4 mb-14 bg-[#EAE8EC]/5 rounded-lg`}>

            <DashboardStats />
            
            <div className={`relative ${isMobile ? 'left-0 w-[100%]': 'left-12 md:left-12 lg:left-16 xl:left-0 xl:w-[100%]'} `}>
                <Title titulo='📊 Distribución de predicciones' className={`text-[#EAE8EC] ${isMobile ? 'text-base' : 'text-xl'} text-start p-3`} />
                <DistributionChart history={history} />
            </div>
                


            <div className={`grid ${isMobile ? 'w-[100%] grid-cols-1' : 'sm:grid-cols-1 md:grid-cols-2 items-center xl:w-[100%]'} gap-6`}>
                <div className={`relative ${isMobile ? 'left-0 w-[100%]': 'md:w-[93%] left-12 md:left-12 lg:left-16 xl:left-0 xl:w-[100%]'} `}>
                    <Title titulo='📈 Evolución global de probabilidades por vuelo' className={`text-[#EAE8EC] ${isMobile ? 'text-base' : 'text-xl'} text-start p-3`} />
                    <EvolutionChart history={history} />
                </div>

                
                <div className={`relative ${isMobile ? 'left-0 w-[100%]': 'md:w-[93%] left-12 md:left-12 lg:left-16 xl:left-0 xl:w-[100%]'} `}>
                    <Title titulo='🛫 Análisis por vuelo' className={`w-[95%] text-[#EAE8EC] ${isMobile ? 'text-base' : 'text-xl'} text-start p-3`} />
                    <PerFlightChart history={history} />
                </div>
            </div>
            
        </div>
    );
};

export default DashboardCharts;