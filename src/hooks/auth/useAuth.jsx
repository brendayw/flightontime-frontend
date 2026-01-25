import { useAuthContext } from "../../contexts/AuthProvider";

const useAuth = () => {
  const { user, logout, loading, login, signup, error } = useAuthContext();

  return {
    user,
    loading,
    logout,
    login, 
    signup,
    error,
    isAuthenticated: user?.rol !== "INVITADO",
    isAdmin: user?.rol === "ADMIN",
    isUser: user?.rol === "USER",
    isGuest: user?.rol === "INVITADO",
  };
};

export default useAuth;