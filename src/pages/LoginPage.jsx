import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/ui/Header';
import LoginForm from '../components/auth/LoginForm';
import useAuth from '../hooks/useAuth'

const LoginPage = () => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, loading]);

    if (loading) return null;
    return (
        <section id='login' style={{backgroundImage: `linear-gradient(150deg, rgba(41, 36, 66, 0.85) 0%,rgba(74, 58, 87, 0.85) 45%,
            rgba(254, 160, 98, 0.85) 50%,rgba(254, 171, 119, 0.85) 55%,
            rgba(74, 58, 87, 0.85) 70%,rgba(41, 36, 66, 0.85) 100%)
            `}}
            className='min-h-[100dvh] w-screen flex items-center justify-center relative overflow-hidden'
        >
            <Header />

            <motion.div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#F9F3F3]/30 rounded-2xl shadow-2xl px-8 py-10 mt-12"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <LoginForm />
            </motion.div>
        </section>
    )
}

export default LoginPage;