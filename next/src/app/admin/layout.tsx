"use client";

import { useAuth } from "@/hooks/useAuth";
import AdmLayout from "@/layouts/AdmLayout";
import { permanentRedirect } from "next/navigation";
import { toast } from "sonner";

type Props = {
  children?: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const { me, getAuthToken } = useAuth();
  const { data: userData, isLoading } = me();

  const isLoggedIn = !!getAuthToken() && !!userData;

  if (!isLoading && !isLoggedIn) {
    toast.error("Você precisa estar logado para acessar esta área.");
    permanentRedirect("/login");
  }

  if (userData && userData.type !== "admin") {
    toast.error(
      "Acesso negado. Você não tem permissão para acessar esta área.",
    );
    permanentRedirect("/");
  }

  return (
    <>
      <AdmLayout>{children}</AdmLayout>
    </>
  );
}
