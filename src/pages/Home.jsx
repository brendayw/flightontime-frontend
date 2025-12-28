import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';
import PredictionForm from '../components/prediction/PredictionForm';
import PredictionList from '../components/prediction/PredictionList';

const Home = () => {
    const [predicted, setPredicted] = useState(false);

    return (
        <section id="home" className='min-h-screen bg-[#ffffff] scroll-smooth'>
            <Header predicted={predicted} />
            <Menu />
            
            <div className='flex justify-center mt-24'>
                <AnimatePresence mode="wait">
                    {!predicted && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-center ml-28"
                        >
                            <PredictionForm onPredict={() => setPredicted(true)} />
                        </motion.div>
                    )}

                    {predicted && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <PredictionList />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );

}

export default Home;