import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      (error.response.data as any).message === "Unauthorized" &&
      error.config?.url !== "/auth/logout"
    ) {
      if (toast.getToasts().some((t) => t.id === "session-expired")) {
        return Promise.reject(error);
      }

      toast.info("Sessão expirada. Faça login novamente.", {
        duration: 1000 * 2,
        position: "top-center",
        onDismiss: () => {
          window.location.href = "/logout";
        },
        id: "session-expired",
      });
      setTimeout(() => {
        window.location.href = "/logout";
      }, 1000 * 2);
      return Promise.reject(error);
    }
    console.log(error);
    return Promise.reject(error);
  },
);

export default api;
