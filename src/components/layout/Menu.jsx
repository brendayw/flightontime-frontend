import { Link } from 'react-router-dom';
import MenuIcon from '../../assets/icons/menu.png';
import HomeIcon from '../../assets/icons/home.png';
import NotificationIcon from '../../assets/icons/notification.png';
import ProfileIcon from '../../assets/icons/profile.png';
import WeatherIcon from '../../assets/icons/weather.png';
import StatsIcon from '../../assets/icons/stats.png';

const Menu = () => {
  return (
    <nav className='fixed top-12 left-10 w-[60px] h-[550px] bg-[#251A79] rounded-xl z-50 shadow-lg'>
        <ul className='flex flex-col gap-8 items-center mt-6'>
            <img src={MenuIcon} alt="Inicio" className='w-6 h-6' />

            <Link to="/" className='flex items-center gap-2 mt-12'>
                <img src={HomeIcon} alt="Inicio" className='w-6 h-6' />
            </Link>

            <Link to="/" className='flex items-center gap-2'>
                <img src={NotificationIcon} alt="Perfil" className='w-7 h-7' />
            </Link>

            <Link to="/" className='flex items-center gap-2'>
                <img src={ProfileIcon} alt="Perfil" className='w-6 h-6' />
            </Link>

            <Link to="/" className='flex items-center gap-2'>
                <img src={WeatherIcon} alt="Perfil" className='w-6 h-6' />
            </Link>

            <Link to="/" className='flex items-center gap-2'>
                <img src={StatsIcon} alt="Perfil" className='w-6 h-6' />
            </Link>
            
        </ul>
    </nav>
  );
};

export default Menu;