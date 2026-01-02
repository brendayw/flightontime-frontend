import { useMemo, useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import useDashboard from "../../hooks/useDashboard";

const PrediccionesPorVueloChart = () => {
    const { history, loading, error } = useDashboard();
    const [selectedVuelo, setSelectedVuelo] = useState(null);

    //Obtiene el id de los vuelos
    const vueloIds = useMemo(() => {
        if (!history || history.length === 0) return [];
        return [...new Set(history.map((h) => h.vueloId))];
    }, [history]);

    //Seleccion inicial del vuelo
    useEffect(() => {
        if (selectedVuelo === null && vueloIds.length > 0) {
        setSelectedVuelo(vueloIds[0]);
        }
    }, [selectedVuelo, vueloIds]);

    if (loading) return <p>Cargando análisis por vuelo...</p>;
    if (error) return <p>{error}</p>;
    if (!history || history.length === 0)
        return <p>No hay datos disponibles</p>;
    if (selectedVuelo === null) return null;

    //Filtra datos del vuelo seleccionado
    const flightData = history.filter(
        (h) => h.vueloId === selectedVuelo
    );

    //Fechas de los vuelos para el eje x
    const xAxisData = flightData
        .map((h) => new Date(h.createdAt).getTime())
        .sort((a, b) => a - b);

     //Agrupa vuelos por previsión
    const groupedByPrevision = flightData.reduce((acc, item) => {
        if (!acc[item.prevision]) acc[item.prevision] = [];
        acc[item.prevision].push(item);
        return acc;
    }, {});

    //Colores según prevision
    const colorMap = {
        "A tiempo": "#B0B8F9",
        "Retraso": "#FF854C",
    };

    //Series para el chart
    const series = Object.entries(groupedByPrevision).map(([prevision, records]) => {
        const dataByDate = records.reduce((acc, r) => {
        acc[new Date(r.createdAt).getTime()] = r.probabilidad;
        return acc;
        }, {});

        return {
        label: prevision,
        data: xAxisData.map((d) => dataByDate[d] ?? null),
        valueFormatter: (v) => (v == null ? "—" : v.toFixed(2)),
        color: colorMap[prevision] || "#000000", // color de la serie
        };
    });

    return (
        <div className="border border-[#F9F3F3] rounded-xl shadow p-4 flex flex-col items-start">
            {/* Selector */}
            <div className="flex justify-center mb-4">
                <select
                    className="bg-white text-black border rounded-md px-3 py-1 focus:outline-none"
                    value={selectedVuelo}
                    onChange={(e) => setSelectedVuelo(Number(e.target.value))}
                >
                    {vueloIds.map((id) => (
                        <option key={id} value={id}>
                            Vuelo {id}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chart */}
            <LineChart
                xAxis={[
                    {
                        data: xAxisData,
                        scaleType: "time",
                        valueFormatter: (v) =>
                        new Date(v).toLocaleString(),
                    },
                ]}
                series={series}
                width={1100}
                height={320}
                margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
        </div>
    );
};

export default PrediccionesPorVueloChart;