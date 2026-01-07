import { useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Header from '../components/layout/Header.jsx';
import Menu from '../components/layout/Menu.jsx';

const ProfilePage = () => {
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

        </section>
    );
}

export default ProfilePage;