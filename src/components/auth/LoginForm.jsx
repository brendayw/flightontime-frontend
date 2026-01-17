import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import AppAlert from "../ui/AppAlert";
import { validateLogin } from "../../utils/formatValidator";
import useAuth from "../../hooks/useAuth";
import FlightOnTime from '../../assets/images/FlightOnTime!.png';

/**
 * LoginForm Component - Componente de formulario de inicio de sesión para Flight On Time.
 * Permite a los usuarios ingresar su email y contraseña, realizar la autenticación 
 * mediante el hook useAuth y navegar a la pantalla principal (/home) si el login es exitoso.
 * 
 * Comportamiento:
 * - Muestra un logo y slogan en la parte superior
 * - Campos de formulario:
 *    - Email
 *    - Password
 * - Botón de submit "Sign in" que ejecuta la función handleLogin
 * - Mensaje para cambiar a signup si no se tiene cuenta, con botón "Create one"
 * 
 * Props:
 * - onSwitch (función opcional): se puede usar para alternar entre login/signup, 
 *   actualmente no se utiliza porque se maneja la navegación con useNavigate
 * 
 * Hooks / Librerías utilizadas:
 * - useState (React) → manejo del estado del formulario
 * - useNavigate (react-router-dom) → navegación programática
 * - useAuth (hook personalizado) → maneja la lógica de login
 * - Material UI: Box, TextField, Button
 * 
 * Uso:
 * <LoginForm />
 */

const LoginForm = ({ onSwitch }) => {  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const handleLogin = async (e) => {
    e.preventDefault();

    // Validaciones frontend
    const errors = validateLogin(form);
    setFormErrors(errors);

    // Si hay errores, no enviamos
    if (Object.keys(errors).length > 0) return;

    const success = await login(form);
    if (!success) return; // error ya está en useAuth.error
    navigate("/home");
  };

  return (
    <Box>
      {/* Logo */}
      <Box className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <img
            src={FlightOnTime}
            alt="Logo"
            className="w-80 md:w-84 lg:w-96"
          />
        </div>
        <p className="text-sm text-[#F9F3F3]/70 mt-2">
          Because every minute matters
        </p>
      </Box>

      {/* Form */}
      <form onSubmit={handleLogin}>
        <Box className="space-y-5">
          {/* Error general */}
          {localError && (
            <AppAlert severity="warning"> {localError} </AppAlert>
          )}

          {/* Email */}
          <TextField type="email" placeholder="Email" variant="outlined"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={!!formErrors.email}
            helperText={formErrors.email}
            fullWidth
            InputLabelProps={{ shrink: false }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9F3F3",
                borderRadius: 2,
                "&.Mui-focused fieldset": { borderColor: "#798AF4" }
              }
            }}
          />

          {/* Password */}
          <TextField type="password" placeholder="Password" variant="outlined"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={!!formErrors.password}
            helperText={formErrors.password}
            fullWidth
            InputLabelProps={{ shrink: false }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9F3F3",
                borderRadius: 2,
                "&.Mui-focused fieldset": { borderColor: "#798AF4" }
              }
            }}
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth
            sx={{
              py: 2,
              borderRadius: 3,
              backgroundColor: "#251A79",
              color: "#F9F3F3",
              fontWeight: 600,
              textTransform: "none", 
              "&:hover": { backgroundColor: "#1d145f" },
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
            }}
          >
            Sign in
          </Button>
        </Box>
      </form>

      {/* Switch to Signup */}
      <Box className="text-center mt-6">
        <span className="text-sm text-[#251A79]/80">
          Don’t have an account?
        </span>
        <Button variant="text" onClick={() => navigate('/auth/signup')}
          sx={{
            ml: 1,
            color: "#F9F3F3",
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#F9F3F3",
            },
            "&:focus": {
              outline: "2px solid #F9F3F3",
              outlineOffset: 2,
            },
          }}
        >
          Create one
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;