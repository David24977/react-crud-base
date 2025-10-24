import axios from "axios";
//URL base del backend(desde .env o por defecto local)
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

//Crear base personalizada de axios, instancia de axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout:10000, //10 segundos
  headers:{"Content-Type": "application/json"},
});

// Interceptor de respuesta (maneja errores automáticamente)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    console.error(`Error HTTP ${status || "?"}: ${message}`);
    return Promise.reject(new Error(`HTTP ${status || "?"} - ${message}`));
  }
);

export default api;