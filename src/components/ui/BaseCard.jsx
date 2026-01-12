import { Typography,  Container, Grid, Card } from '@mui/material';

const BaseCard = ({ children, sx }) => {
    return (
        <Card sx={{
            background: 'rgba(41, 36, 66, 0.5)',
            color: '#EAE8EC',
            width: 250,
            alignContent: 'center',
            borderRadius: 4,
            ...sx, // permite extender estilos
        }}>
            {children}
        </Card>
    );
}

export default BaseCard;