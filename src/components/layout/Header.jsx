import { motion } from 'framer-motion';
import { useTheme, useMediaQuery } from '@mui/material';
import Title from '../ui/Title.jsx';
import MundoImage from '../../assets/images/mundo.png';
import FlightOnTime from '../../assets/images/FlightOnTime!.png';
import FlightOnTimeAlt from '../../assets/images/FlightOnTime!-move.png';

const Header = ({ predicted }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <section id='header' className={`bg-[#B0B8F9] relative  ${isMobile ? 'h-28 w-full' : 'h-28 max-w-8xl'}`}>
            <div className={`absolute ${isMobile ? 'bottom-4 left-4' : 'bottom-4 left-32'}`}>
                <Title titulo='Bienvenido a' className='text-[#ffffff] text-lg italic'></Title>
            </div> 
            
            {/* Logo */}
            <motion.div 
                className='flex justify-center'
                initial={{ y: 24 }}
                animate={{
                    // predicted ? (mobile : desktop) : (mobile : desktop)
                    y: predicted ? (isMobile ? -15 : -65) : (isMobile ? 150 : 0),
                    x: predicted ? (isMobile ? 0 : -20) : (isMobile ? 10 : 0),
                    scale: predicted ? (isMobile ? 0.9 : 0.7) : 1,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                <img 
                    src={predicted ? FlightOnTimeAlt : FlightOnTime} 
                    className={
                        //predicted + mobile
                        `relative ${predicted && isMobile ? 'w-56 top-16' 
                            //solo mobile
                            : isMobile ? 'w-48 top-34' 
                                //desktop
                                : 'w-80 md:w-84 lg:w-96 top-36'
                        }
                        h-auto
                    `}
                />
            </motion.div>

            {/* Imagen del mundo */}
            <motion.div 
                className={`flex justify-end ${isMobile ? 'pr-8' : 'pr-2'}`}
                initial={{ y: -20 }}
                animate={{
                    // predicted ? (mobile : desktop) : (desktop)
                    y: predicted ? (isMobile ? -40 : -80) : (isMobile ? -50 : -30),
                    x: predicted ? (isMobile ? 100 : 150) : 0,
                scale: predicted ? (isMobile ? 0.5 : 0.6) : 1,
                }}
                transition={{ duration: 0.8 }}
            >
                <img 
                    src={MundoImage} 
                    alt='Mundo'
                    className={
                        //predicted + mobile
                        `relative ${predicted && isMobile ? 'w-36 h-36 -top-5' 
                            //solo mobile
                            : isMobile ? 'w-20 h-20 top-8' 
                                //desktop
                                : 'w-40 h-40 top-0'
                        }
                    `} 
                />
            </motion.div>
        </section>
    );
}

export default Header;