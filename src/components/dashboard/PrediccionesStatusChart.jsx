import { PieChart } from '@mui/x-charts/PieChart';
import useDashboard from '../../hooks/useDashboard';

const PrediccionesStatusChart = () => {
    const { summary, loading, error } = useDashboard();
    if (loading) return <p>Cargando gráfico...</p>;

    if (error) {
        return (
        <p className="bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] m-4 p-4">
            {error}
        </p>
        );
    }

    if (!summary || summary.totalPredicciones === 0) {
        return (
        <p className="bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] m-4 p-4">
            Aún no hay predicciones registradas
        </p>
        );
    }

    const puntuales =
        (summary.totalPredicciones * summary.porcentajePuntuales) / 100;

    const retrasos =
        (summary.totalPredicciones * summary.porcentajeRetrasos) / 100;

    const chartData = [
        { id: 0, value: puntuales, label: 'Puntuales' },
        { id: 1, value: retrasos, label: 'Retrasos' },
    ];

    return (
        <div className="border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center">
            <PieChart
                colors={['#B0B8F9', '#FF854C']}
                series={[
                    {
                    data: chartData,
                    innerRadius: 25,
                    outerRadius: 125,
                    paddingAngle: 2,
                    cornerRadius: 6,
                    },
                ]}     
                width={300}
                height={250}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'top', horizontal: 'middle' },
                    },
                }}
            />
        </div>
    );
}

export default PrediccionesStatusChart;