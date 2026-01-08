import { useState } from 'react'; 
import { useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import ProfileDetails from '../components/profile/profileDetails';
import RecentPredictions from '../components/profile/RecentPredictions';

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isPredictedView = true;

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