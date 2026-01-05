import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/layout/Header.jsx';
import Menu from '../components/layout/Menu.jsx';
import Title from '../components/ui/Title.jsx';
import DashboardCharts from '../components/dashboard/DashboardCharts.jsx';

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [predicted, setPredicted] = useState(false);
    
    return (
        <section id='dashboard' className='min-w-screen min-h-screen bg-[#ffffff]'
            style={{
                width: '100vw',
                paddingBottom: isMobile ? '90px' : '0px',
        }}>

            <Header predicted={predicted} />
            <Menu />

            <main
                className='relative mx-auto mt-8'
                style={{
                    top: isMobile ? 50 : 60,
                    left: isMobile ? 0 : 20,
                    marginBottom: isMobile ? 18 : 0,
                    width: '100%',
                    maxWidth: isMobile ? '90%' : 1200,
                    padding: isMobile ? '0.5rem' : '1rem',
                    transition: 'all 0.6s ease-in-out',
            }}>
                
                <DashboardCharts />
            </main>
        </section>
    );
};

export default Dashboard;
