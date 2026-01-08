import axiosInstance from "../../axiosInstance";

/**
 * GET → recibe listado de aerolineas
 */
export const fetchAerolineas = async () => {
  try {
    const { data } = await axiosInstance.get("/aerolineas");
    return data;
  } catch (err) {
    console.error("Error al obtener aerolíneas:", err);
    return [];
  }
};

/**
 * GET → recibe listado de aeropuertos
 */
export const fetchAeropuertos = async () => {
  try {
    const { data } = await axiosInstance.get("/aeropuertos");
    return data;
  } catch (err) {
    console.error("Error al obtener aeropuertos:", err);
    return [];
  }
};