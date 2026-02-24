import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface ErrorResponse {
  error?: string;
  message?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const errors = {
  ["Unauthorized"]: "Não autorizado",
  ["Unauthenticated"]: "Não autenticado",
  ["Forbidden"]: "Acesso proibido",
  ["Token expired"]: "Token expirado",
};

api.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ErrorResponse>) => {
    const errorCause =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.response?.statusText ||
      "Erro desconhecido";

    if (
      error.response?.status === 401 &&
      errors[errorCause as keyof typeof errors] &&
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
    return Promise.reject(error);
  },
);

export default api;
