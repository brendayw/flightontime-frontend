//import axiosInstance from "../../axiosInstance";

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
