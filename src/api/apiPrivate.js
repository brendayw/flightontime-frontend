import axios from "axios";

const apiPrivate = axios.create({
  baseURL: "http://localhost:8080",
});

apiPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    
    if (token) { 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiPrivate;