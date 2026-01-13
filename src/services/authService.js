//import axiosInstance from "../api/axiosInstance";

/**
 * API de autenticación (MOCK).
 *
 * Este archivo simula las respuestas del backend de autenticación.
 * Se utiliza mientras el backend real no está integrado.
 *
 * ⚠️ IMPORTANTE:
 * - No realiza requests HTTP reales
 * - No utiliza axios
 * - Debe ser reemplazado cuando el backend esté disponible
 */

export const loginRequest = async (data) => {
  console.log("Mock login:", data);
  // Simulamos un token de JWT
  return {
    data: {
      token: "mock-jwt-token",
      user: { name: "Mock User", email: data.email },
    },
  };
};

export const signupRequest = async (data) => {
  console.log("Mock signup:", data);
  return {
    data: {
      message: "User registered successfully",
    },
  };
};

export const forgotPasswordRequest = async (data) => {
  console.log("Mock forgot password:", data);
  return {
    data: { message: "Password reset email sent" },
  };
};


export const getProfileRequest = async () => {
  console.log("Mock get profile");
  return {
    data: { name: "Mock User", email: "mock@example.com" },
  };
};
