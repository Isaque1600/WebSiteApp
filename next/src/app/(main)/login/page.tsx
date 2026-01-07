"use client";

import { LoginForm } from "@/_components/LoginForm";
import { Main } from "@/_components/main/Main";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { isLoggedIn, me } = useAuth();
  const { data: userData, isLoading } = me();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      if (userData?.type === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [isLoading, userData]);

  return (
    <Main className="items-center justify-center">
      <LoginForm />
    </Main>
  );
}
