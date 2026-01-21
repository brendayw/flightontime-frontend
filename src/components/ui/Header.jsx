import { useTheme, useMediaQuery, Menu, MenuItem, IconButton, 
    AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logo from "/logo-flightontime.png"
import useAuth from '../../hooks/auth/useAuth';

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
    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const navigate = useNavigate();
    const { isGuest } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" sx={{ background:'linear-gradient(to right, rgba(34, 46, 96, 0.92), rgba(37, 26, 121, 0.85), rgba(121, 137, 244, 0.73))'}} >
            <Toolbar>
                
                {/* logo */}
                <Button onClick={() => navigate("/")} sx={{ mr: 2}}>
                    <img src={Logo} alt="Logo" className='w-10 h-10'/>
                </Button>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Flight On Time
                </Typography>

                {/* Botones */}
                {isGuest && (
                    <>
                        {/* DESKTOP */}
                        {!isMobile && (
                            <>
                                <Button
                                    onClick={onShowBatch}
                                    variant="outlined"
                                    sx={{
                                        mr: 1,
                                        color: '#E5E6EA',
                                        border: 'none',
                                        backgroundColor: '#222E60',
                                        ":hover": {
                                            backgroundColor: '#292442'
                                        }
                                    }}
                                >
                                    Predicciones en Lote
                                </Button>

                                <Button
                                    onClick={() => navigate("/auth/login")}
                                    variant="outlined"
                                    sx={{ mr: 1, color: "#E5E6EA", borderColor: "#E5E6EA" }}
                                >
                                    Login
                                </Button>

                                <Button
                                    onClick={() => navigate("/auth/signup")}
                                    variant="contained"
                                    sx={{ background: "#FEAB77" }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}

                        {/* MOBILE */}
                        {isMobile && (
                            <>
                                <IconButton
                                    color="inherit"
                                    onClick={handleMenuOpen}
                                >
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    disableScrollLock
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    PaperProps={{
                                        sx: {
                                            backgroundColor: '#222E60',
                                            color: '#E5E6EA',
                                            borderRadius: 2,
                                            minWidth: 200,
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                                        }
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();    
                                            onShowBatch();    
                                        }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#292442',
                                            }
                                        }}
                                    >
                                        Predicciones en Lote
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            navigate("/auth/login");
                                        }}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#292442',
                                            }
                                        }}
                                    >
                                        Login
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            navigate("/auth/signup");
                                        }}
                                        sx={{
                                            mt: 0.5,
                                            backgroundColor: '#FEAB77',
                                            borderColor: '#FEAB77',
                                            color: '#E5E6EA',
                                            fontWeight: 'bold',
                                            borderRadius: 2,
                                            mx: 1.5,
                                            justifyContent: 'center',
                                            '&:hover': {
                                                backgroundColor: '#f39a63',
                                            }
                                        }}
                                    >
                                        Sign Up
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;