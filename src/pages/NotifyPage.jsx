import { useState, useEffect } from 'react'; 
import { useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import NotifyPrediction from "../components/profile/NotifyPrediction";
import Title from '../components/ui/Title';

const NotifyPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [predictions, setPredictions] = useState([]);
    const isPredictedView = true;

    useEffect(() => {
        // mock de ejemplo
        //aca puede ir tambien la respuesta de la explicabilidad
        setPredictions([
            {
                id: 1,
                aerolinea: "AR",
                fecha_hora: "2026-01-07 14:30:00",
                origen: "EZE",
                destino: "JFK",
                result: "A tiempo",
                explicabilidad: "La aerolinea AR tiene retrasos concurrentes a la hora 14:30:00",
                notify: true,
            },
            {
                id: 2,
                aerolinea: "LA",
                fecha_hora: "2026-01-07",
                origen: "LAX",
                destino: "EZE",
                result: "Retrasado",
                explicabilidad: "Demora por congestion en EZE",
                notify: true,
            },
        ]);
    }, []);


    return (
        <section className="min-w-screen min-h-screen bg-[#ffffff]"
            style={{
                width: '100vw',
                paddingBottom: isMobile ? '90px' : '0px',
            }}
        >
            <Header predicted={isPredictedView} />
            <Menu />

            <main className='relative mx-auto' 
                style={{
                left: isMobile ? 0 : 20,
                marginBottom: isMobile ? 18 : 0,
                width: '100%',
                maxWidth: isMobile ? '90%' : 1200,
                padding: isMobile ? '0.5rem' : '1rem',
                transition: 'all 0.6s ease-in-out',
                }}
            >
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <Title titulo='Seguimiento de vuelos' className="text-2xl font-semibold text-[#251A79]" />
                    <p className="text-sm text-[#5c5555] mt-1">
                        Predicciones activas para recibir notificaciones
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <NotifyPrediction predictions={predictions} />
                </motion.div>
            </main>
            
        </section>
    );
}

export default NotifyPage;