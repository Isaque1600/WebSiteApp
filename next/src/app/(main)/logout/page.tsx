"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      const success = await logout();
      if (success) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    };
    handleLogout();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Loader2Icon className="animate-spin" />
      <p>Saindo...</p>
    </div>
  );
}
