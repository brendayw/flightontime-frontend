import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import PredictionForm from '../components/prediction/PredictionForm';


const Home = () => {
    return (
        <section id="home" className='min-h-screen bg-[#ffffff] scroll-smooth'>
            <Header />
            <Menu />
            
            <div className='flex justify-center mt-24'>
                <div className="flex items-center justify-center ml-28">
                    <PredictionForm />
                </div>
            </div>
            
        </section>
    );

}

export default Home;