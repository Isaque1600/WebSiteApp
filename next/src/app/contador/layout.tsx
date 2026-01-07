"use client";
import { useAuth } from "@/hooks/useAuth";
import AccountantLayout from "@/layouts/AccountantLayout";
import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { toast } from "sonner";

const metadata: Metadata = {
  title: "cliente",
  icons: "",
};

type ContadorLayoutProps = {
  children: React.ReactNode;
};

export default function ContadorLayout({ children }: ContadorLayoutProps) {
  const { isLoggedIn, me } = useAuth();
  const { data: userData } = me();

  if (!isLoggedIn) {
    toast.error("Você precisa estar logado para acessar esta área.", {
      id: "not-logged-in",
    });
    permanentRedirect("/login");
  }

  if (userData && userData.type !== "contador") {
    toast.error(
      "Acesso negado. Você não tem permissão para acessar esta área.",
      { id: "access-denied" },
    );
    permanentRedirect("/");
  }

  return <AccountantLayout>{children}</AccountantLayout>;
}
