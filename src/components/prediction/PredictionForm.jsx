import { useState } from 'react';
import { useTheme, useMediaQuery, Grid, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import useAerolineas from '../../hooks/core/useAerolineas';
import useAeropuertos from '../../hooks/core/useAeropuertos';
import FollowPredictionToggle from "../ui/FollowPredictionToggle";
import Title from '../ui/Title';
import Avion from '../../assets/icons/avion.png';
import Maleta from '../../assets/icons/maleta.png';
import AvionDePapel from '../../assets/icons/avion-papel.png';
import Nube from '../../assets/icons/nube.png';
import LineaNube from '../../assets/icons/linea-de-nube.png';

/* =========================
  ESTILOS REUTILIZABLES
========================= */

const gridItemSx = (isMobile, isCompact) => ({
  minWidth: isMobile ? '90%' : isCompact ? '160px' : '320px',
  maxWidth: isMobile ? '90%' : isCompact ? '160px' : '425px',
  flexGrow: isCompact ? 0 : 1,
  display: 'flex',
  justifyContent: 'center',
  ...(isCompact && {
    '@media (min-width: 600px) and (max-width: 899px)': {
      minWidth: '50px',
      maxWidth: '50px',
    },
    '@media (min-width: 900px) and (max-width: 1199px)': {
      minWidth: '90px',
      maxWidth: '90px',
    },
    '@media (min-width: 1200px)': {
      minWidth: '140px',
      maxWidth: '140px',
    },
  }),
  ...(!isCompact && {
    '@media (min-width: 600px) and (max-width: 899px)': {
      minWidth: 'calc(70% - 24px)',
    },
    '@media (min-width: 900px) and (max-width: 1199px)': {
      minWidth: '380px',
    },
    '@media (min-width: 1200px)': {
      minWidth: '425px',
    },
  }),
});

const labelSx = {
  color: '#8B7F7F',
  fontWeight: 600,
  transform: 'translate(14px, -20px) scale(0.75)',
  '&.Mui-focused': {
    color: '#FF854C',
  },
};

const selectSx = (isCompact) => ({
  backgroundColor: '#F5E6E6',
  color: '#5c5555',
  fontSize: '14px',
  height: isCompact ? '36px' : '45px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const menuProps = {
  PaperProps: {
    sx: {
      '& .MuiMenuItem-root': {
        fontSize: '14px',
        color: '#5c5555',
      },
    },
  },
};

const textFieldSx = (isCompact) => ({
  backgroundColor: '#F5E6E6',
  '& .MuiInputBase-root': {
    height: isCompact ? '36px' : '45px',
  },
  '& input': {
    padding: isCompact ? '8px 12px' : '10.5px 14px',
    color: '#5c5555',
    fontSize: isCompact ? 11 : 12,
  },
  '& input::-webkit-calendar-picker-indicator': {
    filter: 'invert(55%) sepia(8%) saturate(300%) hue-rotate(350deg)',
    cursor: 'pointer',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

/* =========================
  COMPONENTE AUXILIAR
========================= */

const FormGridItem = ({ children, isMobile, isCompact, ...props }) => (
  <Grid item xs={12} md={6} zIndex={10} sx={gridItemSx(isMobile, isCompact,)} {...props}>
    {children}
  </Grid>
);

/* =========================
  COMPONENTE PRINCIPAL
========================= */

const PredictionForm = ({ onPredict, variant = 'default', predicted = false }) => {
  const theme = useTheme();
  const isCompact = variant === 'compact';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { aerolineas, loading: loadingAerolineas } = useAerolineas();
  const { aeropuertos, loading: loadingAeropuertos } = useAeropuertos();

  const [aerolinea, setAerolinea] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [distancia, setDistancia] = useState('');
  const [followPrediction, setFollowPrediction] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!aerolinea || !origen || !destino || !fechaHora || !distancia) return;

    const distanciaInt = parseInt(distancia);
    if (isNaN(distanciaInt) || distanciaInt <= 0) return;

    const formData = {
      aerolinea: aerolinea.trim(),
      origen: origen.trim(),
      destino: destino.trim(),
      fecha_partida: `${fechaHora}:00`,
      distancia_km: distanciaInt,
      notify: followPrediction
    };
    

    if (onPredict) {
      await onPredict(formData);
    }
  };

  if (loadingAerolineas || loadingAeropuertos) {
    return <p>Cargando datos...</p>;
  }

  if (isMobile && isCompact) return null;

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        position: 'relative',
        background: '#F9F3F3',
        top: isCompact ? -140 : 'auto',
        left: isMobile ? 0 : 50,
        width: isMobile ? '90%' : isCompact ? '100%' : { sm: '75%', md: '85%', lg: '90%', xl: '100%' },
        maxWidth: isCompact ? { sm: 500, md: 800, lg: 1100, xl: 1200 } : 950,
        minHeight: isMobile ? 'auto' : isCompact ? 90 : { sm: 500, md: 350 },
        maxHeight: isCompact ? 90 : 550,
        mx: 'auto',
        my: isMobile ? 2: 4,
        boxShadow: 3,
        borderRadius: 10,
        p: isMobile ? 2 : { sm: 3, md: 4, lg: 3.5, xl: 4 },
        transition: 'all 0.6s ease-in-out',
      }}
    >
      {!isCompact && (
        <div className='flex justify-center mb-8'>
          <div className='inline-flex items-center'>
            <Title titulo='¿Tu vuelo va a salir a tiempo?' className='text-[#251a79] text-xl' />
            <img src={Avion} alt='Avión' className='w-8 h-8 ml-2' />
          </div>
        </div>
      )}

      {!isCompact && !isMobile && (
        <img src={Maleta} alt='Maleta' className='absolute top-6 right-1 w-[100px]' />
      )}

      <Grid
        container
        wrap={isMobile ? 'wrap' : isCompact ? 'nowrap' : 'wrap'}
        columnSpacing={isMobile ? 2 : 4}
        rowSpacing={isMobile ? 3 : isCompact ? 0 : { sm: 3, md: 3, lg:4 }}
        justifyContent={isCompact ? 'flex-start' : 'center'}
        mb={3}
      >
        <FormGridItem isMobile={isMobile} isCompact={isCompact}>
          <FormControl fullWidth>
            <InputLabel shrink sx={labelSx}>Aerolínea</InputLabel>
            <Select
              value={aerolinea}
              onChange={(e) => setAerolinea(e.target.value)}
              sx={selectSx(isCompact)}
              MenuProps={menuProps}
            >
              {aerolineas.map(a => (
                <MenuItem key={a.id} value={a.iata}>{a.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGridItem>

        <FormGridItem isMobile={isMobile} isCompact={isCompact}>
          <FormControl fullWidth>
            <InputLabel shrink sx={labelSx}>Destino</InputLabel>
            <Select
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              sx={selectSx(isCompact)}
              MenuProps={menuProps}
            >
              {aeropuertos.map(a => (
                <MenuItem key={a.id} value={a.iata}>{a.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGridItem>

        <FormGridItem isMobile={isMobile} isCompact={isCompact}>
          <FormControl fullWidth>
            <InputLabel shrink sx={labelSx}>Origen</InputLabel>
            <Select
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              sx={selectSx(isCompact)}
              MenuProps={menuProps}
            >
              {aeropuertos.map(a => (
                <MenuItem key={a.id} value={a.iata}>{a.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGridItem>

        <FormGridItem isMobile={isMobile} isCompact={isCompact}>
          <TextField
            label='Fecha y hora'
            type='datetime-local'
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            fullWidth
            InputLabelProps={{ sx: labelSx }}
            sx={textFieldSx(isCompact)}
          />
        </FormGridItem>

        <FormGridItem isMobile={isMobile} isCompact={isCompact}>
          <TextField
            label="Distancia (km)"
            value={distancia ?? ""}
            fullWidth
            inputProps={{
              readOnly: true
            }}
            InputLabelProps={{ sx: labelSx }}
            sx={{
              ...textFieldSx(isCompact),
              '& input': {
                ...textFieldSx(isCompact)['& input'],
                cursor: 'not-allowed',
              },
            }}
          />
        </FormGridItem>

        <FormGridItem isMobile={isMobile} isCompact={isCompact} display='flex' alignItems='center'>
            <Button
              type="submit"
              variant="contained"
              disabled={isCompact && predicted}
              fullWidth
              sx={{
                backgroundColor: '#251A79',
                fontWeight: 600,
                height: isMobile ? '45px' : isCompact ? '30px' : '45px',
                zIndex: 10,
                textTransform: "none", 
                '&.Mui-disabled': {
                  backgroundColor: '#e2855aff',
                  color: '#5c5555',
                  opacity: 0.7,
                }
              }}
            >
              {isCompact ? 'Predecir' : 'Predecir vuelo'}
            </Button>

            
          
        </FormGridItem>
      </Grid>
      
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'end', zIndex: 10 }}>
        <FollowPredictionToggle
          value={followPrediction}
          onChange={setFollowPrediction}
        />
      </Box>

      {!isCompact && !isMobile && (
        <>
          <img src={AvionDePapel} className='absolute left-2 bottom-2 w-[108px] h-[90px]' />
          <img src={Nube} className='absolute bottom-0 right-0 w-[225px] h-[132px] opacity-60' />
          <img src={LineaNube} className='absolute bottom-0 right-0 w-[140px] h-[105px]' />
        </>
      )}
    </Box>
  );
};

export default PredictionForm;