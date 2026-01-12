"use client";

import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Logout() {
  const { logout } = useAuth();
  const { mutateAsync: logoutUser, isSuccess, isError, error } = logout();

  toast.loading("Saindo...", {
    id: "logout",
    duration: 0,
    position: "top-center",
  });

  useEffect(() => {
    const performLogout = async () => {
      await logoutUser();
    };

    performLogout();

    if (isSuccess) {
      toast.dismiss("logout");
      toast.success("Logout realizado com sucesso!", {
        position: "top-center",
      });
      redirect("/login");
    }

    if (isError) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.dismiss("logout");
          toast.error(`Sessão expirada!`, { position: "top-center" });
          return redirect("/login");
        }
      }
      toast.dismiss("logout");
      toast.error(`Erro ao sair!`, { position: "top-center" });
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Loader2Icon className="animate-spin" />
      <p>Saindo...</p>
    </div>
  );
}
