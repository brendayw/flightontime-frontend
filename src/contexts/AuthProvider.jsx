import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, signupRequest, getProfileRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getEmailFromToken, isTokenExpired } from "../utils/jwtUtils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carga usuario al montar si existe token
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("jwt");
      
      if (token && token !== "null" && token !== "undefined") {
        // Verificar si el token expiró
        if (isTokenExpired(token)) {
          console.log("Token expirado, limpiando sesión");
          localStorage.removeItem("jwt");
          setUser(null);
          setLoading(false);
          return;
        }
        
        await loadUser();
      } else {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("jwt");
      console.log("Token en loadUser:", token);
      
      if (!token || token === "null" || token === "undefined") {
        console.log("No hay token válido");
        throw new Error("No hay token válido");
      }
      
      // Verificar expiración
      if (isTokenExpired(token)) {
        console.log("Token expirado");
        throw new Error("Token expirado");
      }
      
      console.log("Llamando a getProfileRequest...");
      
      try {
        const profile = await getProfileRequest();
        console.log("Perfil obtenido:", profile);
        setUser(profile);
      } catch (err) {
        console.warn("Error obteniendo perfil del backend, usando info del token");
        // Si falla el backend, usamos la info del token
        const emailFromToken = getEmailFromToken(token);
        const tempUser = {
          email: emailFromToken,
          username: emailFromToken?.split('@')[0],
          rol: "USER",
        };
        setUser(tempUser);
      }
    } catch (err) {
      console.error("Error cargando usuario:", err);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      setError(null);
      setLoading(true);
      
      // 1. Hacer login y obtener token
      const response = await loginRequest({ email, password });
      console.log("Response de login:", response);
      
      const token = response.token;
      console.log("Token recibido:", token);
      
      if (!token) {
        throw new Error("No se recibió token del servidor");
      }
      
      // 2. Verificar que el token no esté expirado
      if (isTokenExpired(token)) {
        throw new Error("El token recibido ya expiró");
      }
      
      // 3. Guardar token
      localStorage.setItem("jwt", token);
      console.log("Token guardado en localStorage");
      
      // 4. Extraer email del token
      const emailFromToken = getEmailFromToken(token);
      console.log("Email extraído del token:", emailFromToken);
      
      // 5. NO intentar obtener perfil del backend por ahora
      // El backend no está recibiendo el header Authorization correctamente
      console.log("Creando usuario desde token JWT...");
      
      const tempUser = {
        email: emailFromToken || email,
        username: emailFromToken?.split('@')[0] || email.split('@')[0],
        rol: "USER", // Rol por defecto - si necesitas ADMIN, deberás agregarlo al JWT en el backend
      };
      
      console.log("Usuario creado:", tempUser);
      setUser(tempUser);
      
      console.log("Login exitoso, redirigiendo a /home");
      
      // 6. Redirigir a /home
      navigate("/home");
      
      return true;
    } catch (err) {
      console.error("Error crítico en login:", err);
      setError(err.response?.data?.message || err.message || "Error en login");
      localStorage.removeItem("jwt");
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

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

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
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
        isAuthenticated: !!user,
        role: user?.rol, // Cambié de "role" a "rol" para coincidir con tu backend
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