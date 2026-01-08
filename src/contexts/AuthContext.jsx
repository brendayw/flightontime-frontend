import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  signupRequest,
  forgotPasswordRequest,
  getProfileRequest,
} from "../services/api/auth/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const data = await getProfileRequest();
      setUser(data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const res = await loginRequest(credentials);
      localStorage.setItem("jwt", res.data.token);
      await loadUser();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
      return false;
    }
  };

  const signup = async (data) => {
    try {
      setError(null);
      await signupRequest(data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error en el registro");
      return false;
    }
  };

  const forgotPassword = async (data) => {
    try {
      setError(null);
      const res = await forgotPasswordRequest(data);
      return res.data.message;
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar email");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        forgotPassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);