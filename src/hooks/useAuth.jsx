import { useAuthContext } from "../contexts/AuthProvider";

/**
 * Custom hook para acceder al contexto de autenticación.
 * Es un wrapper de `useAuthContext` que facilita la importación y el uso.
 *
 * @returns {Object} contexto de autenticación con:
 *  - user: información del usuario
 *  - loading: estado de carga del perfil
 *  - error: mensaje de error si ocurre
 *  - login, signup, logout, forgotPassword: funciones de acción
 *  - isAuthenticated, role, isGuest, isUser, isAdmin: helpers de rol
 *
 * @example
 * const { user, login, isAuthenticated } = useAuth();
 */
const useAuth = () => {
  return useAuthContext();
};

export default useAuth;