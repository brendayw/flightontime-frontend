import { Box, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FooterButton = () => {
    const navigate = useNavigate();
    
    return (
        <Box sx={{ 
            position: 'relative',
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'center', 
            gap: 2 ,
            mt: 2,
        }}>
            <Button onClick={() => navigate('/auth/login')} variant="contained"
                sx={{
                    backgroundColor: '#FEA062',
                    color: '#E5E6EA',
                    ":hover": { backgroundColor:'#FEAB77' },
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 1
                }}
            >
                Seguir vuelo
            </Button>

            <Button onClick={() => navigate('/home')} variant="contained"
                sx={{
                    backgroundColor: 'transparent',
                    color: '#E5E6EA',
                    ":hover": { border:'1px solid #E5E6EA' },
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 1
                    }}
                >
                    Nueva Predicción
                </Button>
        </Box>
    );
}

export default FooterButton;