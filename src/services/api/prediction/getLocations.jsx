import axiosInstance from "../../axiosInstance";

export const fetchAerolineas = async () => {
  try {
    const { data } = await axiosInstance.get("/aerolineas");
    return data;
  } catch (err) {
    console.error("Error al obtener aerolíneas:", err);
    return [];
  }
};

export const fetchAeropuertos = async () => {
  try {
    const { data } = await axiosInstance.get("/aeropuertos");
    return data;
  } catch (err) {
    console.error("Error al obtener aeropuertos:", err);
    return [];
  }
};