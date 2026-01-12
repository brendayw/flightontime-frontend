import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/ui/Header.jsx';
import Menu from '../components/layout/Menu.jsx';
import DashboardCharts from '../components/dashboard/DashboardCharts.jsx';

const DashboardPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isPredictedView = true;
    
    return (
        <section id='dashboard' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `,}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >

            <Header />
            <Menu />

            <main className='relative mx-auto mt-20'
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

export default DashboardPage;
