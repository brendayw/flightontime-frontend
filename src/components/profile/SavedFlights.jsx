import { Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AppAlert } from '../'; 
import useUsuarioVuelos from "../../hooks/users/useUsuarioVuelos";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

const SavedFlights = () => {
    const { state } = useLocation();
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
                {vuelos.map((v, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-[#d9d9d954]/30 bg-[#FEFFFA]/10" >
                        
                        <div>
                            <p className="flex items-center font-medium text-[#FEA062]">
                                <ArrowUpwardRoundedIcon className="w-4 h-4 mr-2"/>
                                {v.origen}
                            </p>
                            <p className="flex items-center text-sm text-[#83ff71]/80">
                                <ArrowDownwardRoundedIcon className="w-4 h-4 mr-2" />
                                {v.destino}
                            </p>
                            <p className="flex items-center text-sm text-[#E5E6EA]">
                                <AccessTimeRoundedIcon className="w-4 h-4 mr-2"/>
                                {formatearFecha(v.fecha)}
                            </p>
                        </div>

                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default SavedFlights;