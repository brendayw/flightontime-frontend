import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles = [], children }) => {
    const { role, isAuthenticated } = useAuth();

    if (!isAuthenticated || !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />; // redirige al home
    }

    return children;
}

export default ProtectedRoute;