import { useTheme, useMediaQuery } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const PrediccionesStatusChart = ({ summary }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!summary || summary.totalPredicciones === 0) {
        return <p className='text-[#251A79] text-center'>No hay predicciones registradas</p>;
    }

    const chartData = [
        {
        id: 0,
        value: (summary.totalPredicciones * summary.porcentajePuntuales) / 100,
        label: 'Puntuales',
        },
        {
        id: 1,
        value: (summary.totalPredicciones * summary.porcentajeRetrasos) / 100,
        label: 'Retrasos',
        },
    ];

    // Ajuste de tamaño según móvil
    const chartWidth = isMobile ? 200 : 300;
    const chartHeight = isMobile ? 200 : 250;
    const outerRadius = isMobile ? 90 : 125;
    const innerRadius = isMobile ? 20 : 25;

    return (
        <div className='border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center w-full'>
            <PieChart
                colors={['#B0B8F9', '#FF854C']}
                series={[
                {
                    data: chartData,
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    paddingAngle: 2,
                    cornerRadius: 6,
                },
                ]}
                width={chartWidth}
                height={chartHeight}
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