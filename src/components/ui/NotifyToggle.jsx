import { FormControlLabel, Switch } from "@mui/material";

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