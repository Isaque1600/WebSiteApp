import React from "react";
import { twJoin } from "tailwind-merge";
import { ContadorSelect } from "./ContadorSelect";

type HeaderProps = {
  pageName?: string;
  children?: React.ReactNode;
  className?: string;
  onContadorChange?: (contadorId: number | null) => void;
};

export function Header({
  pageName,
  children,
  className,
  onContadorChange,
}: HeaderProps) {
  return (
    <header
      className={twJoin(
        "flex flex-row items-center rounded-lg bg-neutral-100 p-5 px-6 shadow-md shadow-neutral-400",
        className,
      )}
    >
      <h1 className="mr-2 text-lg">{pageName || "Arquivos Fiscais"}</h1>
      <ContadorSelect onContadorChange={onContadorChange} className="flex-1" />
      {children}
    </header>
  );
}
