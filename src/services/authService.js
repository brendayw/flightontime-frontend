import apiPrivate from "../api/apiPrivate";
import apiPublic from "../api/apiPublic";

/**
 * Realiza el login de un usuario.
 *
 * @async
 * @function loginRequest
 * @param {Object} params - Credenciales del usuario
 * @param {string} params.email - Email del usuario
 * @param {string} params.password - Contraseña del usuario
 * @returns {Promise<Object>} Datos de la respuesta
 * @returns {string} returns.token - JWT generado por el backend
 *
 * @example
 * const { token } = await loginRequest({ email, password });
 */
export const loginRequest = async ({ email, password }) => {
  const res = await apiPublic.post("/auth/login", { email, password });
  return res.data; // { token }
};

/**
 * Registra un nuevo usuario en el sistema.
 *
 * @async
 * @function signupRequest
 * @param {Object} params - Datos del nuevo usuario
 * @param {string} params.username - Nombre de usuario
 * @param {string} params.email - Email del usuario
 * @param {string} params.password - Contraseña del usuario
 * @returns {Promise<Object>} Datos de la respuesta
 * @returns {string} returns.message - Mensaje de confirmación del registro
 *
 * @example
 * const res = await signupRequest({ username, email, password });
 */
export const signupRequest = async ({ username, email, password }) => {
  const res = await apiPublic.post("/auth/register", { username, email, password });
  return res.data; // { message: "Usuario registrado" }
};

/**
 * Obtiene el perfil del usuario autenticado.
 * Requiere token JWT válido (apiPrivate).
 *
 * @async
 * @function getProfileRequest
 * @returns {Promise<Object>} Datos del perfil del usuario autenticado
 *
 * @example
 * const profile = await getProfileRequest();
 */
export const getProfileRequest = async () => {
  const res = await apiPrivate.get("/auth/profile");
  return res.data;
};
