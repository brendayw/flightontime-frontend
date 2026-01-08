import { FormControlLabel, Switch } from "@mui/material";

const FollowPredictionToggle = ({ value, onChange }) => {
  return (
    <FormControlLabel
      label="Seguir predicción"
      control={
        <Switch
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          sx={{
            '& .MuiSwitch-switchBase': {
              color: '#FF854C', // color del círculo cuando está unchecked
              '&.Mui-checked': {
                color: '#FF854C', // color del círculo cuando checked
              },
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#FF854C',
              opacity: 1,
            },
          }}
        />
      }
      sx={{
        color: '#251A79',
        fontSize: '0.5rem',
        fontWeight: 500,
        '& .MuiFormControlLabel-label': {
          fontSize: '0.8rem',
          fontWeight: 600,
        },
      }}
    />
  );
};

export default FollowPredictionToggle;