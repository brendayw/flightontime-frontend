import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";

/**
 * Componente de ruta pública.
 *
 * Este componente se utiliza para rutas que **no deberían ser accesibles** si el
 * usuario ya está autenticado (por ejemplo login o registro). 
 * Si el usuario está autenticado, lo redirige a la ruta "/home".
 * Mientras se determina el estado de autenticación (`loading`), renderiza los hijos.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes que se quieren mostrar en la ruta pública
 * @returns {React.ReactNode} Renderiza los hijos si el usuario no está autenticado
 *                            o está cargando; de lo contrario redirige a "/home".
 *
 * @example
 * <PublicRoute>
 *   <LoginPage />
 * </PublicRoute>
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return children;
  }

  if (isAuthenticated && location.pathname !== "/home") {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default PublicRoute;