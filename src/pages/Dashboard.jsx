import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/layout/Header.jsx';
import Menu from '../components/layout/Menu.jsx';
import DashboardCharts from '../components/dashboard/DashboardCharts.jsx';

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isPredictedView = true;
    
    return (
        <section id='dashboard' className='min-w-screen min-h-screen bg-[#ffffff]'
            style={{
                width: '100vw',
                paddingBottom: isMobile ? '90px' : '0px',
        }}>

            <Header predicted={isPredictedView} />
            <Menu />

            <main
                className='relative mx-auto mt-2'
                style={{
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
