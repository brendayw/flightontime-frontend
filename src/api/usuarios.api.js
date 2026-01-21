import apiPrivate from "./apiPrivate";

export const getAllUsers = async () => {
    const response = await apiPrivate.get("/api/admin/usuarioos");
    return response.data;
}

export const getUsuarioVuelos = async () => {
    const response = await apiPrivate.get("/api/usuario/vuelos");
    return response.data;
}