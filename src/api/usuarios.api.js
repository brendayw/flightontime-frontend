import apiPrivate from "./apiPrivate";

export const getAllUsers = async () => {
    const response = await apiPrivate.get("/api/admin/usuarioos");
    console.log("Datos desde usuarios.api: ", response);
    return response.data;
}

export const getUsuarioVuelos = async () => {
    const response = await apiPrivate.get("/api/usuario/vuelos");
    console.log("Datos desde vuelos.api: ", response);
    return response.data;
}