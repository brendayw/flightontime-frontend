import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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