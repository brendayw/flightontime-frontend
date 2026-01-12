import { Card, CardContent } from "@mui/material";
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
        <Card className="rounded-2xl"
            sx={{
                background: 'rgba(65, 64, 64, 0.35)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                border: '0.5px solid #d9d9d954',
                borderRadius: '25px',
                p: 1
            }}
        >
            <CardContent className="space-y-3">
                {filteredPredictions.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border border-[#d9d9d954]/30 bg-[#FEFFFA]/10" >
                        
                        <div>
                            <p className="font-medium text-[#FEA062]">{p.aerolinea}</p>
                            <p className="text-sm text-[#FEAB77]/80">{p.origen} | {p.destino}</p>
                            <p className="text-sm text-[#E5E6EA]">{p.explicabilidad}</p>
                            <p className="text-sm text-[#E5E6EA]">{p.fecha_hora}</p>
                        </div>

                        <div className="text-right">
                            <p className="font-medium" style={{ 
                                color: p.result === "A tiempo" ? "#48a74d" : p.result === "Retrasado" ? "#8d1515" : "#000" 
                            }}>
                                {p.result}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default NotifyPrediction;