"use client";

import { useAuth } from "@/hooks/useAuth";
import AdmLayout from "@/layouts/AdmLayout";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  children?: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const { me, getAuthToken } = useAuth();
  const { data: userData, isLoading } = me();
  const router = useRouter();

  const isLoggedIn = !!getAuthToken() && !!userData;

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      toast.error("Você precisa estar logado para acessar esta área.");
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (userData && userData.type !== "admin") {
      toast.error(
        "Acesso negado. Você não tem permissão para acessar esta área.",
      );
      router.replace("/");
    }
  }, [userData, router]);

  if (isLoading || !isLoggedIn || userData?.type !== "admin") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <>
      <AdmLayout>{children}</AdmLayout>
    </>
  );
}
