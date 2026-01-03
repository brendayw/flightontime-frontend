import { useMemo, useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const PrediccionesPorVueloChart = ({ history }) => {
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

    if (!history.length || selectedVuelo === null) return null;

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
        "A tiempo": "#B0B8F9",
        Retraso: "#FF854C",
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
            valueFormatter: (v) => (v == null ? "—" : v.toFixed(2)),
        };
        }
    );

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