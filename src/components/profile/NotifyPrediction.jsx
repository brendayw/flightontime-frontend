import { useLocation } from "react-router-dom";

const NotifyPrediction = ({ predictions = [] }) => {
  const { state } = useLocation();
  const onlyFollowed = state?.onlyFollowed;

  const filteredPredictions = onlyFollowed
    ? predictions.filter((p) => p.notify === true)
    : predictions;

    if (filteredPredictions.length === 0) {
        return (
            <p className="text-sm text-[#5c5555] italic">
                No hay predicciones con seguimiento activo.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {filteredPredictions.map((p) => (
                <div
                key={p.id}
                className="flex items-center justify-between p-4 rounded-xl border border-[#FF854C]/30 bg-[#FEFFFA]"
                >
                    <div>
                        <p className="font-medium text-[#251A79]">{p.aerolinea}</p>
                        <p className="text-sm text-[#5c5555]">{p.origen} | {p.destino}</p>
                        <p className="text-sm text-[#5c5555]">{p.explicabilidad}</p>
                        <p className="text-sm text-[#5c5555]">{p.fecha_hora}</p>
                    </div>

                    <div className="text-right">
                        <p
                            className="font-medium"
                            style={{
                                color:
                                p.result === "A tiempo"
                                    ? "#2e7d32"
                                    : p.result === "Retrasado"
                                    ? "#d32f2f"
                                    : "#000",
                            }}
                        >
                            {p.result}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotifyPrediction;