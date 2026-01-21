import { Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { AppAlert } from '../'; 
import useUsuarioVuelos from "../../hooks/users/useUsuarioVuelos";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

const RecentFlights = () => {
    const navigate = useNavigate();
    const { vuelos, loading, error } = useUsuarioVuelos();

    if (loading) {
        return (
            <div>
                <AppAlert severity="info">Cargando datos...</AppAlert>
            </div>
        )
    }

    if (error) {
        return (
            <div className="px-4 py-4">
                <AppAlert severity="error">Error al cargar datos</AppAlert>
            </div>
        );
    }

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        }) + " " + fecha.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

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
                            <h2 className="text-xl text-[#EAE8EC] font-semibold">Historial de vuelos</h2>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => navigate("/flights")}
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
                        {vuelos.slice(0, 3).map((v, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-[#d9d9d954]/30 bg-[#FEFFFA]/10" >
                                <div>
                                    
                                    <p className="flex items-center font-medium text-[#FEAB77]">
                                        <ArrowUpwardRoundedIcon className="w-4 h-4 mr-2"/>
                                        {v.origen}

                                    </p> 

                                    <p className="flex items-center text-[#83ff71]">
                                        <ArrowDownwardRoundedIcon className="w-4 h-4 mr-2" />
                                        {v.destino}
                                    </p>

                                    <p className="flex items-center text-sm text-[#E5E6EA] text-muted-foreground">
                                        <AccessTimeRoundedIcon className="w-4 h-4 mr-2"/>
                                        {formatearFecha(v.fecha)}
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
export default RecentFlights;