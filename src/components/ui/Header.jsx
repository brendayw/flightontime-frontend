import { AppBar, Toolbar, Typography, Button, } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

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