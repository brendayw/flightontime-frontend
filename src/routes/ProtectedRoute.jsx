import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();

  // Mientras cargamos el usuario
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

  // Si allowedRoles está vacío, cualquier usuario autenticado puede entrar
  if (allowedRoles.length === 0 && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si allowedRoles está definido, verificamos que el rol del usuario esté permitido
  if (allowedRoles.length > 0) {
    const userRole = user?.rol;

    if (!userRole || !allowedRoles.includes(userRole)) {
      // Rol no permitido → redirigir
      return <Navigate to="/home" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;