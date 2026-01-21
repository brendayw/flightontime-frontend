import { motion } from 'framer-motion';
import { useTheme, useMediaQuery } from '@mui/material';
import { Header, Menu } from '../components';
import DashboardCharts from '../components/dashboard/DashboardCharts.jsx';

const DashboardPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <section id='dashboard' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `,}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Header />
                <Menu />
            </motion.div>

            <main className='relative mx-auto mt-20'
                style={{
                    left: isMobile ? 0 : 20,
                    marginBottom: isMobile ? 18 : 0,
                    width: '100%',
                    maxWidth: isMobile ? '90%' : 1200,
                    padding: isMobile ? '0.5rem' : '1rem',
                    transition: 'all 0.6s ease-in-out'
            }}> 
            
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2">
                    <DashboardCharts />
                </motion.div>
            </main>
        </section>
    );
};

export default DashboardPage;
