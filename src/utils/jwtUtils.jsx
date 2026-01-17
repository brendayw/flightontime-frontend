/**
 * Decodifica un JWT sin verificar la firma (solo para lectura del payload)
 * IMPORTANTE: Esto NO valida el token, solo lee el contenido
 */
export const decodeJWT = (token) => {
  try {
    // El JWT tiene 3 partes separadas por puntos: header.payload.signature
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      throw new Error('Token JWT inválido');
    }
    
    // Decodificamos el payload (segunda parte)
    const payload = parts[1];
    
    // Convertimos de Base64 a string
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    
    // Parseamos el JSON
    const parsedPayload = JSON.parse(decodedPayload);
    
    return parsedPayload;
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

/**
 * Obtiene el email del usuario desde el token JWT
 */
export const getEmailFromToken = (token) => {
  const payload = decodeJWT(token);
  return payload?.sub || null;
};

/**
 * Verifica si el token ha expirado
 */
export const isTokenExpired = (token) => {
  const payload = decodeJWT(token);
  
  if (!payload || !payload.exp) {
    return true;
  }
  
  // exp está en segundos, Date.now() está en milisegundos
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  
  return currentTime > expirationTime;
};

/**
 * Obtiene toda la información útil del token
 */
export const getTokenInfo = (token) => {
  const payload = decodeJWT(token);
  
  if (!payload) {
    return null;
  }
  
  return {
    email: payload.sub,
    issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
    expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
    isExpired: isTokenExpired(token),
  };
};

export const getRoleFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.rol || null;
  } catch (err) {
    console.error("Error decodificando rol del token", err);
    return null;
  }
};

export default {
  decodeJWT,
  getEmailFromToken,
  isTokenExpired,
  getTokenInfo,
  getRoleFromToken
};