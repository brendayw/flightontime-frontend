import { LineChart } from '@mui/x-charts/LineChart';
import { AppAlert } from '../../'; 

/**
 * Componente EvolutionChart
 *
 * Muestra la evolución de probabilidades de vuelos a lo largo del tiempo
 * en un gráfico de líneas.
 * 
 * Props:
 * @param {Array<Object>} history - Array de objetos de predicciones, cada uno con:
 *    - vueloId: identificador del vuelo
 *    - createdAt: fecha/hora de la predicción (timestamp o ISO string)
 *    - probabilidad: número (probabilidad asociada al vuelo en ese momento)
 *
 * Comportamiento:
 * - Agrupa las predicciones por vuelo (vueloId).
 * - Construye el eje X con todas las fechas únicas ordenadas.
 * - Para cada vuelo, genera una serie de datos alineada al eje X.
 * - Si falta algún dato de probabilidad en una fecha, se coloca `null`.
 * - Formatea los valores numéricos con 2 decimales y las fechas como locales.
 * - Oculta la leyenda del gráfico.
 *
 * Ejemplo de uso:
 * <EvolutionChart history={predicciones} />
 */

const EvolutionChart = ({ history }) => {
    if (!history.length) {
        return (
            <div className="px-4 py-4">
                <AppAlert severity="error">Error al cargar datos</AppAlert>
            </div>
        );
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
                valueFormatter: (v) => (v == null ? "—" : v.toFixed(2))
            };
        }
    );

    return (
        <div className='border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-center justify-center text-start'>
            <LineChart
                xAxis={[
                    {
                        data: xAxisData,
                        scaleType: 'time',
                        valueFormatter: (value) =>
                            new Date(value).toLocaleDateString()
                    }
                ]}
                series={series}
                height={325}
                margin={{ top: 10, bottom: 10, left: 5, right: 5 }} 
                slotProps={{
                    legend: {
                        sx: { display: 'none' },
                        hidden: true
                    },
                }}
            />
        </div>
    );
};

export default EvolutionChart;