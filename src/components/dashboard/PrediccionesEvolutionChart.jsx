import { LineChart } from '@mui/x-charts/LineChart';
import useDashboard from '../../hooks/useDashboard';

const PrediccionesEvolutionChart = () => {
    const { history, loading, error } = useDashboard();

    if (loading) return <p>Cargando evolución...</p>;
    if (error) return <p>{error}</p>;
    if (!history || history.length === 0)
        return <p>No hay datos de evolución</p>;

    /**
     * Agrupamos por vueloId
     * {
     *   101: [{...}, {...}],
     *   102: [{...}]
     * }
     */
    const groupedByFlight = history.reduce((acc, item) => {
        if (!acc[item.vueloId]) acc[item.vueloId] = [];
        acc[item.vueloId].push(item);
        return acc;
    }, {});

    /**
    * Eje X: todas las fechas únicas ordenadas
    */
    const xAxisData = [
        ...new Set(
            history
                .map((h) => new Date(h.createdAt).getTime())
        ),
    ].sort((a, b) => a - b);

    /**
     * Series: una por vuelo
     * Si un vuelo no tiene dato en una fecha → null
     */
    const series = Object.entries(groupedByFlight).map(
        ([vueloId, records]) => {
            const dataByDate = records.reduce((acc, r) => {
                acc[new Date(r.createdAt).getTime()] = r.probabilidad;
                return acc;
            }, {});

            return {    
                label: `Vuelo ${vueloId}`,
                data: xAxisData.map((date) =>
                    dataByDate[date] ?? null
                ),
                valueFormatter: (value) =>
                    value == null ? '—' : value.toFixed(2),
            };
        }
    );

    return (
        <div className="border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
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