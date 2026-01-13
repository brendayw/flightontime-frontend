import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Componente para proteger rutas según el rol del usuario.
 *
 * Si el usuario no está autenticado o no tiene un rol permitido,
 * redirige al home ("/").  
 * De lo contrario, renderiza los children.
 *
 * @param {Object} props
 * @param {Array<string>} props.allowedRoles - Roles permitidos para acceder a esta ruta (ej: ["ADMIN", "USER"])
 * @param {React.ReactNode} props.children - Componente(s) hijos que se renderizan si el usuario está autorizado.
 *
 * @example
 * <ProtectedRoute allowedRoles={["ADMIN"]}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ allowedRoles = [], children }) => {
    const { role, isAuthenticated } = useAuth();

    if (!isAuthenticated || !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />; // redirige al home
    }

    return children;
}

export default ProtectedRoute;