import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '../../assets/icons/menu.png';
import HomeIcon from '../../assets/icons/home.png';
import NotificationIcon from '../../assets/icons/notification.png';
import ProfileIcon from '../../assets/icons/profile.png';
import FileIcon from '../../assets/icons/file.png';
import WeatherIcon from '../../assets/icons/weather.png';
import StatsIcon from '../../assets/icons/stats.png';

const Menu = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <nav className={`fixed z-50 shadow-lg bg-[#251A79] rounded-xl
            ${isMobile ? 'bottom-4 left-1/2 -translate-x-1/2 w-[95%] h-14'
            : 'top-12 left-10 w-14 h-[550px]'}
        `}>
            <ul className={`flex items-center
                ${isMobile ? 'flex-row justify-around h-full'
                : 'flex-col gap-8 mt-6'
                }
            `}>
                {!isMobile && (
                    <img src={MenuIcon} alt='Menu' className='w-6 h-6' />
                )}

                <Link to='/' className='flex items-center gap-2 md:mt-12'>
                    <img src={HomeIcon} alt='Inicio' className='w-6 h-6' />
                </Link>

                <Link to='/' className='flex items-center gap-2'>
                    <img src={NotificationIcon} alt='Notificacion' className='w-6 h-6' />
                </Link>
                

                <Link to='/' className='flex items-center gap-2'>
                    <img src={ProfileIcon} alt='Perfil' className='w-6 h-6' />
                </Link>

                <Link to='/batch' className='flex items-center gap-2'>
                    <img src={FileIcon} alt='Archivo' className='w-6 h-6' />
                </Link>

                <Link to='/' className='flex items-center gap-2'>
                    <img src={WeatherIcon} alt='Clima' className='w-7 h-7' />
                </Link>

                <Link to='/dashboard' className='flex items-center gap-2'>
                    <img src={StatsIcon} alt='Estadisticas' className='w-6 h-6' />
                </Link>
                
            </ul>
        </nav>
    );
};

export default Menu;