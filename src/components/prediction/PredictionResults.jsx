import {  Card, CardContent, Typography, Box, LinearProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";

const PredictionResults = () => {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);

    //aca falta el useEffecto con axios

    return (
        <Card sx={{
            borderRadius: "25px",

            backgroundColor: "#F9F3F3",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            width: 600,
            height: 60,
            overflow: "hidden"
        }}
        >
            <CardContent sx={{ p: 0, display: "flex", alignItems: "center",}}>
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Typography fontWeight={600} ml={2}>
                        Predicciones 
                    </Typography>
                    <Typography>
                        | Total{" "} 
                        <Box
                            component="span"
                            sx={{ color: "#251A79", fontWeight: 600 }}
                        >
                            {/* {loading ? "..." : predictions.length} resultados */}
                            2 resultados
                        </Box>
                        
                        
                        
                    </Typography>

                </Box>
            </CardContent>
        </Card>
    );
}

export default PredictionResults;