import { useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Header, Menu, SavedFlights, Title } from '../components';

const FlightsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <section id='flights' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Header />
                <Menu />
            </motion.div>

            <main className='relative mt-20 mx-auto' 
                style={{
                    left: isMobile ? 0 : 20,
                    marginBottom: isMobile ? 18 : 0,
                    width: '100%',
                    maxWidth: isMobile ? '90%' : 1200,
                    padding: isMobile ? '0.5rem' : '1rem',
                    transition: 'all 0.6s ease-in-out'
            }}>
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <Title titulo='Vuelos' className="text-2xl font-semibold text-[#FEAB77]" />
                    <p className="text-sm text-[#EAE8EC] mt-1">
                        Historial de vuelos realizados a lo largo del timpo
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <SavedFlights />
                </motion.div>
            </main>
            
        </section>
    );
}

export default FlightsPage;