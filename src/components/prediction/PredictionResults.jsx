import { useTheme, useMediaQuery, Card, CardContent, Typography, Box } from "@mui/material";
import { useState } from "react";

const PredictionResults = ({ total, loading = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [predictions, setPredictions] = useState([]);

    return (
        <Card 
            sx={{
                borderRadius: "25px",
                backgroundColor: "#F9F3F3",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                width: isMobile ? "95%" : 600,
                height: isMobile ? 60 : 60,
                overflow: "hidden"
            }}
        >
            <CardContent 
                sx={{ 
                    p: isMobile ? 1.5 : 0, 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Box sx={{ 
                    p: isMobile ? 1 : 2, 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1 
                }}>

                    <Typography fontWeight={600} ml={2}> Predicciones </Typography>

                    <Typography>
                        | Total{" "} 
                        <Box component="span" sx={{ color: "#251A79", fontWeight: 600 }} >
                            {loading ? "..." : `${total} resultado${total !== 1 ? 's' : ''}`}
                        </Box>
                    </Typography>
                    
                </Box>
            </CardContent>
        </Card>
    );
}

export default PredictionResults;