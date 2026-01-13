import { useMemo, useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import AppAlert from '../../ui/AppAlert';

/**
 * Componente PerFlightChart
 *
 * Muestra un gráfico de líneas con la evolución de probabilidades por vuelo.
 * Permite seleccionar un vuelo específico mediante un <select> y ver sus predicciones
 * agrupadas por tipo de prevision (por ejemplo, "A tiempo" o "Retraso").
 *
 * Props:
 * @param {Array<Object>} history - Array de objetos de predicciones, cada uno con:
 *    - vueloId: identificador del vuelo
 *    - createdAt: fecha/hora de la predicción (timestamp o ISO string)
 *    - prevision: "A tiempo" o "Retraso"
 *    - probabilidad: número (probabilidad de esa predicción)
 *
 * Comportamiento:
 * - Obtiene todos los IDs de vuelo únicos de las predicciones.
 * - Inicializa el vuelo seleccionado con el primer vuelo disponible.
 * - Filtra los datos por el vuelo seleccionado.
 * - Agrupa las predicciones por tipo de prevision.
 * - Construye la serie de datos para el gráfico alineada al eje X (fechas ordenadas).
 * - Formatea valores numéricos con 2 decimales y fechas como locales.
 * - Aplica colores distintos a cada prevision.
 *
 * Ejemplo de uso:
 * <PerFlightChart history={predicciones} />
 */

const PerFlightChart = ({ history }) => {
    const [selectedVuelo, setSelectedVuelo] = useState(null);

    const vueloIds = useMemo(
        () => [...new Set(history.map((h) => h.vueloId))],
        [history]
    );

    useEffect(() => {
        if (selectedVuelo === null && vueloIds.length) {
        setSelectedVuelo(vueloIds[0]);
        }
    }, [selectedVuelo, vueloIds]);

    if (!history.length || selectedVuelo === null) {
        return (
            <div className="px-4 py-4">
                <AppAlert severity="error">Error al cargar datos</AppAlert>
            </div>
        );
    }

    const flightData = history.filter(
        (h) => h.vueloId === selectedVuelo
    );

    const xAxisData = flightData
        .map((h) => h.createdAt)
        .sort((a, b) => a - b);

    const groupedByPrevision = flightData.reduce((acc, h) => {
        acc[h.prevision] ??= [];
        acc[h.prevision].push(h);
        return acc;
    }, {});

    const colorMap = {
        'A tiempo': '#B0B8F9',
        Retraso: '#FF854C',
    };

    const series = Object.entries(groupedByPrevision).map(
        ([prevision, records]) => {
            const dataByDate = Object.fromEntries(
                records.map((r) => [r.createdAt, r.probabilidad])
            );

            return {
                label: prevision,
                data: xAxisData.map((d) => dataByDate[d] ?? null),
                color: colorMap[prevision],
                valueFormatter: (v) => (v == null ? "—" : v.toFixed(2))
            };
        }
    );

    return (
        <div className='border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-start'>
            {/* Selector */}
            <div className='flex justify-center mb-4'>
                <select className='bg-white text-black border rounded-md px-3 py-1 focus:outline-none'
                    value={selectedVuelo} onChange={(e) => setSelectedVuelo(Number(e.target.value))}
                >
                    {vueloIds.map((id) => (
                        <option key={id} value={id}> Vuelo {id} </option>
                    ))}
                </select>
            </div>

            {/* Chart */}
            <LineChart
                xAxis={[
                    {
                        data: xAxisData,
                        scaleType: 'time',
                        valueFormatter: (v) =>
                        new Date(v).toLocaleString()
                    }
                ]}
                series={series}
                height={250}
                margin={{ top: 10, bottom: 10, left: 5, right: 5 }}
                slotProps={{
                    legend: { p: 0.2 }
                }}
            />
        </div>
    );
};

export default PerFlightChart;