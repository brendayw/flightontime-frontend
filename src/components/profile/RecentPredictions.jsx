import { Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const RecentPredictions = () => {
    const navigate = useNavigate();

    const predictions = [
        {
            id: 1,
            aerolinea: "AA",
            origen: "AS",
            destino: "JFK",
            fecha_hora: "2025-01-03",
            result: "A tiempo",
            confidence: "92%",
        },
        {
            id: 2,
            aerolinea: "LATAM",
            origen: "AA",
            destino: "BOS",
            fecha_hora: "2025-01-05",
            result: "Retrasado",
            confidence: "87%",
        },
        {
            id: 3,
            aerolinea: "IB 789",
            origen: "AC",
            destino: "EZE",
            fecha_hora: "2025-01-06",
            result: "A tiempo",
            confidence: "90%",
        },
    ];

    return (
        <div className='p-2 md:p-6'>
            {/* Predictions preview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
            >
                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                {/* <PlaneTakeoff className="text-blue-600" /> */}
                                <h2 className="text-xl text-[#251A79] font-semibold">Predicciones con seguimiento</h2>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => navigate("/notify")}
                                sx={{
                                    borderRadius: 3,
                                    backgroundColor: "#251A79",
                                    color: '#FEFFFA',
                                    fontWeight: 600,
                                    textTransform: "none",
                                    "&:hover": { backgroundColor: "#1d145f" },
                                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                    transition: "all 0.3s",
                            }}>
                                Ver más
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {predictions.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-between p-4 rounded-xl border border-[#FF854C]/30 bg-[#FEFFFA]"
                                >
                                    <div>
                                        <p className="font-medium text-[#251A79]">{p.aerolinea} - {p.origen} | {p.destino} </p> 
                                        <p className="text-sm text-[#5c5555] text-muted-foreground">{p.fecha_hora}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-medium" style={{
                                            color: p.result === "A tiempo" ? "#2e7d32" : p.result === "Retrasado" ? "#d32f2f" : "#000",
                                        }}>
                                            {p.result}
                                        </p>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground justify-end">
                                            {/* <Clock size={14} /> {p.confidence} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
export default RecentPredictions;