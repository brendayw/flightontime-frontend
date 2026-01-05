import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import BatchPredicionFile from '../components/prediction/BatchPredictionFile';

const BatchPrediction = ({ variant = "default" }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isCompact = variant === "compact";
    const [predicted, setPredicted] = useState(false);

    return (
        <section id='batch' className='min-w-screen min-h-screen bg-[#ffffff]'
            style={{
                width: '100vw',
                paddingBottom: isMobile ? '90px' : '0px',
        }}>

            <Header predicted={predicted} />
            <Menu />

            <main className='relative mx-auto mt-8'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    top: isCompact ? (isMobile ? 0 : -110) : 60,
                    left: isCompact ? (isMobile ? 0 : 40) : (isMobile ? 0 : 40),
                    width: isMobile ? '95%' : isCompact ? '1200px' : '100%',
                    maxWidth: isMobile ? '95%' : isCompact ? '1200px' : 1500,
                    height: 'auto',
                    padding: isMobile ? '0.5rem' : '1rem',
                    transition: 'all 0.6s ease-in-out',
                }}
            >
                <BatchPredicionFile />
            </main>
           
        </section>
    );
}

export default BatchPrediction;