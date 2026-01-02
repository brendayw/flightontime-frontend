import axiosInstance from "../../axiosInstance";

// GET /dashboard/summary
export const getDashboardSummary = async () => {
  const response = await axiosInstance.get("/dashboard/summary");
  return response.data;
};

// GET /dashboard/global-history
export const getGlobalHistory = async () => {
  const response = await axiosInstance.get("/dashboard/global-history");
  return response.data;
};