import { Navigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";

/**
 * Componente de ruta protegida.
 *
 * Este componente verifica si el usuario está autenticado antes de renderizar
 * el contenido hijo (`children`). Si el usuario no está autenticado, lo redirige
 * a la ruta de login ("/").
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes que se quieren proteger
 * @returns {React.ReactNode} Renderiza los hijos si el usuario está autenticado,
 *                            de lo contrario redirige al login.
 *
 * @example
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;