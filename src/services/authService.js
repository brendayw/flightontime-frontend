import apiPrivate from "../api/apiPrivate";
import apiPublic from "../api/apiPublic";

export const loginRequest = async ({ email, password }) => {
  const res = await apiPublic.post("/auth/login", { email, password });
  return res.data; // { token }
};

export const signupRequest = async ({ username, email, password }) => {
  const res = await apiPublic.post("/auth/register", { username, email, password });
  return res.data; // { message: "Usuario registrado" }
};

export const getProfileRequest = async () => {
  const res = await apiPrivate.get("/auth/profile");
  return res.data;
};
