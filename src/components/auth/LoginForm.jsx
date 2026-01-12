import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import FlightOnTime from '../../assets/images/FlightOnTime!.png';

const LoginForm = ({ onSwitch }) => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(form);
    if (success) navigate("/home");
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
          {/* Email */}
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9F3F3",
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderColor: "#798AF4",
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
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F9F3F3",
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderColor: "#798AF4",
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
            Sign in
          </Button>
        </Box>
      </form>

      {/* Switch to Signup */}
      <Box className="text-center mt-6">
        <span className="text-sm text-[#251A79]/80">
          Don’t have an account?
        </span>
        <Button
          onClick={() => navigate('/auth/signup')}
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
          Create one
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;