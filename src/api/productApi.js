import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

apiClient.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export const productApi = {
  getAll: () => apiClient.get("/products").then((r) => r.data),
  getById: (id) => apiClient.get(`/products/${id}`).then((r) => r.data),
};

export const authApi = {
  login: (username, password) =>
    apiClient
      .post("/auth/login", { username, password })
      .then((r) => r.data),
};
