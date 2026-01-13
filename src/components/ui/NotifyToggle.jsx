import { FormControlLabel, Switch } from "@mui/material";

/**
 * NotifyToggle Component
 * 
 * Componente que muestra un switch para activar o desactivar notificaciones.
 * Se puede ocultar si se pasa la prop `isCompact`.
 * 
 * Props:
 * @param {boolean} value - Estado actual del switch (true = activado, false = desactivado)
 * @param {function} onChange - Función que se ejecuta cuando cambia el valor del switch.
 *                               Recibe un boolean indicando el nuevo estado.
 * @param {boolean} isCompact - Si true, no se renderiza el componente (modo compacto)
 * 
 * Comportamiento:
 * - Muestra un switch con label "Recibir notificación" si isCompact es false.
 * - Permite cambiar el valor mediante el switch y notifica el cambio mediante `onChange`.
 * 
 * Estilos:
 * - Switch:
 *   - Círculo: color #FEA062 (unchecked y checked)
 *   - Track: color #FEAB77 cuando checked, opacidad 0.8
 * - Label:
 *   - Color: #E5E6EA
 *   - Fuente: 0.8rem, fontWeight 600
 * 
 * Uso:
 * <NotifyToggle value={isNotified} onChange={setIsNotified} isCompact={false} />
 */

const NotifyToggle = ({ value, onChange, isCompact }) => {
  if (isCompact) return null;
  
  return (
    <FormControlLabel 
      label="Recibir notificación" 
      control={ 
        <Switch checked={value} onChange={(e) => onChange(e.target.checked)} 
          sx={{
            '& .MuiSwitch-switchBase': {
              color: '#FEA062', // color del círculo cuando está unchecked
              '&.Mui-checked': {
                color: '#FEA062', // color del círculo cuando checked
              }
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#FEAB77',
              opacity: 0.8
            }
          }}
        />
      }
      sx={{ color: '#E5E6EA', 
        '& .MuiFormControlLabel-label': {
          fontSize: '0.8rem',
          fontWeight: 600
        }
      }}
    />
  );
};

export default NotifyToggle;