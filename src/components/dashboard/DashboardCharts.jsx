import Title from '../ui/Title';
import PrediccionesStatusChart from "./PrediccionesStatusChart";
import PrediccionesDistributionChart from "./PrediccionesDistributionChart";
import PrediccionesEvolutionChart from "./PrediccionesEvolutionChart";
import PrediccionesPorVueloChart from "./PrediccionesPorVueloChart";
import DashboardStats from "./DashboardStats";

const DashboardCharts = () => (
    <div className="w-[90%] bg-transparent p-6 space-y-6">

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <Title titulo='Estado de las predicciones' className='text-[#251A79] text-center text-lg p-3'/>
                <PrediccionesStatusChart />
            </div>
            
            <div>
                <Title titulo='📊 Distribución de predicciones' className='text-[#251A79] text-center text-lg p-3'/>
                <PrediccionesDistributionChart />
            </div>
            
        </div>

        <div>
            <Title titulo='📈 Evolución global de probabilidades por vuelo' className='text-[#251A79] text-start text-lg p-3'/>
            <PrediccionesEvolutionChart />
        </div>

        
        <div>
            <Title titulo='🛫 Análisis por vuelo' className='text-[#251A79] text-start text-lg p-3'/>
            <PrediccionesPorVueloChart />
        </div>
    </div>
);

export default DashboardCharts;