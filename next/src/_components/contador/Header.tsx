import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { twJoin } from "tailwind-merge";

type HeaderProps = {
  pageName?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Header({ pageName, children, className }: HeaderProps) {
  const { me } = useAuth();
  const { data: user } = me();

  return (
    <header
      className={twJoin(
        "flex flex-row items-center rounded-lg bg-neutral-100 p-5 px-6 shadow-md shadow-neutral-400",
        className,
      )}
    >
      <h1 className="text-lg">
        {pageName || "Arquivos Fiscais"} - {user?.login.toUpperCase()}
      </h1>
      {children}
    </header>
  );
}
