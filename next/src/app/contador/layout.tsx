"use client";
import { useAuth } from "@/hooks/useAuth";
import AccountantLayout from "@/layouts/AccountantLayout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ContadorLayoutProps = {
  children: React.ReactNode;
};

export default function ContadorLayout({ children }: ContadorLayoutProps) {
  const { me, getAuthToken } = useAuth();
  const { data: userData, isLoading } = me();

  const router = useRouter();

  const isLoggedIn = !!getAuthToken() && !!userData;

  if (!isLoading && !isLoggedIn) {
    toast.error("Você precisa estar logado para acessar esta área.", {
      id: "not-logged-in",
    });
    router.replace("/login");
  }

  if (userData && userData.type !== "contador") {
    toast.error(
      "Acesso negado. Você não tem permissão para acessar esta área.",
      { id: "access-denied" },
    );
    router.push("/");
  }

  return <AccountantLayout>{children}</AccountantLayout>;
}
