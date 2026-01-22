import { motion } from "framer-motion";
import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header, Features, CTA, Footer, Hero } from "../components";
import { formatAnyPrediction } from "../utils/formatAnyPrediction";
import usePrediction from "../hooks/prediction/usePrediction";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState("hero"); //cambia entre form de predicción y el de batch
    const { predict, loading, error } = usePrediction();

    // cambiar entre hero y batch
    useEffect(() => {
        if (location.state?.showBatch === true) {
            setView("batch");
        } else if (location.state?.showBatch === false) {
            setView("hero");
        }
        
        // limpiar el state después de procesarlo para evitar que persista
        if (location.state?.showBatch !== undefined) {
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);

    // Único handlePredict para individual y batch
    const handlePredict = async (formData) => {
        const result = await predict(formData);
        if (!result) return;

        // Para individual: formData es un objeto
        // Para batch: formData es un array
        const predictions = formatAnyPrediction(result, formData);

        // Mostrar errores de batch si existen
        if (result.errores && result.errores.length > 0) {
            console.warn('Errores en predicción batch:', result.errores);
            // Aquí podrías mostrar un toast/alert con los errores
        }

        navigate('/predictions-guest', {
            state: {
                predictions,
                errors: result.errores || []
            }
        });
    };

    return (
        <section id='home' className='min-h-[100dvh] w-screen'>
            
            {/* Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Header onShowBatch={() => setView("batch")} />
            </motion.div>
            

            {/* Hero Section con Prediccion Individual o Prediccion en lote */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Hero view={view} setView={setView} onPredict={handlePredict} />
            </motion.div>
           
            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Features />
            </motion.div>
            

            {/* CTA Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <CTA />
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Footer />
            </motion.div>
        </section>
    )
}

export default Home;