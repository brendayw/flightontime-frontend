import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Header from "../components/layout/Header.jsx";
import Menu from "../components/layout/Menu.jsx";
import Title from "../components/ui/Title.jsx";
import DashboardCharts from "../components/dashboard/DashboardCharts.jsx";

const Dashboard = ({ variant = "default" }) => {
    const isCompact = variant === "compact";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [predicted, setPredicted] = useState(false);
    
    return (
        <section id="dashboard" className="min-h-screen bg-[#ffffff] scroll-smooth">
            <Header predicted={predicted} />
            <Menu />

            <main 
                className="relative mx-auto mt-8"
                style={{
                    top: isCompact ? (isMobile ? 0 : -110) : 60,
                    left: isCompact ? (isMobile ? 0 : 50) : (isMobile ? 0 : 120),
                    width: isMobile ? '95%' : isCompact ? '1200px' : '100%',
                    maxWidth: isMobile ? '95%' : isCompact ? '1200px' : 1500,
                    padding: isMobile ? '0.5rem' : '1rem',
                    transition: 'all 0.6s ease-in-out',
                }}
            >
                <Title
                    titulo="Dashboard de Predicciones de Vuelos"
                    className="text-[#251A79] text-2xl font-medium text-start mb-6"
                />

                <p className="text-[#000000] italic text-lg text-start mb-6">
                    Visualización en tiempo real basada en datos almacenados en nuestra BDD.
                </p>

                <DashboardCharts />

            </main>
        </section>
    );
};

export default Dashboard;
