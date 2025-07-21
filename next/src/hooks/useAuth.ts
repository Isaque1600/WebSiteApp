"use client";

import api from "@/lib/axios";
import Cookies from "js-cookie";
import { useState } from "react";

type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type AuthMe = {
  id: number;
  login: string;
  type: "admin" | "accountant";
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        login: email,
        senha: password,
      });
      Cookies.set("authToken", response.data.access_token);

      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/logout");
      console.log(api.interceptors);
      Cookies.remove("authToken");
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Logout failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const me = async (): Promise<AuthMe | void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<AuthMe>("/auth/me");
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  const getAuthToken = () => Cookies.get("authToken");

  const isLoggedIn = !!getAuthToken();

  return {
    login,
    logout,
    me,
    isLoggedIn,
    loading,
    error,
  };
};
