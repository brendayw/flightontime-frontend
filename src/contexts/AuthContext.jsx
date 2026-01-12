import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, signupRequest, forgotPasswordRequest,getProfileRequest } from "../services/api/auth/authService";

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
      // se usa asi porque el back no esta listo
      // Pse puede cambiar el rol de "ADMIN" a "USER" para testear
      const data = await getProfileRequest();
      setUser({
        ...data,
        role: data.role || "USER", // esto es lo que se debe cambiar
      });
    } catch {
      // Si no hay token, usamos guest
      //setUser({ role: "GUEST" });
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
    setUser({ role: "GUEST" });
    //setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,

        //acciones
        login,
        signup,
        logout,
        forgotPassword,

        //helpers
        isAuthenticated: user?.role !== "GUEST",
        role: user?.role || "GUEST",
        isGuest: user?.role === "GUEST",
        isUser: user?.role === "USER",
        isAdmin: user?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthContext debe usarse dentro de AuthProvider");
  }
  return ctx;
};