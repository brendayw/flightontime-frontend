import Title from '../ui/Title.jsx';
import MundoImage from '../../assets/images/mundo.png';
import FlightOnTime from '../../assets/images/FlightOnTime!.png';

const Header = () => {
    return (
        <section className="relative h-[125px] w-[1365px] bg-[#B0B8F9]"> 
            <div className='absolute bottom-4 left-32'>
                <Title titulo='Bienvenido a' className='text-[#ffffff] text-lg italic'></Title>
            </div> 
            
            <div className="flex justify-center">
                <img src={FlightOnTime} className='w-40 md:w-56 lg:w-96 h-auto relative top-[150px]'/>
            </div>

            <div className='flex justify-end pr-12'>
                <img src={MundoImage} alt="Mundo" className='w-40 h-40 relative top-[-20px]' />
            </div>
        </section>
    );
}

export default Header;