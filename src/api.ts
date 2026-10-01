import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Antes de cada petición, si hay token guardado, lo agrega a la cabecera
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;