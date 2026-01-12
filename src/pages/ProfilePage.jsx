import { useState } from 'react'; 
import { useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/ui/Header';
import Menu from '../components/layout/Menu';
import ProfileDetails from '../components/profile/ProfileDetails';
import RecentPredictions from '../components/profile/RecentPredictions';

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //const isPredictedView = true;

  return (
    <section id='profile' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
      rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
      rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
      `,}}
      className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
    >
      <Header />

      <Menu />

      <main className='relative mx-auto mt-14' 
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
          className="grid grid-cols-1 gap-2"
        >
          <ProfileDetails />
          <RecentPredictions />
        </motion.div>
      </main>
    </section>
  );
}

export default ProfilePage;