import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '../../assets/icons/menu.png';
import HomeIcon from '../../assets/icons/home.png';
import ProfileIcon from '../../assets/icons/profile.png';
import FileIcon from '../../assets/icons/file.png';
import DataIcon from '../../assets/icons/data.png';
import StatsIcon from '../../assets/icons/stats.png';
import LogoutIcon from '../../assets/icons/logout.png';
import useAuth from '../../hooks/useAuth';

const Menu = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { isAdmin } = useAuth();
    
    return (
        <nav className={`fixed z-50 shadow-lg bg-[#222E60] rounded-xl
            ${isMobile ? 'bottom-4 left-1/2 -translate-x-1/2 w-[95%] h-14' : 'top-20 left-10 w-14 h-[500px]'}
        `}>
            <ul className={`flex items-center
                ${isMobile ? 'flex-row justify-around h-full' : 'flex-col gap-6 mt-6' }
            `}>
                {!isMobile && (
                    <img src={MenuIcon} alt='Menu' className='w-6 h-6' />
                )}

                <Link to='/home' className='flex items-center gap-2 md:mt-12'>
                    <img src={HomeIcon} alt='Inicio' className='w-6 h-6' />
                </Link>

                {/* <Link to='/' className='flex items-center gap-2'>
                    <img src={NotificationIcon} alt='Notificacion' className='w-6 h-6' />
                </Link> */}
                
                <Link to='/profile' className='flex items-center gap-2'>
                    <img src={ProfileIcon} alt='Perfil' className='w-6 h-6' />
                </Link>

                <Link to='/batch' className='flex items-center gap-2'>
                    <img src={FileIcon} alt='Archivo' className='w-6 h-6' />
                </Link>
                
                { isAdmin && (
                    <>
                        <Link to='/admin/history' className='flex items-center gap-2'>
                            <img src={DataIcon} alt='Base de datos' className='w-6 h-6' />
                        </Link>

                        <Link to='/admin/dashboard' className='flex items-center gap-2'>
                            <img src={StatsIcon} alt='Estadisticas' className='w-6 h-6' />
                        </Link>
                    </>
                )}
                
                <Link to='/' className='flex items-center gap-2'>
                    <img src={LogoutIcon} alt='Cerrar sesión' className='w-6 h-6' />
                </Link>
                
            </ul>
        </nav>
    );
};

export default Menu;