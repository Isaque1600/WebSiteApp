import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { twJoin } from "tailwind-merge";
import { ContadorSelect } from "./ContadorSelect";

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
      {user?.type === "admin" ? (
        <>
          <h1 className="mr-2 text-lg">{pageName || "Arquivos Fiscais"}</h1>
          <ContadorSelect className="flex-1" />
        </>
      ) : (
        <div className={`flex items-center`}>
          <h1 className="mr-2 text-lg">{pageName || "Arquivos Fiscais"}</h1>
          <span className="text-lg">- {user?.login.toUpperCase()}</span>
        </div>
      )}
      {children}
    </header>
  );
}
