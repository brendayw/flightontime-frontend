import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL base de la API
  timeout: 60000,                        // timeout global en ms desde repo y no swagger de ds 
  headers: {
    "Content-Type": "application/json",  // header por defecto para JSON
  },
});

// Interceptor de REQUEST
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    
    console.log("=== AXIOS REQUEST ===");
    console.log("URL:", config.url);
    console.log("Method:", config.method);
    console.log("Token en localStorage:", token);
    
    // Solo agregar el token si existe y no es null/undefined
    if (token && token !== "null" && token !== "undefined") {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Header Authorization agregado:", config.headers["Authorization"]);
    } else {
      console.log("No se agregó Authorization header (token inválido)");
    }
    
    console.log("Headers finales:", config.headers);
    console.log("====================");
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de RESPONSE para manejar errores 401/403
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si hay error 401 o 403, limpiar token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("jwt");
      
      // Solo redirigir si no estamos ya en la página de login
      if (window.location.pathname !== "/" && window.location.pathname !== "/login") {
        window.location.href = "/";
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;