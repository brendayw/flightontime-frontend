import PrediccionesStatusChart from "./PrediccionesStatusChart";
import PrediccionesDistributionChart from "./PrediccionesDistributionChart";
import PrediccionesEvolutionChart from "./PrediccionesEvolutionChart";
import PrediccionesPorVueloChart from "./PrediccionesPorVueloChart";
import DashboardStats from "./DashboardStats";

const DashboardCharts = () => (
    <div className="w-[90%] bg-transparent p-6 space-y-6">

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PrediccionesStatusChart />
            <PrediccionesDistributionChart />
        </div>

        <PrediccionesEvolutionChart />

        <PrediccionesPorVueloChart />
    </div>
);

export default DashboardCharts;