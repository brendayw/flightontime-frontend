import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, signupRequest, getProfileRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getEmailFromToken, isTokenExpired, getRoleFromToken } from "../utils/jwtUtils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carga usuario como invitado
   useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("jwt");

      if (token && token !== "null" && token !== "undefined") {
        if (isTokenExpired(token)) {
          console.log("Token expirado, asignando invitado");
          localStorage.removeItem("jwt");
          setUser({ email: null, username: "Invitado", rol: "INVITADO" });
          console.log("Primer rol obtenido: ", guestUser.rol);
          setLoading(false);
          return;
        }
        await loadUser();
      } else {
        // Usuario invitado por defecto
        setUser({ email: null, username: "Invitado", rol: "INVITADO" });
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token || token === "null" || token === "undefined") throw new Error("No hay token válido");

      if (isTokenExpired(token)) throw new Error("Token expirado");

      console.log("Llamando a getProfileRequest...");
      try {
        const profile = await getProfileRequest();
        setUser(profile);
      } catch (err) {
        console.warn("Error obteniendo perfil del backend, usando info del token");
        const emailFromToken = getEmailFromToken(token);
        const roleFromToken = getRoleFromToken(token) || "INVITADO";
        setUser({
          email: emailFromToken,
          username: emailFromToken?.split("@")[0] || "Invitado",
          rol: roleFromToken,
        });
      }
    } catch (err) {
      console.error("Error cargando usuario:", err);
      setUser({ email: null, username: "Invitado", rol: "INVITADO" });
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async ({ email, password }) => {
    try {
      setError(null);
      setLoading(true);

      const response = await loginRequest({ email, password });
      const token = response.token;
      if (!token) throw new Error("No se recibió token del servidor");

      if (isTokenExpired(token)) throw new Error("El token recibido ya expiró");

      localStorage.setItem("jwt", token);
      const emailFromToken = getEmailFromToken(token);
      const roleFromToken = getRoleFromToken(token) || "INVITADO";

      const loggedUser = {
        email: emailFromToken || email,
        username: emailFromToken?.split("@")[0] || email.split("@")[0],
        rol: roleFromToken,
      };

      setUser(loggedUser);
      console.log("Login exitoso:", loggedUser);

      navigate("/home");
      return true;
    } catch (err) {
      console.error("Error en login:", err);
      setError(err.response?.data?.message || err.message || "Error en login");
      localStorage.removeItem("jwt");
      setUser({ email: null, username: "Invitado", rol: "INVITADO" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const signup = async (data) => {
    try {
      setError(null);
      await signupRequest(data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error en registro");
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("jwt");
    setUser({ email: null, username: "Invitado", rol: "INVITADO" });
    navigate("/");
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
        isAuthenticated: user?.rol !== "INVITADO",
        role: user?.rol,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  return ctx;
};