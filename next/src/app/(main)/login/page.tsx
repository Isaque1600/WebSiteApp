"use client";

import { LoginForm } from "@/_components/LoginForm";
import { Main } from "@/_components/main/Main";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { isLoggedIn, me } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLoggedIn) {
        try {
          const user = await me();
          if (!user) {
            throw new Error("User not found");
          }

          if (user.type == "admin") {
            router.push("/admin");
          }
          if (user.type == "accountant") {
            router.push("/contador");
          }
        } catch (error) {
          return;
        }
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <Main className="items-center justify-center">
      <LoginForm />
    </Main>
  );
}
