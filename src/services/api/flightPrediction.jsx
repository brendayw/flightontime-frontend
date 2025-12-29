import axiosInstance from "./axiosInstance";

/**
 * POST → envía datos del vuelo al modelo
 */
export const predictFlight = async (flightData) => {
  return axiosInstance.post("/predict", flightData);
};