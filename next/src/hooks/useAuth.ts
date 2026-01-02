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
  } catch (err: any) {
    throw err;
  }
}

async function logoutReq(): Promise<boolean> {
  try {
    await api.post("/auth/logout");
    Cookies.remove("authToken");
    return true;
  } catch (error) {
    throw error;
  }
}

async function fetchMe(): Promise<AuthMe> {
  try {
    const response = await api.get<AuthMe>("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
}

const USER_DATA_QUERY_KEY = ["user_profile"];

export const useAuth = () => {
  const queryClient = useQueryClient();

  const login = () =>
    useMutation({
      mutationFn: ({ email, password }: { email: string; password: string }) =>
        loginReq(email, password),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: USER_DATA_QUERY_KEY });
      },
      onError: () => {
        queryClient.setQueryData(USER_DATA_QUERY_KEY, null);
      },
    });

  const logout = () =>
    useMutation({
      mutationFn: () => logoutReq(),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: USER_DATA_QUERY_KEY });
      },
    });

  const me = () =>
    useQuery({
      queryKey: USER_DATA_QUERY_KEY,
      queryFn: async () => fetchMe(),
      staleTime: 1000 * 60 * 10,
      retry: (failureCount, error) => {
        if (failureCount >= 3) return false;
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) return false;
        }
        return true;
      },
    });

  const getAuthToken = () => Cookies.get("authToken");

  const checkLoggedIn = () => {
    if (!getAuthToken()) {
      return false;
    }

    const userData = queryClient.getQueryData<AuthMe>(USER_DATA_QUERY_KEY);
    if (!userData) {
      return false;
    }

    return true;
  };

  const isLoggedIn = checkLoggedIn();

  return {
    login,
    logout,
    me,
    isLoggedIn,
  };
};
