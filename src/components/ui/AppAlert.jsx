import { Alert } from "@mui/material";

/**
 * AppAlert
 * 
 * Componente wrapper de MUI Alert con estilos unificados
 * para mensajes de error, warning, info y success.
 */
const AppAlert = ({ severity = "error", children, sx = {} }) => {
  return (
    <Alert
      severity={severity}
      sx={{
        borderRadius: 2,
        fontWeight: 500,
        fontSize: 14,
        ...sx,
      }}
    >
      {children}
    </Alert>
  );
};

export default AppAlert;