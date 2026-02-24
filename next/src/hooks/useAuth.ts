"use client";

import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type AuthMe = {
  id: number;
  login: string;
  type: "admin" | "contador";
};

async function loginReq(email: string, password: string): Promise<boolean> {
  try {
    const response = await api.post<AuthResponse>("/auth/login", {
      login: email,
      senha: password,
    });
    Cookies.set("authToken", response.data.access_token);

    return true;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.error) {
        switch (error.response?.data?.error) {
          case "User not found":
            error.message = "Usuário não encontrado";
            throw error;

          case "Invalid login or password":
            error.message = "Login ou senha inválidos";
            throw error;

          default:
            error.message = "Erro ao fazer login";
            throw error;
        }
      }
    }
    throw new Error("Erro ao fazer login");
  }
}

async function logoutReq(): Promise<boolean> {
  try {
    await api.post("/auth/logout");
    Cookies.remove("authToken");
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        Cookies.remove("authToken");
        return true;
      }
    }
    throw error;
  }
}

async function fetchMe(): Promise<AuthMe> {
  try {
    if (!Cookies.get("authToken")) {
      return Promise.reject("No auth token found");
    }

    const response = await api.get<AuthMe>("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
}

const USER_DATA_QUERY_KEY = ["user_profile"];

export const useAuth = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginReq(email, password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_DATA_QUERY_KEY });
    },
    onError: (error) => {
      queryClient.setQueryData(USER_DATA_QUERY_KEY, null);

      return error;
    },
  });

  const logout = useMutation({
    mutationFn: () => logoutReq(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_DATA_QUERY_KEY });
    },
  });

  const me = () =>
    useQuery({
      queryKey: USER_DATA_QUERY_KEY,
      queryFn: async () => fetchMe(),
      staleTime: 1000 * 60 * 60,
      retry: (failureCount, error) => {
        if (failureCount >= 3) return false;
        if (error.message === "No auth token found") return false;
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) return false;
        }
        return true;
      },
    });

  const getAuthToken = () => Cookies.get("authToken");

  return {
    login,
    logout,
    me,
    getAuthToken,
  };
};
