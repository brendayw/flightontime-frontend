// import { createContext, useContext } from "react";

// /**
//  * Contexto de autenticación.
//  * Proporciona información del usuario, estado de carga, errores y funciones
//  * para login, registro, recuperación de contraseña y logout.
//  */
// export const AuthContext = createContext(null);

// /**
//  * Hook para usar AuthContext.
//  * Debe usarse dentro de un AuthProvider.
//  *
//  * @returns {Object} contexto de autenticación
//  */
// export const useAuthContext = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("AuthContext debe usarse dentro de AuthProvider");
//   }
//   return ctx;
// };