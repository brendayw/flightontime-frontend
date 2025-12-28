import {  Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";

export default function PredictionCard({ prediction }) {
  const isDelayed = prediction.status === "Retrasado";

  return (
    <Card sx={{
        borderRadius: "16px",
        backgroundColor: "#F9F3F3",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        maxWidth: 600,
        mb: 3,
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000",
            borderRadius: "40px",
            // px: 2,
            // py: 1,
            // mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* <FlightTakeoffIcon /> */}
          <Typography fontWeight={600}>
            {/* {prediction.airline} | {prediction.from} → {prediction.to} */}
          </Typography>
        </Box>

        {/* Fecha */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {/* <AccessTimeIcon fontSize="small" /> */}
          <Typography variant="body2">
            {/* {prediction.date} - {prediction.time} */}
          </Typography>
        </Box>

        {/* Distancia */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          {/* <PlaceIcon fontSize="small" /> */}
          <Typography variant="body2">
            {/* {prediction.distance} km de distancia */}
          </Typography>
        </Box>

        {/* Estado */}
        <Typography mb={1}>
          Estado del vuelo:{" "}
          <strong style={{ color: isDelayed ? "#d32f2f" : "#2e7d32" }}>
            {/* ñ{p´-]} */}
          </strong>
        </Typography>

        {/* Probabilidad */}
        <Typography variant="body2" mb={1}>
          {/* Probabilidad de retraso: <strong>{prediction.delayProbability}%</strong> */}
        </Typography>

        <LinearProgress
          variant="determinate"
          // value={prediction.delayProbability}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#eee",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#d32f2f",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}