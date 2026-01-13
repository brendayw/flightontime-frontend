import { Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

/**
 * RecentPredictions Component
 * 
 * Componente que muestra las predicciones recientes con seguimiento activo para usuarios loggeados.
 * Actualmente utiliza datos mockeados, pero en el futuro se integrará con el backend para obtener
 * las predicciones reales del usuario.
 * 
 * Comportamiento:
 * - Animación de aparición usando Framer Motion (opacity + desplazamiento vertical)
 * - Muestra un Card con:
 *    - Título: "Predicciones con seguimiento"
 *    - Botón "Ver más" que redirige a la página /notify
 *    - Lista de predicciones (mock)
 *       - Aerolínea + Origen | Destino
 *       - Fecha y hora
 *       - Resultado del vuelo con color según estado:
 *           - "A tiempo" → verde (#48a74d)
 *           - "Retrasado" → rojo (#8d1515)
 *           - Otro → negro
 * 
 * Props:
 * - Ninguna (usa datos internos mockeados)
 * 
 * Hooks / Librerías utilizadas:
 * - useNavigate (react-router-dom) → para navegar a /notify
 * - motion (framer-motion) → animación de aparición
 * - Card, CardContent, Button (MUI) → contenedores y botones estilizados
 * 
 * Uso:
 * <RecentPredictions />
 * 
 * Nota: Solo se muestra en la pantalla de usuario loggeado.
 */

const RecentPredictions = () => {
    const navigate = useNavigate();

    //mock de predicciones
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
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            //lg:col-span-2
            className="mt-4"
        >
            <Card className="rounded-2xl"
                sx={{
                    background: 'rgba(65, 64, 64, 0.35)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    border: '0.5px solid #d9d9d954',
                    borderRadius: '25px',
                    p: 1
                }}
            >
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl text-[#EAE8EC] font-semibold">Predicciones con seguimiento</h2>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => navigate("/notify")}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: "#222E60",
                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                color: '#FEFFFA',
                                fontWeight: 600,
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#1d145f" },
                                transition: "all 0.3s"
                        }}>
                            Ver más
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {predictions.map((p) => (
                            <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border border-[#d9d9d954]/30 bg-[#FEFFFA]/10" >
                                
                                <div>
                                    <p className="font-medium text-[#FEAB77]">{p.aerolinea} - {p.origen} | {p.destino} </p> 
                                    <p className="text-sm text-[#E5E6EA] text-muted-foreground">{p.fecha_hora}</p>
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
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
export default RecentPredictions;