import { Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";

/**
 * NotifyPrediction Component
 * 
 * Componente que muestra las predicciones de vuelos filtradas según seguimiento.
 * Se utiliza en páginas donde se listan predicciones, permitiendo mostrar solo
 * aquellas que tienen la opción de "notify" activa si así se indica.
 * 
 * Comportamiento:
 * - Obtiene `state.onlyFollowed` desde `useLocation` para determinar si se muestran
 *   solo las predicciones con seguimiento activo.
 * - Filtra las predicciones según `notify` si `onlyFollowed` es true.
 * - Si no hay predicciones filtradas, muestra un mensaje: "No hay predicciones con seguimiento activo."
 * - Muestra un Card de MUI con cada predicción en filas con información:
 *    - Aerolínea
 *    - Origen | Destino
 *    - Explicabilidad
 *    - Fecha y hora
 *    - Resultado del vuelo (A tiempo / Retrasado / Otro) con color según resultado
 * 
 * Props:
 * @param {Array} predictions - Lista de objetos de predicción. Cada objeto debe tener al menos:
 *    - id: identificador único
 *    - aerolinea: nombre de la aerolínea
 *    - origen: ciudad de origen
 *    - destino: ciudad de destino
 *    - explicabilidad: explicación de la predicción
 *    - fecha_hora: fecha y hora de vuelo
 *    - result: resultado de la predicción ("A tiempo", "Retrasado", etc.)
 *    - notify: boolean indicando si el usuario sigue este vuelo
 * 
 * Hooks utilizados:
 * - useLocation (react-router-dom) → para obtener estado enviado por navegación
 * 
 * Uso:
 * <NotifyPrediction predictions={predictionsArray} />
 */

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