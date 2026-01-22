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
 * Se mantiene visible en todas las rutas y gestiona la navegación
 * entre predicción individual, predicción en lote y autenticación.
 *
 * Responsabilidades principales:
 * - Mostrar el logo y título de la aplicación
 * - Mostrar acciones disponibles para usuarios guest
 * - Adaptar la UI según el tamaño de pantalla (desktop / mobile)
 * - Centralizar la navegación hacia el Home con el estado correcto
 *
 * Props:
 * @param {Function} onShowBatch
 *  Función que activa la vista de "Predicciones en Lote" cuando el
 *  usuario ya se encuentra en el Home (/).
 *
 * @param {Function} onShowIndividual
 *  Función que activa la vista de predicción individual cuando el
 *  usuario ya se encuentra en el Home (/).
 *
 * Comportamiento de navegación:
 * - Predicciones en Lote:
 *   - Si el usuario ya está en "/", se ejecuta `onShowBatch`
 *   - Si está en otra ruta, navega al Home pasando `state.showBatch = true`
 *
 * - Click en el logo:
 *   - Si el usuario está en "/", vuelve a la predicción individual
 *     limpiando el estado de navegación
 *   - Si está en otra ruta, navega al Home con predicción individual
 *
 * Adaptación responsive:
 * - Desktop:
 *   - Botones visibles directamente en el AppBar
 * - Mobile:
 *   - Menú desplegable con ícono (MoreVert)
 *
 * Hooks utilizados:
 * - useNavigate (react-router-dom): navegación entre rutas
 * - useTheme / useMediaQuery (MUI): detección de tamaño de pantalla
 * - useAuth (custom hook): determina si el usuario es guest
 */
const Header = ({ onShowBatch, onShowIndividual }) => {
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

    const handleBatchClick = () => {
        // Si ya estamos en home, usa la función del prop
        if (location.pathname === '/') {
            onShowBatch();
        } else {
            // Si estamos en otra ruta, navega al home con state
            navigate('/', { state: { showBatch: true } });
        }
    };

    const handleLogoClick = () => {
        // Si ya estamos en home, vuelve a predicción individual
        if (location.pathname === '/') {
            // Forzar recarga del estado navegando con replace y state limpio
            navigate('/', { replace: true, state: { showBatch: false } });
            // También llamar a la función si existe
            if (onShowIndividual) {
                onShowIndividual();
            }
        } else {
            // Si estamos en otra ruta, navega al home (predicción individual por defecto)
            navigate('/', { state: { showBatch: false } });
        }
    };

    return (
        <AppBar position="fixed" sx={{ background:'linear-gradient(to right, rgba(34, 46, 96, 0.92), rgba(37, 26, 121, 0.85), rgba(121, 137, 244, 0.73))'}} >
            <Toolbar>
                
                {/* logo */}
                <Button onClick={handleLogoClick} sx={{ mr: 2}}>
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
                                    onClick={handleBatchClick}
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
                                            handleBatchClick();
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