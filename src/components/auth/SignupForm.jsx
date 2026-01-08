import { Box, Button, TextField,  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const SignupForm = ({ onSwitch }) => {
    const { signup, error, loading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
        }

        const success = await signup(form);
        if (success) navigate("/login");
    };

    return (
        <Box>
            <Box className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#251A79]">
                    Create your account
                </h1>
                <p className="text-sm text-[#F9F3F3]/70 mt-2">
                    Start predicting flights on time
                </p>
            </Box>

            <form onSubmit={handleSubmit}>   
                <Box className="space-y-4">

                    {/* Full name */}
                    <TextField
                        fullWidth
                        placeholder="Full name"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        value={form.fullname}
                        onChange={(e) =>
                            setForm({ ...form, fullname: e.target.value })
                        }
                        sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F9F3F3",
                            borderRadius: 2,
                            "&.Mui-focused fieldset": {
                            borderColor: "#F9F3F3",
                            },
                        },
                        }}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        placeholder="Email"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F9F3F3",
                            borderRadius: 2,
                            "&.Mui-focused fieldset": {
                            borderColor: "#F9F3F3",
                            },
                        },
                        }}
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        placeholder="Password"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F9F3F3",
                            borderRadius: 2,
                            "&.Mui-focused fieldset": {
                            borderColor: "#F9F3F3",
                            },
                        },
                        }}
                    />

                    {/* Confirm password */}
                    <TextField
                        fullWidth
                        placeholder="Confirm password"
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                            setForm({ ...form, confirmPassword: e.target.value })
                        }
                        sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F9F3F3",
                            borderRadius: 2,
                            "&.Mui-focused fieldset": {
                            borderColor: "#F9F3F3",
                            },
                        },
                        }}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
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
                <Button
                    onClick={onSwitch}
                    variant="text"
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
                    Sign in
                </Button>
            </Box>
        </Box>
    );
}

export default SignupForm;