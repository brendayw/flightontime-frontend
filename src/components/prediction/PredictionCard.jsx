import {  Card, CardContent, Typography, Box, LinearProgress, Divider } from "@mui/material";
import AvionIcon from '../../assets/icons/avion.png';
import RelojIcon from '../../assets/icons/reloj.png';
import DistanciaIcon from '../../assets/icons/distance.png';

function PredictionCard({ prediction }) {
  // const isDelayed = prediction.status === "Retrasado";

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
        {/* Header */}
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
            AEROLINEA | ORIGEN → DESTINO
          </Typography>
        </Box>

        {/* Fecha */}
        <Box display="flex" alignItems="center" gap={2} mt={2} pl={2} >
          <img src={RelojIcon} alt="Icono de reloj" className='w-7 h-7'/>
          <Typography variant="body2" fontSize={15}>
            <strong>11/11/2025 - 14:30 hs</strong>
          </Typography>
        </Box>

        {/* Distancia */}
        <Box display="flex" alignItems="center" gap={2} mt={2} pl={2}>
          <img src={DistanciaIcon} alt="Icono de distancia" className='w-7 h-7' />
          <Typography variant="body2" fontSize={15}>
            <strong>3000 km </strong>de distancia
          </Typography>
        </Box>

        {/* Linea divisoria */}
        <Divider sx={{ backgroundColor: "#D9D9D9", m:2, }} />

        {/* Estado */}
        <Typography mt={2} pl={2}>
          Estado del vuelo: <strong style={{ color: '#d32f2f', fontSize: '16px'}}>Retrasado</strong>
          {/* <strong style={{ color: isDelayed ? "#d32f2f" : "#2e7d32" }}>
            {p´-]}
          </strong> */}
        </Typography>

        {/* Probabilidad */}
        <Typography variant="body2" mt={2} pl={2} fontSize={16}>
          Probabilidad de retraso: <strong>68%</strong>
        </Typography>

        <LinearProgress
          variant="determinate"
          value={68}
          sx={{
            height: 4,
            borderRadius: 5,
            marginTop: 1,
            marginRight: 2,
            marginLeft: 2,
            padding: 1.5,
            backgroundColor: "#e0e0e0ff",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#d32f2f",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default PredictionCard;