import { useAuthContext } from "../contexts/AuthProvider";

const useAuth = () => {
  const { user, logout, loading, login, signup } = useAuthContext();

  return {
    user,
    loading,
    logout,
    login, 
    signup,
    isAuthenticated: user?.rol !== "INVITADO",
    isAdmin: user?.rol === "ADMIN",
    isUser: user?.rol === "USER",
    isGuest: user?.rol === "INVITADO",
  };
};

export default useAuth;