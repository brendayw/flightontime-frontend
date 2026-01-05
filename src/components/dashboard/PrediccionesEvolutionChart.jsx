import { LineChart } from '@mui/x-charts/LineChart';

const PrediccionesEvolutionChart = ({ history }) => {
    if (!history.length) {
        return <p className='text-[#251A79] text-center'>No hay datos de evolución</p>;
    }

    const groupedByFlight = history.reduce((acc, h) => {
        acc[h.vueloId] ??= [];
        acc[h.vueloId].push(h);
        return acc;
    }, {});

    const xAxisData = [
        ...new Set(history.map((h) => h.createdAt)),
    ].sort((a, b) => a - b);

    const series = Object.entries(groupedByFlight).map(
        ([vueloId, records]) => {
            const dataByDate = Object.fromEntries(
                records.map((r) => [r.createdAt, r.probabilidad])
            );

            return {
                label: `Vuelo ${vueloId}`,
                data: xAxisData.map((d) => dataByDate[d] ?? null),
                valueFormatter: (v) => (v == null ? "—" : v.toFixed(2)),
            };
        }
    );

    return (
        <div className='border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center text-center'>
            <LineChart
                xAxis={[
                    {
                        data: xAxisData,
                        scaleType: 'time',
                        valueFormatter: (value) =>
                            new Date(value).toLocaleDateString(),
                    },
                ]}
                series={series}
                height={300}
                margin={{ top: 20, bottom: 20, left: 10, right: 25 }} 
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'center' },
                        itemGap: 10,
                        sx: {
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        },
                    },
                }}
            />
        </div>
    );
};

export default PrediccionesEvolutionChart;