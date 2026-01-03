import { PieChart } from '@mui/x-charts/PieChart';

const PrediccionesStatusChart = ({ summary }) => {
    if (!summary || summary.totalPredicciones === 0) {
        return <p>No hay predicciones registradas</p>;
    }

    const chartData = [
        {
            id: 0,
            value:
                (summary.totalPredicciones *
                summary.porcentajePuntuales) /
                100,
            label: "Puntuales",
        },
        {
            id: 1,
            value:
                (summary.totalPredicciones *
                summary.porcentajeRetrasos) /
                100,
            label: "Retrasos",
        },
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