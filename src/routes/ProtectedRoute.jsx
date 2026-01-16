import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Componente para proteger rutas según autenticación.
 * Si el usuario no está autenticado, redirige al home ("/").
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no está autenticado, redirigir a "/"
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si se especifican roles permitidos, verificar el rol del usuario
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.rol;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Usuario no tiene el rol necesario, redirigir a home
      return <Navigate to="/home" replace />;
    }
  }

  // Todo OK, mostrar el componente protegido
  return children;
};

export default ProtectedRoute;