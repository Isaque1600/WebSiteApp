"use client";

import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();
  const { mutateAsync: logoutUser, isSuccess, isError, error } = logout;

  useEffect(() => {
    toast.loading("Saindo...", {
      id: "logout",
      duration: 0,
      position: "top-center",
    });

    const performLogout = async () => {
      await logoutUser();
    };

    performLogout();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss("logout");
      toast.success("Logout realizado com sucesso!", {
        position: "top-center",
      });
      router.push("/login");
    }

    if (isError) {
      toast.dismiss("logout");
      if (error instanceof AxiosError && error.status === 401) {
        toast.error(`Sessão expirada!`, { position: "top-center" });
      } else {
        toast.error(`Erro ao sair!`, { position: "top-center" });
      }
      router.push("/login");
    }
  }, [isSuccess, isError, error, router]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Loader2Icon className="animate-spin" />
      <p>Saindo...</p>
    </div>
  );
}
