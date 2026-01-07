import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import FlightOnTime from '../../assets/images/FlightOnTime!.png';

const LoginForm = ({ onSwitch }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí va tu lógica de login real
    navigate("/home"); // Redirige al Home después del login
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
          Create one
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;