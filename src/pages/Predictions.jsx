import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";
import PredictionList from '../components/prediction/PredictionList';
import PredictionForm from '../components/prediction/PredictionForm';
import Header from '../components/layout/Header';
import Menu from '../components/layout/Menu';

const Predictions = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const predictions = location.state?.predictions || [];
    const predicted = predictions.length > 0;

    const resultsAnimation = isMobile
        ? {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: -100 },
        }
        : {
            initial: { opacity: 0, y: 60 },
            animate: { opacity: 1, y: -150, x: -210 },
        };

    return (
        <section
            id="predictions"
            className="min-w-screen min-h-screen bg-[#ffffff]"
            style={{
                width: '100vw',
                paddingBottom: isMobile ? '90px' : '0px',
            }}
        >
            <Header predicted={predicted} />
            <Menu />

            <div className='flex flex-col items-center mt-28 gap-6'>

                <PredictionForm variant="compact" predicted={predicted} />

                <AnimatePresence mode="wait">
                    {predicted && (
                        <motion.div
                            key="results"
                            initial={resultsAnimation.initial}
                            animate={resultsAnimation.animate}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ width: "100%" }}
                        >
                            <PredictionList predictions={predictions} />
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default Predictions;