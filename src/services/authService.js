import axiosInstance from "../api/axiosInstance";

export const loginRequest = async ({ email, password }) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data; // { token }
};

export const signupRequest = async ({ username, email, password }) => {
  const res = await axiosInstance.post("/auth/register", { username, email, password });
  return res.data; // { message: "Usuario registrado" }
};

export const getProfileRequest = async () => {
  const res = await axiosInstance.get("/auth/profile");
  return res.data;
};
