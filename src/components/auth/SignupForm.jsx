import { Box, Button, TextField,  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppAlert from "../ui/AppAlert";
import { validateSignup } from "../../utils/formatValidator";
import useAuth from "../../hooks/useAuth";

/**
 * SignupForm Component - Componente de formulario de registro de usuarios 
 * para Flight On Time.
 * Permite crear una nueva cuenta ingresando:
 * - Nombre completo
 * - Email
 * - Password
 * - Confirmación de password
 * 
 * Comportamiento:
 * - Valida que la contraseña y confirmación coincidan
 * - Ejecuta la función signup del hook useAuth
 * - Redirige a /auth/login si el registro es exitoso
 * 
 * Hooks / Librerías utilizadas:
 * - useState (React) → manejo del estado del formulario
 * - useNavigate (react-router-dom) → navegación programática
 * - useAuth (hook personalizado) → maneja la lógica de signup y estado de loading/error
 * - Material UI: Box, TextField, Button
 * 
 * Uso:
 * <SignupForm />
 */

const SignupForm = () => {
    const { signup, error, loading } = useAuth();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState("");

    //mock
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateSignup(form);
        setFormErrors(errors);

        // Si hay errores, mostramos el primero general en AppAlert
        if (Object.keys(errors).length > 0) {
            setLocalError(errors.confirmPassword || errors.fullname || errors.email);
            return;
        }

        const success = await signup(form);
        if (success) navigate("/auth/login");
    };

    return (
        <Box>
            <Box className="text-center mb-8">
                <div className="flex flex-col justify-center mb-6">
                    <h1 className="text-3xl font-bold text-[#E5E6EA]">
                        Create your account
                    </h1>
                    <p className="text-sm text-[#F9F3F3]/70 mt-2">
                        Start predicting flights on time
                    </p>
                </div>
            </Box>

            <form onSubmit={handleSubmit}>   
                <Box className="space-y-5">
                    {/* Error general */}
                    {localError && (
                        <AppAlert severity="warning"> {localError} </AppAlert>
                    )}

                    {/* Full name */}
                    <TextField type="text" placeholder="Full name" variant="outlined" value={form.fullname}
                        onChange={ (e) => setForm({ ...form, fullname: e.target.value }) }
                        error={!!formErrors.fullname}
                        helperText={formErrors.fullname}
                        fullWidth
                        InputLabelProps={{ shrink: false }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F9F3F3",
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: "#F9F3F3" },
                            },
                        }}
                    />

                    {/* Email */}
                    <TextField type="email" placeholder="Email" variant="outlined" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        fullWidth
                        InputLabelProps={{ shrink: false }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F9F3F3",
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: "#F9F3F3" },
                            },
                        }}
                    />

                    {/* Password */}
                    <TextField type="password" placeholder="Password" variant="outlined" value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        fullWidth  
                        InputLabelProps={{ shrink: false }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F9F3F3",
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: "#F9F3F3" },
                            },
                        }}
                    />

                    {/* Confirm password */}
                    <TextField type="password" placeholder="Confirm password" variant="outlined" value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        fullWidth
                        InputLabelProps={{ shrink: false }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F9F3F3",
                                borderRadius: 2,
                                "&.Mui-focused fieldset": { borderColor: "#F9F3F3" },
                            },
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
                        Create account
                    </Button>
                </Box>
            </form>

            {/* Switch to Login */}
            <Box className="text-center mt-6">
                <span className="text-sm text-[#251A79]/70">
                    Already have an account?
                </span>
                <Button variant="text" onClick={() => navigate('/auth/login')}
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
                        }
                    }}
                >
                    Sign in
                </Button> 
            </Box>
        </Box>
    );
}

export default SignupForm;