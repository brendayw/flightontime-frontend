import { motion, MotionContext } from "framer-motion";
import Title from '../ui/Title.jsx';
import MundoImage from '../../assets/images/mundo.png';
import FlightOnTime from '../../assets/images/FlightOnTime!.png';
import FlightOnTimeAlt from "../../assets/images/FlightOnTime!-move.png";

const Header = ({ predicted }) => {
    return (
        <section className="bg-[#B0B8F9] relative h-[125px] w-[1365px]"> 
            <div className='absolute bottom-4 left-32'>
                <Title titulo='Bienvenido a' className='text-[#ffffff] text-lg italic'></Title>
            </div> 
            
            <motion.div 
                className="flex justify-center"
                initial={{ y: 24 }}
                animate={{
                    y: predicted ? -20 : 50,
                    scale: predicted ? 0.7 : 1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <img src={predicted ? FlightOnTimeAlt : FlightOnTime} className='w-40 md:w-56 lg:w-96 h-auto relative top-24'/>
            </motion.div>

            <motion.div 
                className='flex justify-end pr-12'
                initial={{ y: -20 }}
                animate={{
                y: predicted ? -80 : -20,
                x: predicted ? 220 : 0,
                scale: predicted ? 0.6 : 1,
                }}
                transition={{ duration: 0.8 }}
            >
                <img src={MundoImage} alt="Mundo" className='w-40 h-40 relative top-2' />
            </motion.div>
        </section>
    );
}

export default Header;