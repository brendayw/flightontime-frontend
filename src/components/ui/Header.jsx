import { AppBar, Toolbar, Typography, Button, } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

/**
 * Header Component
 * 
 * Barra de navegación superior de la aplicación Flight On Time.
 * Utiliza Material UI AppBar y Toolbar, e incluye botones de acción según el rol del usuario.
 * 
 * Props:
 * @param {function} onShowBatch - Función que se ejecuta al hacer click en "Predicciones en Lote"
 * 
 * Comportamiento:
 * - Muestra el icono de un avion (FlightTakeoff)
 * - Muestra el título "Flight On Time"
 * - Si el usuario es un guest (no autenticado):
 *    - Botón "Predicciones en Lote" → ejecuta la función `onShowBatch`
 *    - Botón "Login" → redirige a /auth/login
 *    - Botón "Sign Up" → redirige a /auth/signup
 * - Si el usuario está autenticado, no se muestran los botones de login/signup ni predicciones en lote.
 * 
 * Hooks utilizados:
 * - useNavigate (react-router-dom) → navegación entre rutas
 * - useAuth (custom hook) → obtiene estado de autenticación y rol del usuario (isGuest)
 * 
 * Estilos:
 * - AppBar con gradiente lineal de azul oscuro a violeta claro
 * - Botón "Predicciones en Lote" con fondo oscuro y hover personalizado
 * - Botón "Log in" sin color de fondo pero con borde (#E5E6EA)
 * - Botón "Sign Up" con color naranja (#FEAB77)
 */
const Header = ({ onShowBatch }) => {
    const navigate = useNavigate();
    const { isGuest } = useAuth();

    return (
        <AppBar position="fixed" sx={{ background:'linear-gradient(to right, rgba(34, 46, 96, 0.92), rgba(37, 26, 121, 0.85), rgba(121, 137, 244, 0.73))'}} >
            <Toolbar>
                
                {/* logo */}
                <FlightTakeoffIcon sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Flight On Time
                </Typography>

                {/* Botones */}
                {isGuest && (
                    <>
                        <Button onClick={onShowBatch} color="inherit" variant="outlined" sx={{ mr: 1, color: '#E5E6EA', border: 'none', backgroundColor: '#222E60', 
                            ":hover": { border: 'none', backgroundColor:'#292442'}
                        }}>
                            Predicciones en Lote
                        </Button>

                        {/* Solo mostramos Login / SignUp si es guest */}
                        <Button onClick={() => navigate("/auth/login")} color="inherit" variant="outlined"
                            sx={{ mr: 1, color: "#E5E6EA", borderColor: "#E5E6EA" }}
                        >
                            Login
                        </Button>

                        <Button onClick={() => navigate("/auth/signup")} variant="contained"
                            sx={{ background: "#FEAB77" }}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;