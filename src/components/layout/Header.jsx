import { motion, MotionContext } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";
import Title from '../ui/Title.jsx';
import MundoImage from '../../assets/images/mundo.png';
import FlightOnTime from '../../assets/images/FlightOnTime!.png';
import FlightOnTimeAlt from "../../assets/images/FlightOnTime!-move.png";

const Header = ({ predicted }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <section id="home"
            className={`bg-[#B0B8F9] relative  ${isMobile ? 'h-[160px] w-full' : 'h-[125px] w-[1365px]'}`}
        >
            <div className={`
                absolute
                ${isMobile ? 'bottom-2 left-4' : 'bottom-4 left-32'}
            `}>
                <Title titulo='Bienvenido a' className='text-[#ffffff] text-lg italic'></Title>
            </div> 
            
            {/* Logo */}
            <motion.div 
                className="flex justify-center"
                initial={{ y: 24 }}
                animate={{
                    y: predicted
                        ? isMobile ? 5 : -65
                        : isMobile ? 150 : 0,
                    x: predicted
                        ? isMobile ? -40 : -20
                        : isMobile ? 10 : 0,
                    scale: predicted
                        ? isMobile ? 0.8 : 0.7
                        : 1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <img 
                    src={predicted ? FlightOnTimeAlt : FlightOnTime} 
                    className={`
                        relative
                        ${predicted && isMobile 
                            ? 'w-56 top-16' 
                            : isMobile
                                ? 'w-48 top-10' 
                                : 'w-40 md:w-56 lg:w-96 top-36'
                        }
                        h-auto
                    `}
                />
            </motion.div>

            {/* Imagen del mundo */}
            <motion.div 
                className={`flex justify-end ${isMobile ? 'pr-8' : 'pr-12'}`}
                initial={{ y: -20 }}
                animate={{
                    y: predicted
                        ? isMobile ? -20 : -80
                        : -20,
                    x: predicted
                        ? isMobile ? 60 : 220
                        : 0,
                scale: predicted
                    ? isMobile ? 0.5 : 0.6
                    : 1,
                }}
                transition={{ duration: 0.8 }}
            >
                <img 
                    src={MundoImage} 
                    alt="Mundo" 
                    className={`
                        relative
                        ${predicted && isMobile 
                            ? 'w-36 h-36 top-[-20px]' 
                            : isMobile
                                ? 'w-20 h-20 top-8' 
                                : 'w-40 h-40 top-2'
                        }
                    `} 
                />
            </motion.div>
        </section>
    );
}

export default Header;