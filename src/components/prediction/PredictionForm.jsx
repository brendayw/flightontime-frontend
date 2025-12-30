import { useState } from "react";
import { Grid, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import useAerolineas from "../../hooks/useAerolineas";
import useAeropuertos from "../../hooks/useAeropuertos";
import Title from "../ui/Title";
import Avion from '../../assets/icons/avion.png';
import Maleta from '../../assets/icons/maleta.png';
import AvionDePapel from '../../assets/icons/avion-papel.png';
import Nube from '../../assets/icons/nube.png';
import LineaNube from '../../assets/icons/linea-de-nube.png';

const PredictionForm = ({ onPredict, variant = "default" }) => {
  const { aerolineas, loading: loadingAerolineas } = useAerolineas();
  const { aeropuertos, loading: loadingAeropuertos } = useAeropuertos();

  const isCompact = variant === "compact";

  const [aerolinea, setAerolinea] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [distancia, setDistancia] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!aerolinea || !origen || !destino || !fechaHora || !distancia) {
      console.error("Faltan campos obligatorios");
      return;
    }

    const distanciaInt = parseInt(distancia);
    if (isNaN(distanciaInt) || distanciaInt <= 0) {
      console.error("Distancia inválida");
      return;
    }

    const fechaISO = new Date(fechaHora).toISOString();
    const fechaFormateada = fechaISO.slice(0, 19);

    const formData = {
      aerolinea: aerolinea.trim(),
      origen: origen.trim(),
      destino: destino.trim(),
      fecha_partida: fechaFormateada,
      distancia_km: distanciaInt
    };

    if (onPredict) {
      await onPredict(formData);
    }
    
    if (!isCompact) setSubmitted(true);
  };

  if (loadingAerolineas || loadingAeropuertos) {
    return <p>Cargando datos...</p>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      sx={{
        position: 'relative',
        top: isCompact ? -100 : 'auto',
        left: isCompact ? 90 : 50,
        background: '#F9F3F3',
        width: isCompact ? '1200px' : '100%',
        maxWidth: isCompact ? '1200px' : 950,
        height: isCompact ? 90 : 350,
        overflow: isCompact ? "visible" : "hidden",
        mx: 'auto',
        my: isCompact ? 1 : 2,
        boxShadow: 3,
        borderRadius: 10,
        p: 4,
        transition: "all 0.6s ease-in-out",
      }}
    >
      {/* Titulo del form */}
      {!isCompact && ( 
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center">
            <Title 
              titulo="¿Tu vuelo va a salir a tiempo?" 
              className="text-[#251A79] text-xl"
            />
            <img src={Avion} alt="Avión" style={{ pointerEvents: 'none' }} className="w-8 h-8 ml-2" />
          </div>
        </div>
      )}

      {!isCompact && (
        <img src={Maleta} alt="Maleta" style={{ pointerEvents: 'none' }} className="absolute top-6 right-1 w-[100px]" />
      )}
      
      <Grid container wrap={isCompact ? "nowrap" : "wrap"}  columnSpacing={4} rowSpacing={ isCompact ? 0 : 4} justifyContent={ isCompact ? 'flex-start' : 'center'} marginBottom={3}>
        {/* Fila 1 */}
        {/* Aerolinea  */}
         <Grid item xs={6} sx={{ minWidth: isCompact ? '160px' : '427px', maxWidth: isCompact ? '160px' : '427px', flexGrow: isCompact ? 0 : 1}}>
          <FormControl fullWidth>
            <InputLabel 
              shrink 
              sx={{ 
                color: "#8B7F7F", 
                fontWeight: 600, 
                transform: "translate(14px, -20px) scale(0.75)", 
                "&.Mui-focused": {
                  color: "#FF854C",
                },
              }}
            >Aerolínea</InputLabel>
            <Select 
              value={aerolinea} 
              onChange={(e) => setAerolinea(e.target.value)}
              sx={{ 
                backgroundColor: '#F5E6E6', 
                height: isCompact ? '30px' : '45px',
                color: "#5c5555",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: 'none',
                },  
              }}
            >
              {aerolineas.map(a => (
                <MenuItem key={a.id} value={a.iata}>{a.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Destino */}
        <Grid item xs={6} sx={{ minWidth: isCompact ? '160px' : '427px', maxWidth: isCompact ? '160px': '427px', flexGrow: isCompact ? 0 : 1}}>
          <FormControl fullWidth>
            <InputLabel 
              shrink 
              sx={{ 
                color: "#8B7F7F", 
                fontWeight: 600, 
                transform: "translate(14px, -20px) scale(0.75)", 
                "&.Mui-focused": {
                  color: "#FF854C",
                },
              }}
            >
              Destino
            </InputLabel>
            <Select 
              value={destino || ""}
              onChange={(e) => setDestino(e.target.value)}
              sx={{ 
                backgroundColor: '#F5E6E6', 
                color: "#5c5555",
                height: isCompact ? '30px' : '45px', 
                "& .MuiOutlinedInput-notchedOutline": {
                  border: 'none',
                },  }}
            >
              {aeropuertos.map(a => (
                <MenuItem key={a.id} value={a.iata}>{a.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Fila 2 */}
        {/* Origen */}
        <Grid item xs={6} sx={{ minWidth: isCompact ? '160px' : '427px', maxWidth: isCompact ? '160px' : '427px', flexGrow: isCompact ? 0 : 1}}>
          <FormControl fullWidth>
            <InputLabel 
              shrink 
              sx={{ 
                color: "#8B7F7F", 
                fontWeight: 600, 
                transform: "translate(14px, -20px) scale(0.75)", 
                "&.Mui-focused": {
                  color: "#FF854C",
                },
              }}
            >
              Origen
            </InputLabel>
            <Select
              value={origen || ""}
              onChange={(e) => setOrigen(e.target.value)}
              sx={{ 
                backgroundColor: '#F5E6E6', 
                height: isCompact ? '30px' : '45px', 
                color: "#5c5555",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: 'none',
                }, 
              }}
            >
              {aeropuertos.map(a => (
                <MenuItem key={a.id} value={a.iata}>{a.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Fecha de partida y hora */}
        <Grid item xs={6} sx={{ minWidth: isCompact ? '160px' : '427px', maxWidth: isCompact ? '160px' : '427px', flexGrow: isCompact ? 0 : 1}}>
          <TextField
            label="Fecha y hora"
            type="datetime-local"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "#8B7F7F", 
                fontWeight: 600,
                transform: "translate(14px, -20px) scale(0.75)",
                "&.Mui-focused": {
                  color: "#FF854C",
                },
              },
            }}
            fullWidth
            sx={{
              backgroundColor: '#F5E6E6',
              "& .MuiInputBase-root": {
                height: isCompact ? '30px' :  '45px',
              },
              "& input": {
                padding: "10.5px 14px",
                color: "#5c5555",
                fontSize: isCompact ? 11 : 12,
              },
              "& input::-webkit-calendar-picker-indicator": {
                filter: "invert(55%) sepia(8%) saturate(300%) hue-rotate(350deg)",
                cursor: "pointer",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: 'none',
              }, 
            }}
          />
        </Grid>

        {/* Fila 3 */}
        {/* Distancia en km */}
        <Grid item xs={6} sx={{ minWidth: isCompact ? '160px' : '427px', maxWidth: isCompact ? '160px' : '427px', flexGrow: isCompact ? 0 : 1}}>
          <TextField
            label="Distancia (km)"
            type="number"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            fullWidth
            InputLabelProps={{
              sx: {
                color: "#8B7F7F",
                fontWeight: 600,
                transform: "translate(14px, -20px) scale(0.75)",
                "&.Mui-focused": {
                  color: "#FF854C",
                },
              },
            }}
            sx={{
              backgroundColor: '#F5E6E6',
              "& .MuiInputBase-root": {
                height: isCompact ? '30px' :  '45px',
              },
              "& input": {
                padding: "10.5px 14px",
                color: "#5c5555",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              }, 
              
            }}
          />
        </Grid>

        {/* Boton de predecir vuelo */}
        <Grid item xs={6} sx={{ minWidth: isCompact ? '160px' : '427px', maxWidth: isCompact ? '160px' : '427px', flexGrow: isCompact ? 0 : 1, zIndex: 10 }} display="flex" alignItems="center">
          <Button 
            type="submit"
            variant="contained"
            fullWidth
            sx={{ height: isCompact ? '30px' :  '45px', backgroundColor: '#FF854C', fontWeight: 600 }}
          >
            {isCompact ? 'Predecir' : 'Predecir vuelo'}
          </Button>
        </Grid>
      </Grid>

      {/* Imágenes */}
      {!isCompact && (
        <img src={AvionDePapel} alt="Avion de Papel" style={{ pointerEvents: 'none' }} className="absolute left-0 bottom-0 w-[102px] h-[132px]" />
      )}
      
      {!isCompact && (
        <img src={Nube} alt="Nube" style={{ pointerEvents: 'none' }} className="absolute bottom-0 right-0 w-[225px] h-[132px] opacity-60"/>
      )}

      {!isCompact && (
        <img src={LineaNube} alt="Nube" style={{ pointerEvents: 'none' }} className="absolute bottom-0 right-0 w-[140px] h-[105px]"/>
      )}
    </Box>
  );
}

export default PredictionForm;
