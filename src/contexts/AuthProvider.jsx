import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest, signupRequest, getProfileRequest } from "../services/authService";

/**
 * Provider para AuthContext.
 * Envuelve componentes que necesitan acceso a la autenticación.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para cargar usuario si existe token en localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Carga el perfil del usuario desde la API.
   * Si falla, se asigna rol "GUEST".
   */
  const loadUser = async () => {
    try {
      // se usa asi porque el back no esta listo
      // Pse puede cambiar el rol de "ADMIN" a "USER" para testear
      const data = await getProfileRequest();
      setUser({
        ...data,
        role: data.role || "ADMIN", // esto es lo que se debe cambiar
      });
    } catch {
      // Si no hay token, usamos guest
      setUser({ role: "GUEST" });
      //logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param {Object} credentials - { email, password }
   * @returns {Promise<boolean>} true si el login fue exitoso, false si falló
   */
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

  /**
   * Registra un nuevo usuario.
   * @param {Object} data - Datos de registro
   * @returns {Promise<boolean>} true si el registro fue exitoso, false si falló
   */
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

  /**
   * Cierra sesión eliminando el token y asignando rol "GUEST"
   */
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

export default AuthProvider;