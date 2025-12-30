import {  Card, CardContent, Typography, Box, LinearProgress, Divider } from "@mui/material";
import AvionIcon from '../../assets/icons/avion.png';
import RelojIcon from '../../assets/icons/reloj.png';
import DistanciaIcon from '../../assets/icons/distance.png';
import { formatPrediction } from "../../utils/formatPrediction.jsx";

function PredictionCard({ prediction }) {
  const data = formatPrediction(prediction);

  if (!data) {
    return (
      <Card sx={{ borderRadius: "25px", p: 3, backgroundColor: "#F9F3F3" }}>
        <Typography color="text.secondary">No hay datos disponibles</Typography>
      </Card>
    );
  }

  const { aerolinea, origen, destino, distancia, status, probability, isDelayed, formattedDate } = data;

  return (
    <Card sx={{
        borderRadius: "25px",
        backgroundColor: "#F9F3F3",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        width: 600,
        height: 300,
        overflow: "hidden"
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header con aerolineas y aeropuerto*/}
        <Box
          sx={{
            backgroundColor: "#798AF4",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 3,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <img src={AvionIcon} alt='Icono de avión' className='w-7 h-7 flex items-start ml-4'/>
          <Typography fontWeight={600} color="#FFFFFF">
            {aerolinea} | {origen} → {destino}
          </Typography>
        </Box>

        {/* Fecha de partida*/}
        <Box display="flex" alignItems="center" gap={2} mt={2} pl={2} >
          <img src={RelojIcon} alt="Icono de reloj" className='w-7 h-7'/>
          <Typography variant="body2" fontSize={15}>
            <strong>{formattedDate}</strong>
          </Typography>
        </Box>

        {/* Distancia en km*/}
        <Box display="flex" alignItems="center" gap={2} mt={2} pl={2}>
          <img src={DistanciaIcon} alt="Icono de distancia" className='w-7 h-7' />
          <Typography variant="body2" fontSize={15}>
            <strong>{distancia}</strong>de distancia
          </Typography>
        </Box>

        {/* Linea divisoria */}
        <Divider sx={{ backgroundColor: "#D9D9D9", m:2, }} />

        {/* Estado del vuelo*/}
        <Typography mt={2} pl={2}>
          Estado del vuelo: {' '} 
          <strong style={{ color: '#d32f2f', fontSize: '16px'}}>
            {status}
          </strong>
        </Typography>

        {/* Probabilidad */}
        <Typography variant="body2" mt={2} pl={2} fontSize={16}>
          Probabilidad de retraso: <strong>{probability}%</strong>
        </Typography>

        {/* Barra de probabilidad */}
        <LinearProgress
          variant="determinate"
          value={probability}
          sx={{
            height: 4,
            borderRadius: 5,
            marginTop: 1,
            marginRight: 2,
            marginLeft: 2,
            padding: 1.5,
            backgroundColor: "#e0e0e0ff",
            "& .MuiLinearProgress-bar": {
              backgroundColor: isDelayed ? "#d32f2f" : "#2e7d32",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default PredictionCard;